import {
  PortalApiError,
  type CashRequestDetail,
  type CashRequestSummary,
  type CreateSigningSessionCommand,
  type PortalRequestsApi,
  type RequestListFilters,
  type SigningSession,
  type SigningSessionStatus
} from '@adaptivecash/api-client';
import { createRequestFixtures } from './requestFixtures';

export type MockRequestsOperation = 'list' | 'detail' | 'createSigningSession' | 'getSigningSession';
export type MockSigningOutcome = Extract<SigningSessionStatus, 'Verified' | 'Failed' | 'Expired'>;

export interface MockRequestsApiOptions {
  latencyMs?: number;
  now?: () => Date;
  signingOutcome?: MockSigningOutcome;
}

export interface MockRequestsApiController {
  api: PortalRequestsApi;
  reset(): void;
  setSigningOutcome(outcome: MockSigningOutcome): void;
  failNext(operation: MockRequestsOperation, error?: PortalApiError): void;
  getCallCount(operation: MockRequestsOperation): number;
}

interface StoredSession {
  value: SigningSession;
  pollCount: number;
}

interface IdempotencyEntry {
  requestId: string;
  sessionId: string;
}

export function createMockRequestsApi(options: MockRequestsApiOptions = {}): MockRequestsApiController {
  const latencyMs = options.latencyMs ?? 450;
  const now = options.now ?? (() => new Date());
  const initialOutcome = options.signingOutcome ?? 'Verified';

  let requests = toRequestMap(createRequestFixtures());
  let sessions = new Map<string, StoredSession>();
  let idempotency = new Map<string, IdempotencyEntry>();
  let signingOutcome: MockSigningOutcome = initialOutcome;
  let sessionSequence = 0;
  const failures = new Map<MockRequestsOperation, PortalApiError>();
  const calls: Record<MockRequestsOperation, number> = {
    list: 0,
    detail: 0,
    createSigningSession: 0,
    getSigningSession: 0
  };

  async function before(operation: MockRequestsOperation, signal?: AbortSignal): Promise<void> {
    calls[operation]++;
    await wait(latencyMs, signal);
    const failure = failures.get(operation);
    if (failure) {
      failures.delete(operation);
      throw failure;
    }
  }

  const api: PortalRequestsApi = {
    async listRequests(filters: RequestListFilters, signal?: AbortSignal): Promise<CashRequestSummary[]> {
      await before('list', signal);
      const query = filters.query?.trim().toLocaleLowerCase() ?? '';

      return [...requests.values()]
        .filter((request) => !filters.status || request.status === filters.status)
        .filter((request) => {
          if (!query) return true;
          return [request.id, request.applicant, request.branch, request.serviceType]
            .some((value) => value.toLocaleLowerCase().includes(query));
        })
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
        .map(toSummary);
    },

    async getRequest(requestId: string, signal?: AbortSignal): Promise<CashRequestDetail> {
      await before('detail', signal);
      return clone(findRequest(requests, requestId));
    },

    async createSigningSession(
      command: CreateSigningSessionCommand,
      signal?: AbortSignal
    ): Promise<SigningSession> {
      await before('createSigningSession', signal);

      const repeated = idempotency.get(command.idempotencyKey);
      if (repeated) {
        if (repeated.requestId !== command.requestId) {
          throw new PortalApiError(409, 'IDEMPOTENCY_KEY_REUSED', 'The idempotency key belongs to another request.');
        }
        return clone(findSession(sessions, repeated.sessionId).value);
      }

      const request = findRequest(requests, command.requestId);
      if (request.status !== 'ReadyForSignature') {
        throw new PortalApiError(409, 'INVALID_REQUEST_STATE', `Cannot sign a request in state ${request.status}.`);
      }

      const document = request.documents.find((candidate) =>
        candidate.versionId === command.documentVersionId && candidate.versionHash === command.versionHash
      );
      if (!document) {
        throw new PortalApiError(409, 'DOCUMENT_VERSION_MISMATCH', 'The document version or hash is stale.');
      }

      const createdAt = now();
      const sessionId = `SIGN-${String(++sessionSequence).padStart(4, '0')}`;
      const session: SigningSession = {
        id: sessionId,
        requestId: request.id,
        documentVersionId: document.versionId,
        provider: 'Mock Qualified Signing Provider',
        status: 'Pending',
        redirectUrl: `https://signing.example.test/sessions/${sessionId}`,
        createdAt: createdAt.toISOString(),
        expiresAt: new Date(createdAt.getTime() + 2 * 60_000).toISOString()
      };

      sessions.set(sessionId, { value: session, pollCount: 0 });
      idempotency.set(command.idempotencyKey, { requestId: request.id, sessionId });
      requests.set(request.id, {
        ...request,
        status: 'Signing',
        updatedAt: createdAt.toISOString(),
        nextAction: 'Complete the active provider signing session.'
      });
      return clone(session);
    },

    async getSigningSession(sessionId: string, signal?: AbortSignal): Promise<SigningSession> {
      await before('getSigningSession', signal);
      const stored = findSession(sessions, sessionId);
      if (isTerminal(stored.value.status)) return clone(stored.value);

      stored.pollCount++;
      const status: SigningSessionStatus = stored.pollCount === 1 ? 'AwaitingProvider' : signingOutcome;
      stored.value = { ...stored.value, status };
      sessions.set(sessionId, stored);

      if (isTerminal(status)) applyTerminalRequestState(requests, stored.value, status, now());
      return clone(stored.value);
    }
  };

  return {
    api,
    reset() {
      requests = toRequestMap(createRequestFixtures());
      sessions = new Map();
      idempotency = new Map();
      signingOutcome = initialOutcome;
      sessionSequence = 0;
      failures.clear();
      for (const operation of Object.keys(calls) as MockRequestsOperation[]) calls[operation] = 0;
    },
    setSigningOutcome(outcome) {
      signingOutcome = outcome;
    },
    failNext(operation, error = new PortalApiError(503, 'MOCK_SERVICE_UNAVAILABLE', 'Mock service unavailable.')) {
      failures.set(operation, error);
    },
    getCallCount(operation) {
      return calls[operation];
    }
  };
}

function toRequestMap(source: CashRequestDetail[]): Map<string, CashRequestDetail> {
  return new Map(source.map((request) => [request.id, request]));
}

function findRequest(source: Map<string, CashRequestDetail>, requestId: string): CashRequestDetail {
  const request = source.get(requestId);
  if (!request) throw new PortalApiError(404, 'REQUEST_NOT_FOUND', `Request ${requestId} was not found.`, false);
  return request;
}

function findSession(source: Map<string, StoredSession>, sessionId: string): StoredSession {
  const session = source.get(sessionId);
  if (!session) throw new PortalApiError(404, 'SIGNING_SESSION_NOT_FOUND', `Signing session ${sessionId} was not found.`, false);
  return session;
}

function toSummary(request: CashRequestDetail): CashRequestSummary {
  const { expectedSigner: _, nextAction: __, documents: ___, evidence: ____, ...summary } = request;
  return clone(summary);
}

function applyTerminalRequestState(
  source: Map<string, CashRequestDetail>,
  session: SigningSession,
  status: MockSigningOutcome,
  occurredAt: Date
): void {
  const request = findRequest(source, session.requestId);
  const requestStatus = status === 'Verified' ? 'Submitted' : 'ReadyForSignature';
  const nextAction = status === 'Verified'
    ? 'No action. Provider verification evidence is available.'
    : status === 'Failed'
      ? 'Review the provider failure and start a new signing session.'
      : 'The signing session expired. Start a new session when ready.';

  source.set(request.id, {
    ...request,
    status: requestStatus,
    updatedAt: occurredAt.toISOString(),
    nextAction,
    evidence: [
      ...request.evidence,
      {
        id: `EV-${session.id}`,
        occurredAt: occurredAt.toISOString(),
        action: status === 'Verified' ? 'Provider signature verified' : `Signing session ${status.toLocaleLowerCase()}`,
        actor: 'Mock Qualified Signing Provider',
        detail: `Signing session ${session.id} reached terminal state ${status}.`
      }
    ]
  });
}

function isTerminal(status: SigningSessionStatus): status is MockSigningOutcome {
  return status === 'Verified' || status === 'Failed' || status === 'Expired';
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function wait(delayMs: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('The mock API request was aborted.', 'AbortError'));
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('The mock API request was aborted.', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, delayMs);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
