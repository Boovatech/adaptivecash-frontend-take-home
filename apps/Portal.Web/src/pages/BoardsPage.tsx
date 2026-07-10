import { Button } from '@fluentui/react-components';
import { Text } from '@adaptivecash/shared-ui';
import { DocumentWorkflowCard, type DocumentRow } from '@adaptivecash/business-ui';

const boardColumns = [
  { id: 'draft', label: 'Draft', dot: 'var(--ac-ink-muted)' },
  { id: 'review', label: 'Review', dot: 'var(--ac-warning)' },
  { id: 'signing', label: 'Signing', dot: 'var(--ac-primary)' },
  { id: 'evidence', label: 'Evidence', dot: 'var(--ac-secondary)' },
  { id: 'archived', label: 'Archived', dot: 'var(--ac-success)' }
] as const;

type BoardColumnId = (typeof boardColumns)[number]['id'];

function documentColumn(document: DocumentRow): BoardColumnId {
  if (document.state === 'Draft') return 'draft';
  if (document.state === 'In review') return 'review';
  if (document.state === 'Sent for signing' || document.state === 'Partially signed') return 'signing';
  if (document.state === 'Verified') return 'evidence';
  return 'archived';
}

export function BoardsPage({
  documents,
  navigate
}: {
  documents: DocumentRow[];
  navigate: (path: string) => void;
}) {
  const activeCount = documents.filter((doc) => !['Verified', 'Archived'].includes(doc.state)).length;

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-5">
        <div>
          <Text variant="muted" className="mb-1.5">
            AdaptiveCash / Documents &amp; Signing / Board
          </Text>
          <Text variant="title">Document Workflow Sprint</Text>
          <Text variant="muted" className="mt-1.5">
            June 24 – July 5, 2026 · {activeCount} active documents · 2 high-priority signers
          </Text>
        </div>
        <div className="flex gap-2">
          <Button appearance="secondary">Capacity</Button>
          <Button appearance="secondary">Analytics</Button>
        </div>
      </div>
      <div className="flex items-start gap-2.5 overflow-x-auto lg:grid lg:grid-cols-[repeat(5,minmax(220px,1fr))]">
        {boardColumns.map((column) => {
          const columnDocs = documents.filter((doc) => documentColumn(doc) === column.id);
          return (
            <div
              key={column.id}
              className="min-h-[470px] w-[260px] min-w-[220px] shrink-0 rounded-md lg:w-auto lg:shrink"
              style={{ background: 'var(--ac-surface)' }}
            >
              <div className="flex items-center justify-between gap-2 rounded-t-md px-2.5 py-2.5" style={{ background: 'var(--ac-surface-overlay)' }}>
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: column.dot }} />
                  {column.label}
                </span>
                <span
                  className="grid h-[22px] w-[22px] place-items-center rounded-full text-xs"
                  style={{ background: 'var(--ac-bg)', color: 'var(--ac-ink-muted)' }}
                >
                  {columnDocs.length}
                </span>
              </div>
              {columnDocs.map((document) => (
                <DocumentWorkflowCard
                  key={document.id}
                  document={document}
                  onOpen={(id) => navigate(`/documents/${encodeURIComponent(id)}`)}
                />
              ))}
              <Button appearance="subtle" className="mx-2 mb-2.5 justify-start">
                + New document
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
