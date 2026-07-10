import { Panel, StatePill } from '@adaptivecash/shared-ui';
import { Badge } from '@fluentui/react-components';
import type { DocumentRow } from './types';

function CompactBadge({
  value,
  color
}: {
  value: string;
  color: 'brand' | 'informative';
}) {
  return (
    <Badge
      appearance="tint"
      color={color}
      title={value}
      className="max-w-full min-w-0"
      style={{ overflow: 'hidden' }}
    >
      <span className="block min-w-0 truncate">{value}</span>
    </Badge>
  );
}

export function DocumentWorkflowCard({
  document,
  onOpen
}: {
  document: DocumentRow;
  onOpen: (id: string) => void;
}) {
  return (
    <Panel interactive onClick={() => onOpen(document.id)} className="m-2 min-w-0 p-3">
      <div className="flex min-w-0 items-center justify-between gap-2 text-xs">
        <span className="min-w-0 truncate font-mono font-semibold" style={{ color: 'var(--ac-primary)' }} title={document.id}>
          {document.id}
        </span>
        <span className="min-w-0 max-w-[58%] shrink-0">
          <StatePill value={document.risk} />
        </span>
      </div>
      <h4 className="my-2 min-w-0 overflow-hidden text-sm font-semibold leading-snug" title={document.title}>
        {document.title}
      </h4>
      <p className="m-0 mb-2 min-w-0 truncate text-xs" style={{ color: 'var(--ac-ink-muted)' }} title={document.counterparty}>
        {document.counterparty}
      </p>
      <div className="mb-2 flex min-w-0 items-center justify-between gap-2 text-xs" style={{ color: 'var(--ac-ink-muted)' }}>
        <span className="min-w-0 truncate" title={document.owner}>
          {document.owner}
        </span>
        <span className="shrink-0 whitespace-nowrap">{document.signers} signers</span>
      </div>
      <div className="flex min-w-0 flex-wrap gap-1.5">
        <CompactBadge value={document.documentType} color="informative" />
        <CompactBadge value={document.workflow} color="brand" />
      </div>
    </Panel>
  );
}
