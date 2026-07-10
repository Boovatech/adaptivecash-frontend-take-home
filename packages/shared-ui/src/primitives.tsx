import { Button, mergeClasses } from '@fluentui/react-components';
import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * Shared styling primitives for the "Ledger Desk" system (DESIGN.md).
 * Pages compose these instead of repeating Tailwind/inline-var one-offs;
 * all values come from design tokens.
 */

export type TextVariant = 'eyebrow' | 'title' | 'section' | 'body' | 'muted' | 'caption' | 'mono';

const textVariants: Record<TextVariant, { className: string; style?: CSSProperties; tag: ElementType }> = {
  eyebrow: { className: 'm-0 mb-1 text-sm font-semibold', style: { color: 'var(--ac-primary)' }, tag: 'p' },
  title: { className: 'm-0 text-2xl font-semibold leading-tight', tag: 'h2' },
  section: { className: 'm-0 text-base font-semibold', tag: 'h3' },
  body: { className: 'm-0 text-sm leading-normal', tag: 'p' },
  muted: { className: 'm-0 text-sm leading-normal', style: { color: 'var(--ac-ink-muted)' }, tag: 'p' },
  caption: { className: 'm-0 text-xs leading-normal', style: { color: 'var(--ac-ink-muted)' }, tag: 'span' },
  mono: { className: 'm-0 font-mono text-xs', tag: 'span' }
};

export function Text({
  variant = 'body',
  as,
  className,
  style,
  children
}: {
  variant?: TextVariant;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const spec = textVariants[variant];
  const Tag = as ?? spec.tag;
  return (
    <Tag className={mergeClasses(spec.className, className)} style={{ ...spec.style, ...style }}>
      {children}
    </Tag>
  );
}

const stackGaps = { tight: 'var(--ac-space-1)', default: 'var(--ac-space-2)', loose: 'var(--ac-space-4)' } as const;

export function Stack({
  gap = 'default',
  direction = 'column',
  className,
  style,
  children
}: {
  gap?: keyof typeof stackGaps;
  direction?: 'column' | 'row';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={mergeClasses('flex', direction === 'column' ? 'flex-col' : 'flex-row items-center', className)}
      style={{ gap: stackGaps[gap], ...style }}
    >
      {children}
    </div>
  );
}

/** Page/section title block: amber eyebrow, title, optional right-aligned muted description. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className = 'mb-4'
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Margin/layout overrides; replaces the default `mb-4` entirely (Tailwind classes don't dedupe). */
  className?: string;
}) {
  return (
    <div
      className={mergeClasses(
        'flex items-start justify-between gap-6 max-sm:flex-col max-sm:gap-2',
        className
      )}
    >
      <div className="shrink-0 max-sm:shrink">
        <Text variant="eyebrow">{eyebrow}</Text>
        <Text variant="title">{title}</Text>
      </div>
      {description ? (
        <Text variant="muted" className="max-w-[46ch]">
          {description}
        </Text>
      ) : null}
    </div>
  );
}

/** Tokenized inset surface for question/answer/preview/fact blocks. */
export function SurfaceBlock({
  tone = 'neutral',
  className,
  style,
  children
}: {
  tone?: 'neutral' | 'answer' | 'question';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const backgrounds = {
    neutral: 'var(--ac-surface)',
    question: 'var(--ac-ai-question-bg)',
    answer: 'var(--ac-ai-answer-bg)'
  } as const;
  return (
    <div
      className={mergeClasses('rounded-md text-sm leading-normal', className)}
      style={{ background: backgrounds[tone], padding: 'var(--ac-space-3)', ...style }}
    >
      {children}
    </div>
  );
}

/** Vertical action group: full-width, left-aligned subtle buttons inside one bordered block. */
export function ActionList({
  items,
  className
}: {
  items: { label: string; onClick?: () => void }[];
  className?: string;
}) {
  return (
    <div
      className={mergeClasses('flex flex-col overflow-hidden rounded-md border', className)}
      style={{ borderColor: 'var(--ac-line)' }}
    >
      {items.map((item) => (
        <Button
          key={item.label}
          appearance="subtle"
          size="small"
          className="w-full rounded-none"
          style={{ justifyContent: 'flex-start', textAlign: 'left' }}
          onClick={item.onClick}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
