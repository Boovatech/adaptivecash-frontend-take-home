export type RequestStatus =
  | 'Draft'
  | 'InReview'
  | 'ReadyForSignature'
  | 'Signing'
  | 'Submitted'
  | 'Failed';

export type CashServiceType = 'CashCollection' | 'CashDelivery';

export interface CashRequestSummary {
  id: string;
  serviceType: CashServiceType;
  applicant: string;
  branch: string;
  requestedFor: string;
  status: RequestStatus;
  owner: string;
  updatedAt: string;
}

export interface RequestDocument {
  id: string;
  name: string;
  versionId: string;
  versionHash: string;
  status: 'Ready' | 'RequiresReview';
}

export interface RequestEvidenceEvent {
  id: string;
  occurredAt: string;
  action: string;
  actor: string;
  detail: string;
}

export interface CashRequestDetail extends CashRequestSummary {
  expectedSigner: string;
  nextAction: string;
  documents: RequestDocument[];
  evidence: RequestEvidenceEvent[];
}

export type SigningSessionStatus =
  | 'Pending'
  | 'AwaitingProvider'
  | 'Verified'
  | 'Failed'
  | 'Expired';

export interface SigningSession {
  id: string;
  requestId: string;
  documentVersionId: string;
  provider: string;
  status: SigningSessionStatus;
  redirectUrl: string;
  createdAt: string;
  expiresAt: string;
}

export interface RequestListFilters {
  query?: string;
  status?: RequestStatus;
}

export interface CreateSigningSessionCommand {
  requestId: string;
  documentVersionId: string;
  versionHash: string;
  idempotencyKey: string;
}

export interface PortalRequestsApi {
  listRequests(filters: RequestListFilters, signal?: AbortSignal): Promise<CashRequestSummary[]>;
  getRequest(requestId: string, signal?: AbortSignal): Promise<CashRequestDetail>;
  createSigningSession(command: CreateSigningSessionCommand, signal?: AbortSignal): Promise<SigningSession>;
  getSigningSession(sessionId: string, signal?: AbortSignal): Promise<SigningSession>;
}

export class PortalApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly retryable = status >= 500
  ) {
    super(message);
    this.name = 'PortalApiError';
  }
}
