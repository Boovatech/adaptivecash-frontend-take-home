import { Text } from '@adaptivecash/shared-ui';
import type { EvidenceEvent } from './types';

const TONE_DOT_COLOR: Record<EvidenceEvent['tone'], string> = {
  gray: 'var(--ac-ink-muted)',
  blue: 'var(--ac-secondary)',
  orange: 'var(--ac-warning)',
  green: 'var(--ac-success)',
  red: 'var(--ac-danger)',
  purple: 'var(--ac-primary)'
};

export function TimelineItem({ item }: { item: EvidenceEvent }) {
  return (
    <li className="group relative flex gap-2.5 pb-5 last:pb-0">
      <span
        className="relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
        style={{ background: TONE_DOT_COLOR[item.tone], borderColor: 'var(--ac-bg)', boxShadow: '0 0 0 1px var(--ac-line)' }}
      />
      <span
        aria-hidden
        className="absolute left-[6px] top-[18px] bottom-0 w-px group-last:hidden"
        style={{ background: 'var(--ac-line)' }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2.5 text-sm">
          <strong className="font-semibold">{item.action}</strong>
          <Text variant="muted" as="span">
            {item.time}
          </Text>
        </div>
        <Text variant="muted" className="my-1">
          {item.detail}
        </Text>
        <Text variant="caption" as="small">
          {item.actor}
        </Text>
      </div>
    </li>
  );
}
