import { describe, expect, it } from 'vitest';
import { PortalApiError } from '@adaptivecash/api-client';
import { createMockRequestsApi } from '@adaptivecash/testing';

const fixedNow = () => new Date('2026-07-10T12:00:00Z');

describe('mock requests API contract', () => {
  it('filters requests by query and status', async () => {
    const { api } = createMockRequestsApi({ latencyMs: 0, now: fixedNow });

    const result = await api.listRequests({ query: 'north retail', status: 'ReadyForSignature' });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('REQ-2026-0142');
  });

  it('returns one signing session for a repeated idempotency key', async () => {
    const { api } = createMockRequestsApi({ latencyMs: 0, now: fixedNow });
    const request = await api.getRequest('REQ-2026-0142');
    const document = request.documents[0];
    const command = {
      requestId: request.id,
      documentVersionId: document.versionId,
      versionHash: document.versionHash,
      idempotencyKey: 'idem-contract-check'
    };

    const first = await api.createSigningSession(command);
    const repeated = await api.createSigningSession(command);

    expect(repeated).toEqual(first);
  });

  it('advances request state only after provider verification', async () => {
    const { api } = createMockRequestsApi({ latencyMs: 0, now: fixedNow });
    const request = await api.getRequest('REQ-2026-0142');
    const document = request.documents[0];
    const session = await api.createSigningSession({
      requestId: request.id,
      documentVersionId: document.versionId,
      versionHash: document.versionHash,
      idempotencyKey: 'idem-provider-check'
    });

    expect((await api.getRequest(request.id)).status).toBe('Signing');
    expect((await api.getSigningSession(session.id)).status).toBe('AwaitingProvider');
    expect((await api.getRequest(request.id)).status).toBe('Signing');
    expect((await api.getSigningSession(session.id)).status).toBe('Verified');
    expect((await api.getRequest(request.id)).status).toBe('Submitted');
  });

  it('rejects signing from an invalid workflow state', async () => {
    const { api } = createMockRequestsApi({ latencyMs: 0, now: fixedNow });
    const draft = await api.getRequest('REQ-2026-0143');
    const document = draft.documents[0];

    await expect(api.createSigningSession({
      requestId: draft.id,
      documentVersionId: document.versionId,
      versionHash: document.versionHash,
      idempotencyKey: 'idem-invalid-state'
    })).rejects.toMatchObject({
      status: 409,
      code: 'INVALID_REQUEST_STATE'
    } satisfies Partial<PortalApiError>);
  });

  it('allows a new session after a provider failure when the command has a new idempotency key', async () => {
    const controller = createMockRequestsApi({ latencyMs: 0, now: fixedNow, signingOutcome: 'Failed' });
    const request = await controller.api.getRequest('REQ-2026-0142');
    const document = request.documents[0];
    const baseCommand = {
      requestId: request.id,
      documentVersionId: document.versionId,
      versionHash: document.versionHash
    };
    const failedSession = await controller.api.createSigningSession({
      ...baseCommand,
      idempotencyKey: 'idem-failed-provider'
    });

    await controller.api.getSigningSession(failedSession.id);
    expect((await controller.api.getSigningSession(failedSession.id)).status).toBe('Failed');
    expect((await controller.api.getRequest(request.id)).status).toBe('ReadyForSignature');

    const retrySession = await controller.api.createSigningSession({
      ...baseCommand,
      idempotencyKey: 'idem-failed-provider-retry'
    });
    expect(retrySession.id).not.toBe(failedSession.id);
  });

  it('supports deterministic retryable failures and cancellation', async () => {
    const controller = createMockRequestsApi({ latencyMs: 20, now: fixedNow });
    controller.failNext('list');
    await expect(controller.api.listRequests({})).rejects.toMatchObject({
      status: 503,
      retryable: true
    } satisfies Partial<PortalApiError>);

    const abortController = new AbortController();
    const pending = controller.api.listRequests({}, abortController.signal);
    abortController.abort();
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
  });
});
