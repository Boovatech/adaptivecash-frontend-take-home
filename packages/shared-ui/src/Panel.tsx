import { Card, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import type { CSSProperties, ReactNode } from 'react';

const useStyles = makeStyles({
  resting: {
    boxShadow: 'var(--ac-shadow-resting)',
    transitionProperty: 'box-shadow, transform',
    transitionDuration: tokens.durationFast,
    transitionTimingFunction: tokens.curveEasyEase
  },
  interactive: {
    cursor: 'pointer',
    ':hover': {
      boxShadow: 'var(--ac-shadow-raised)',
      transform: 'translateY(-1px)'
    }
  },
  floating: {
    boxShadow: 'var(--ac-shadow-raised)'
  }
});

/**
 * Card wrapper implementing DESIGN.md's "Earned Shadow Rule": a resting
 * shadow always, a raised shadow only when `interactive` (hover/press) or
 * `floating` (a genuinely sticky/floating panel, e.g. the AI rail). Never
 * elevate a static, non-interactive, non-floating panel past resting.
 */
export function Panel({
  interactive = false,
  floating = false,
  className,
  style,
  children,
  onClick
}: {
  interactive?: boolean;
  floating?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
}) {
  const styles = useStyles();
  return (
    <Card
      appearance="outline"
      className={mergeClasses(
        styles.resting,
        interactive && styles.interactive,
        floating && styles.floating,
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}
