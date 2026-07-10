import { Button } from '@fluentui/react-components';
import { Panel, Text } from '@adaptivecash/shared-ui';
import { DocumentTable, WorkItemCard, type PortalSnapshot } from '@adaptivecash/business-ui';

export function OverviewPage({
  snapshot,
  navigate
}: {
  snapshot: PortalSnapshot;
  navigate: (path: string) => void;
}) {
  const activeDocuments = snapshot.documents.filter((doc) => !['Verified', 'Archived'].includes(doc.state)).length;
  const waitingSignatures = snapshot.documents.filter((doc) => doc.state.includes('sign') || doc.state === 'Sent for signing').length;
  const metrics = [
    ['Active documents', String(activeDocuments), '+4 this week'],
    ['Waiting signatures', String(waitingSignatures), '2 high priority'],
    ['Evidence packages', '42', '0 failed validation'],
    ['AI suggestions', '31', snapshot.aiPolicy.mode]
  ];

  return (
    <div className="grid gap-4">
      <Panel className="grid grid-cols-[minmax(0,1.8fr)_minmax(260px,.8fr)] gap-6 p-6 max-lg:grid-cols-1">
        <div>
          <Text variant="eyebrow" className="mb-1.5">
            AdaptiveCash Portal Prototype
          </Text>
          <Text variant="title">Enterprise work portal for documents, signing and evidence</Text>
          <Text variant="muted" className="mt-2 max-w-[60ch]">
            AdaptiveCash-branded workspace: compact navigation, board/table density, command bars, contextual AI, and evidence-first language.
          </Text>
          <div className="mt-4 flex gap-2.5">
            <Button appearance="primary" onClick={() => navigate('/boards')}>
              Open workflow board
            </Button>
            <Button appearance="secondary" onClick={() => navigate('/documents')}>
              Open documents
            </Button>
          </div>
        </div>
        <div className="rounded-md border p-4" style={{ borderColor: 'var(--ac-line-soft)', background: 'var(--ac-surface)' }}>
          <Text variant="caption">Phase 0.5 gate</Text>
          <strong className="my-2 block text-sm">create → signer → verify → evidence</strong>
          <Text variant="caption" as="p">
            Real aDocs sandbox run remains the next technical proof.
          </Text>
        </div>
      </Panel>

      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {metrics.map(([label, value, caption]) => (
          <Panel className="p-4" key={label}>
            <Text variant="caption">{label}</Text>
            <strong className="my-1.5 block text-2xl">{value}</strong>
            <Text variant="caption" as="small">
              {caption}
            </Text>
          </Panel>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(320px,.8fr)] items-start gap-4 max-lg:grid-cols-1">
        <Panel className="overflow-x-auto">
          <DocumentTable documents={snapshot.documents} onOpen={(id) => navigate(`/documents/${encodeURIComponent(id)}`)} />
        </Panel>
        <Panel className="p-3.5">
          <h3 className="m-0 mb-3 text-base font-semibold">Delivery backlog</h3>
          <div className="grid gap-2">
            {snapshot.workItems.slice(0, 4).map((item) => (
              <WorkItemCard key={item.id} item={item} />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
