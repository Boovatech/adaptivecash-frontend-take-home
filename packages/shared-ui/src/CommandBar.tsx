import { Button } from '@fluentui/react-components';
import {
  ArrowClockwise20Regular,
  Filter20Regular,
  FullScreenMaximize20Regular,
  MoreHorizontal20Regular
} from '@fluentui/react-icons';
import type { ReactNode } from 'react';
import { Text } from './primitives';

export function CommandBar({ primaryLabel, onPrimary }: { primaryLabel: string; onPrimary?: () => void }) {
  return (
    <div
      role="toolbar"
      aria-label="Page commands"
      className="mb-4 flex h-10 items-center gap-2 overflow-x-auto rounded-md border px-2"
      style={{ border: 'none', background: 'var(--ac-bg)' }}
    >
      <Button appearance="primary" size="small" onClick={onPrimary}>
        + {primaryLabel}
      </Button>
      <Button appearance="secondary" size="small" icon={<Filter20Regular />} aria-label="Filters" />
      <Button appearance="secondary" size="small">
        Group by: Status
      </Button>
      <Button appearance="secondary" size="small">
        View: Board
      </Button>
      <div className="ml-auto flex items-center gap-2">
        <Button appearance="secondary" size="small" icon={<ArrowClockwise20Regular />} aria-label="Refresh" />
        <Button appearance="subtle" size="small" icon={<FullScreenMaximize20Regular />} aria-label="Full screen" />
        <Button appearance="subtle" size="small" icon={<MoreHorizontal20Regular />} aria-label="More actions" />
      </div>
    </div>
  );
}

export function HubHeader({
  breadcrumb,
  title,
  description,
  tabs
}: {
  breadcrumb: ReactNode;
  title: string;
  description: string;
  tabs?: ReactNode;
}) {
  return (
    <div className="mb-3">
      <Text variant="caption" as="div" className="mb-2 flex gap-2">
        {breadcrumb}
      </Text>
      <div className="mb-3 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
        <div>
          <h1 className="m-0 text-[1.75rem] font-semibold leading-tight tracking-[-0.01em]">{title}</h1>
          <Text variant="muted" className="mt-1.5">
            {description}
          </Text>
        </div>
        {tabs}
      </div>
    </div>
  );
}
