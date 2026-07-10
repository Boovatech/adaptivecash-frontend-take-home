import { Badge, type BadgeProps } from '@fluentui/react-components';

export type StatusTone = 'gray' | 'blue' | 'orange' | 'green' | 'red' | 'purple';

const TONE_TO_BADGE_COLOR: Record<StatusTone, BadgeProps['color']> = {
  gray: 'subtle',
  blue: 'informative',
  orange: 'warning',
  green: 'success',
  red: 'danger',
  purple: 'brand'
};

const VALUE_TONE: Record<string, StatusTone> = {
  New: 'gray',
  Draft: 'gray',
  Active: 'blue',
  'Sent for signing': 'blue',
  Review: 'orange',
  'In review': 'orange',
  Waiting: 'orange',
  Medium: 'orange',
  Done: 'green',
  Verified: 'green',
  Archived: 'green',
  Succeeded: 'green',
  Low: 'green',
  Allowed: 'green',
  'Partially signed': 'purple',
  High: 'red',
  Failed: 'red',
  Blocked: 'red'
};

export function toneForValue(value: string): StatusTone {
  return VALUE_TONE[value] ?? 'gray';
}

export function StatePill({ value, tone }: { value: string; tone?: StatusTone }) {
  const resolvedTone = tone ?? toneForValue(value);
  return (
    <Badge
      shape="rounded"
      appearance="tint"
      color={TONE_TO_BADGE_COLOR[resolvedTone]}
      title={value}
      style={{ maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}
    >
      <span className="block min-w-0 truncate">{value}</span>
    </Badge>
  );
}
