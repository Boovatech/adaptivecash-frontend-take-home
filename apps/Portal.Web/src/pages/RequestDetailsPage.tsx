import { ArrowLeft20Regular } from "@fluentui/react-icons";
import { useRequestQuery } from "../api/useRequestsQuery";
import { Button, Link, Spinner } from "@fluentui/react-components";
import { PortalApiError, RequestEvidenceEvent } from "@adaptivecash/api-client";
import { Panel, StatePill, Text } from "@adaptivecash/shared-ui";
import { RequestStatusPill, TimelineItem } from "@adaptivecash/business-ui";
import { useState } from "react";
import { SigningDialog } from "../components/signing/SigningDialog";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

// TODO: move to the shared utils
function formatWhen(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

function toTimelineEvent(e: RequestEvidenceEvent) {
  return {
    time: formatWhen(e.occurredAt),
    action: e.action,
    actor: e.actor,
    detail: e.detail,
    tone: "blue" as const,
  };
}

export function RequestDetailPage({ requestId, navigate }: {
  requestId: string;
  navigate: (path: string) => void;
}) {
  const { data, isLoading, isError, refetch, error } = useRequestQuery(requestId);
  const [signingOpen, setSigningOpen] = useState(false);

  const backLink = (
    <Link as="button" className="mb-3 inline-flex items-center gap-1" onClick={() => navigate("/requests")}>
      <ArrowLeft20Regular />
      Back to requests
    </Link>
  );

  if (isLoading) {
    return (
      <div className="min-w-0">
        {backLink}
        <Panel className="p-8">
          <Spinner label="Loading request…" />
        </Panel>
      </div>
    );
  }

  if (isError && error instanceof PortalApiError && error.status === 404) {
    return (
      <div className="min-w-0">
        {backLink}
        <Panel className="max-w-[720px] p-7">
          <h2 className="mt-0">Request not found</h2>
          <Text variant="muted" className="mb-3">
            No request matches <span className="font-mono">{requestId}</span> in the current API snapshot.
          </Text>
          <Button appearance="primary" onClick={() => navigate("/requests")}>
            Back to requests
          </Button>
        </Panel>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-w-0">
        {backLink}
        <Panel className="p-8">
          <Text className="mb-3 block">Could not load this request.</Text>
          <Button appearance="primary" onClick={() => refetch()}>
            Retry
          </Button>
        </Panel>
      </div>
    );
  }

  const canSign = data.status === "ReadyForSignature";

  return (
    <div className="min-w-0">
      {backLink}
      <div className="grid grid-cols-[minmax(0,1.45fr)_minmax(340px,.75fr)] items-start gap-4 max-lg:grid-cols-1">
        <div className="min-w-0">
          <Panel className="mb-3.5 flex items-start justify-between gap-4 p-4">
            <div className="min-w-0">
              <Text variant="eyebrow">Request detail</Text>
              <Text variant="title" className="font-mono">
                {data.id}
              </Text>
              <Text variant="muted" className="mt-2">
                {data.applicant} · {data.branch}
              </Text>
            </div>
            <RequestStatusPill status={data.status} />
          </Panel>

          <Panel className="mb-3.5 p-4">
            <h3 className="mb-3 mt-0 text-base font-semibold">Documents</h3>
            {data.documents.length === 0 ? (
              <Text variant="muted">No documents attached.</Text>
            ) : (
              <ul className="m-0 list-none p-0">
                {data.documents.map((doc) => (
                  <li key={doc.id} className="border-b py-3 last:border-b-0"
                      style={{ borderColor: "var(--ac-line-soft)" }}>
                    <div className="flex items-center justify-between gap-3">
                      <strong className="font-semibold">{doc.name}</strong>
                      <StatePill value={doc.status} tone={doc.status === "Ready" ? "green" : "orange"} />
                    </div>
                    <dl className="m-0 mt-2 grid gap-1">
                      <div className="grid grid-cols-[110px_1fr] gap-3 text-xs">
                        <Text variant="muted" as="dt">Version ID</Text>
                        <dd className="m-0 break-all font-mono">
                          {doc.versionId}
                        </dd>
                      </div>
                      <div className="grid grid-cols-[110px_1fr] gap-3 text-xs">
                        <Text variant="muted" as="dt">Version hash</Text>
                        <dd className="m-0 break-all font-mono">
                          {doc.versionHash}
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel className="p-4">
            <h3 className="mb-3 mt-0 text-base font-semibold">Evidence</h3>
            {data.evidence.length === 0 ? (
              <Text variant="muted">No evidence recorded yet.</Text>
            ) : (
              <ol className="m-0 list-none p-0">
                {data.evidence.map((e) => (
                  <TimelineItem key={e.id} item={toTimelineEvent(e)} />
                ))}
              </ol>
            )}
          </Panel>
        </div>
        <aside className="sticky top-3.5">
          <Panel className="p-4">
            <h3 className="mb-2 mt-0 text-base font-semibold">Facts</h3>
            <dl className="m-0 mb-4 grid gap-2">
              {[
                ["Service", data.serviceType],
                ["Applicant", data.applicant],
                ["Branch", data.branch],
                ["Expected signer", data.expectedSigner],
                ["Requested for", formatWhen(data.requestedFor)],
                ["Owner", data.owner],
                ["Updated", formatWhen(data.updatedAt)],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[130px_1fr] gap-4 text-sm">
                  <Text variant="muted" as="dt">{label}</Text>
                  <dd className="m-0 min-w-0 break-words">{value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mb-2 text-base font-semibold">Next
              action</h3>
            <p className="mt-0 text-sm">{data.nextAction}</p>

            {canSign && (
              <Button appearance="primary" className="mt-2 w-full" onClick={() => setSigningOpen(true)}>
                Review and sign
              </Button>
            )}
            {signingOpen && canSign && (
              <SigningDialog request={data} onClose={() => setSigningOpen(false)} />
            )}
          </Panel>
        </aside>
      </div>
    </div>
  );
}
