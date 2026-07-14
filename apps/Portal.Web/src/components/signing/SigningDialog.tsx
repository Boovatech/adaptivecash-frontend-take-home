import {
  CashRequestDetail,
  CreateSigningSessionCommand,
  PortalApiError,
  SigningSessionStatus
} from "@adaptivecash/api-client";
import { useRef } from "react";
import {
  isTerminalSigning,
  useCreateSigningSession,
  useSigningSessionQuery
} from "../../api/useSigning";
import {
  Button,
  Dialog, DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Link,
  Spinner
} from "@fluentui/react-components";
import { Text } from "@adaptivecash/shared-ui";

export function SigningDialog({ request, onClose }: {
  request: CashRequestDetail, onClose: () => void
}) {
  const idempotencyKey = useRef<string>(null);
  if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID();
  
  const fired = useRef(false);

  const doc = request.documents.find((d) =>
    d.status === "Ready") ?? request.documents[0];

  const create = useCreateSigningSession(request.id);
  const poll = useSigningSessionQuery(create.data?.id, request.id);

  const session = poll.data ?? create.data;
  const status = session?.status;
  const terminal = status ? isTerminalSigning(status) : false;

  const confirmDisabled = create.isPending || Boolean(create.data) || !doc;

  const confirm = () => {
    if (fired.current || confirmDisabled) return;
    fired.current = true;

    const command: CreateSigningSessionCommand = {
      requestId: request.id,
      documentVersionId: doc.versionId,
      versionHash: doc.versionHash,
      idempotencyKey: idempotencyKey.current!,
    };

    create.mutate(command, {
      onError: () => {
        fired.current = false;
      }
    });
  };

  const createError = create.error instanceof PortalApiError
    ? create.error?.message
    : create.isError ? "Could not start the signing session" : null;

  return (
    <Dialog open modalType="alert"
            onOpenChange={(_, data) => {
              if (!data.open) onClose();
            }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            Review and sign {request.id}
          </DialogTitle>
          <DialogContent>
            {!session ? (
              <div className="grid gap-3">
                <Text>
                  You are about to start an external signing
                  session with a
                  qualified provider. Review the immutable
                  facts before you
                  continue.
                </Text>
                <Facts
                  rows={[
                    ["Request", request.id],
                    ["Expected signer",
                      request.expectedSigner],
                    ["Document", doc?.name ?? "—"],
                    ["Version ID", doc?.versionId ?? "—"],
                    ["Version hash", doc?.versionHash ??
                    "—"],
                  ]}
                />
                {!doc && (
                  <Text style={{
                    color: "var(--ac-danger)"
                  }}>
                    This request has no signable document.
                  </Text>
                )}
                {createError && (
                  <Text style={{ color: "var(--ac-danger)" }} aria-live="polite">
                    {createError}
                  </Text>
                )}
              </div>
            ) : terminal ? (
              <TerminalPanel status={status as TerminalStatus} />
            ) : (
              <div className="grid gap-3" aria-live="polite">
                <Spinner label="Waiting for the provider to verify the signature…" />
                <Facts
                  rows={[
                    ["Provider", session.provider],
                    ["Session", session.id],
                    ["Status", session.status],
                    ["Expires", new
                    Date(session.expiresAt).toLocaleString()],
                  ]}
                />
                <Link href={session.redirectUrl} target="_blank" rel="noreferrer">
                  Open provider signing page ↗
                </Link>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            {!session ? (
              <>
                <Button appearance="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  disabled={confirmDisabled}
                  onClick={confirm}
                >
                  {create.isPending ? "Starting…" : "Confirm and sign"}
                </Button>
                {createError && !create.isPending && (
                  <Button appearance="secondary" onClick={confirm}>
                    Retry
                  </Button>
                )}
              </>
            ) : (
              <Button
                appearance="primary"
                onClick={onClose}
                disabled={!terminal && !poll.isError}
              >
                {terminal ? "Done" : "Close"}
              </Button>
            )}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )

  type TerminalStatus = Extract<SigningSessionStatus, "Verified" | "Failed" | "Expired">;

  function Facts({ rows }: { rows: [string, string][] }) {
    return (
      <dl className="m-0 grid gap-1.5">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[120px_1fr] gap-3 text-sm">
            <Text variant="muted" as="dt">
              {label}
            </Text>
            <dd className="m-0 min-w-0 break-all font-mono">{value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  function TerminalPanel({ status }: { status: TerminalStatus }) {
    const copy = {
      Verified: {
        color: "var(--ac-success)",
        title: "Signature verified",
        body: "The provider verified the signature. The request has been submitted.",
      },
      Failed: {
        color: "var(--ac-danger)",
        title: "Signing failed",
        body: "The provider reported a failure. The request is ready to sign again.",
      },
      Expired: {
        color: "var(--ac-warning)",
        title: "Session expired",
        body: "The session expired before completion. Start a new session when ready.",
      },
    }[status];
    return (
      <div className="grid gap-2" aria-live="polite">
        <Text style={{ color: copy.color }}
              className="text-base font-semibold">
          {copy.title}
        </Text>
        <Text variant="muted">{copy.body}</Text>
      </div>
    );
  }
}
