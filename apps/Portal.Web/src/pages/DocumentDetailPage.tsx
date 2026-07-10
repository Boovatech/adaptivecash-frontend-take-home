import { Button, Link } from '@fluentui/react-components';
import { ArrowLeft20Regular } from '@fluentui/react-icons';
import { Panel, StatePill, Text } from '@adaptivecash/shared-ui';
import { TimelineItem, type DocumentRow, type EvidenceEvent } from '@adaptivecash/business-ui';

export function DocumentDetailPage({
  document,
  events,
  navigate
}: {
  document?: DocumentRow;
  events: EvidenceEvent[];
  navigate: (path: string) => void;
}) {
  if (!document) {
    return (
      <Panel className="max-w-[720px] p-7">
        <h2 className="mt-0">Document not found</h2>
        <Text variant="muted" className="mb-3">
          The route is wired, but this document is not present in the current API/mock snapshot.
        </Text>
        <Button appearance="primary" onClick={() => navigate('/documents')}>
          Back to inbox
        </Button>
      </Panel>
    );
  }

  const documentEvents = events.filter((item) => !item.documentId || item.documentId === document.id);

  return (
    <div className="grid grid-cols-[minmax(0,1.45fr)_minmax(340px,.75fr)] items-start gap-4 max-lg:grid-cols-1">
      <div className="min-w-0">
        <Link as="button" className="mb-3 inline-flex items-center gap-1" onClick={() => navigate('/documents')}>
          <ArrowLeft20Regular /> Back to documents
        </Link>
        <Panel className="mb-3.5 flex items-start justify-between gap-4 p-4">
          <div>
            <Text variant="eyebrow">Document detail</Text>
            <Text variant="title">{document.title}</Text>
            <Text variant="muted" className="mt-2 max-w-[70ch]">
              {document.summary}
            </Text>
          </div>
          <StatePill value={document.state} />
        </Panel>
        <Panel className="min-h-[500px] p-3.5">
          <div className="mb-4 flex gap-1.5">
            <span className="block h-2 w-9" style={{ background: 'var(--ac-line-soft)' }} />
            <span className="block h-2 w-9" style={{ background: 'var(--ac-line-soft)' }} />
          </div>
          {[100, 100, 62, 100, 100, 62, 100].map((w, i) => (
            <span key={i} className="mb-3 block h-2.5" style={{ width: `${w}%`, background: 'var(--ac-line-soft)' }} />
          ))}
        </Panel>
      </div>
      <aside className="sticky top-3.5">
        <Panel className="p-4">
          <h3 className="mb-2 mt-0 text-base font-semibold">Workflow facts</h3>
          <dl className="m-0 mb-4 grid gap-2">
            {[
              ['ID', document.id],
              ['Type', document.documentType],
              ['Counterparty', document.counterparty],
              ['Signers', document.signers]
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[130px_1fr] gap-4 text-sm">
                <Text variant="muted" as="dt">
                  {label}
                </Text>
                <dd className="m-0">{value}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[130px_1fr] gap-4 text-sm">
              <Text variant="muted" as="dt">
                Version hash
              </Text>
              <dd className="m-0 break-all font-mono text-[11px]">{document.versionHash}</dd>
            </div>
          </dl>
          <h3 className="mb-2 text-base font-semibold">Next action</h3>
          <p className="mt-0 text-sm">{document.nextAction}</p>
          <div className="mb-4 mt-3 flex gap-2.5">
            <Button appearance="primary">Open review</Button>
            <Button appearance="secondary">Evidence</Button>
          </div>
          <h3 className="mb-2 text-base font-semibold">Recent evidence</h3>
          <ol className="m-0 list-none p-0">
            {documentEvents.map((item) => (
              <TimelineItem key={`${item.time}-${item.action}`} item={item} />
            ))}
          </ol>
        </Panel>
      </aside>
    </div>
  );
}
