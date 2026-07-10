import { Button } from '@fluentui/react-components';
import { Panel, SectionHeader, StatePill, Text } from '@adaptivecash/shared-ui';
import { DocumentTable, type DocumentRow, type PortalSnapshot } from '@adaptivecash/business-ui';

function DocumentPreview({ document, navigate }: { document: DocumentRow; navigate: (path: string) => void }) {
  return (
    <Panel className="p-4">
      <div className="mb-3 flex items-start gap-3">
        <span
          className="grid h-9 w-9 place-items-center rounded-md"
          style={{ background: 'var(--ac-surface)', color: 'var(--ac-secondary)' }}
        >
          ▤
        </span>
        <div>
          <h3 className="m-0 mb-1 text-base font-semibold">{document.title}</h3>
          <Text variant="muted">{document.id}</Text>
        </div>
      </div>
      <div
        className="mb-4 min-h-[260px] rounded-md border p-3.5"
        style={{ borderColor: 'var(--ac-line)', background: 'var(--ac-surface)' }}
        aria-label="Document preview placeholder"
      >
        <div className="mb-4 flex gap-1.5">
          <span className="block h-2 w-9" style={{ background: 'var(--ac-line-soft)' }} />
          <span className="block h-2 w-9" style={{ background: 'var(--ac-line-soft)' }} />
        </div>
        {[100, 100, 62, 100].map((w, i) => (
          <span key={i} className="mb-3 block h-2.5" style={{ width: `${w}%`, background: 'var(--ac-line-soft)' }} />
        ))}
      </div>
      <dl className="m-0 mb-4 grid gap-2.5">
        <div className="flex justify-between gap-4 border-t pt-2.5 text-sm" style={{ borderColor: 'var(--ac-line-soft)' }}>
          <Text variant="muted" as="dt">Workflow</Text>
          <dd className="m-0 text-right">{document.workflow}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t pt-2.5 text-sm" style={{ borderColor: 'var(--ac-line-soft)' }}>
          <Text variant="muted" as="dt">Current state</Text>
          <dd className="m-0 text-right">
            <StatePill value={document.state} />
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-t pt-2.5 text-sm" style={{ borderColor: 'var(--ac-line-soft)' }}>
          <Text variant="muted" as="dt">Evidence mode</Text>
          <dd className="m-0 text-right">Hash + audit + archive manifest</dd>
        </div>
      </dl>
      <Button appearance="primary" onClick={() => navigate(`/documents/${encodeURIComponent(document.id)}`)}>
        Open detail
      </Button>
    </Panel>
  );
}

export function DocumentsPage({ snapshot, navigate }: { snapshot: PortalSnapshot; navigate: (path: string) => void }) {
  return (
    <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(320px,.8fr)] items-start gap-4 max-lg:grid-cols-1">
      <div className="min-w-0">
        <SectionHeader eyebrow="Documents" title="Review workspace" className="mb-3" />
        <Panel className="overflow-x-auto">
          <div className="flex items-center justify-between gap-4 border-b p-3.5" style={{ borderColor: 'var(--ac-line-soft)' }}>
            <h3 className="m-0 text-base font-semibold">Document inbox</h3>
            <Text variant="muted" as="span">
              {snapshot.documents.length} documents · tenant {snapshot.tenant.id}
            </Text>
          </div>
          <DocumentTable documents={snapshot.documents} onOpen={(id) => navigate(`/documents/${encodeURIComponent(id)}`)} />
        </Panel>
      </div>
      <DocumentPreview document={snapshot.documents[0]} navigate={navigate} />
    </div>
  );
}
