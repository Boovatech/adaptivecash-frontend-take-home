import { Avatar, Badge, Button, Input } from '@fluentui/react-components';
import { Add20Regular, Search20Regular } from '@fluentui/react-icons';
import type { PortalDataState } from '../api/portalData';

export function TopBar({ dataState }: { dataState: PortalDataState }) {
  return (
    <header
      className="flex h-12 min-w-0 items-center gap-3.5 px-4"
      style={{ background: 'var(--ac-secondary)', color: 'var(--ac-on-secondary)' }}
    >
      <div
        className="grid h-8 w-8 shrink-0 place-items-center rounded-md font-bold"
        style={{ background: 'var(--ac-on-secondary-surface)', border: '1px solid var(--ac-on-secondary-line)' }}
      >
        AC
      </div>
      <div className="flex min-w-0 items-baseline gap-2.5">
        <strong className="text-base">AdaptiveCash</strong>
        <span className="truncate text-sm max-sm:hidden" style={{ color: 'var(--ac-on-secondary-muted)' }}>
          Portal / Documents &amp; Signing
        </span>
      </div>
      <Input
        contentBefore={<Search20Regular />}
        placeholder="Search work items, documents, signers…"
        className="ml-2 h-8 max-w-[560px] flex-1 max-sm:hidden"
        appearance="filled-lighter"
      />
      <div className="ml-auto flex shrink-0 items-center gap-3.5">
        <Badge
          appearance="tint"
          color={dataState.source === 'api' ? 'success' : 'warning'}
          title={dataState.error ?? 'Loaded from Portal.Api'}
          className="max-sm:hidden"
        >
          {dataState.source === 'api' ? 'Portal.Api live' : 'mock fallback'}
        </Badge>
        <Button appearance="secondary" icon={<Add20Regular />} className="shrink-0 max-sm:hidden">
          New
        </Button>
        <Avatar name="AdaptiveCash User" initials="AB" color="colorful" aria-label="User profile" />
      </div>
    </header>
  );
}
