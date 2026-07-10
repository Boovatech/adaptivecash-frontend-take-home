import { createLightTheme, createDarkTheme, type BrandVariants, type Theme } from '@fluentui/react-components';

// ponytail: hand-generated HSL ramp instead of a full perceptual token-ramp
// tool. Good enough for a single-brand prototype theme; swap for a proper
// generator (e.g. a Material/Fluent ramp tool) if a second brand hue or
// dark-mode parity work ever needs perceptual uniformity.
function hslToHex(h: number, sPercent: number, lPercent: number): string {
  const s = sPercent / 100;
  const l = lPercent / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Ledger Amber base: H24 S58 (matches #B8622E). 16-step ramp, dark to light.
const AMBER_H = 24;
const AMBER_S = 58;
const RAMP_STEPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160] as const;
const RAMP_LIGHTNESS = [6, 12, 18, 24, 30, 36, 42, 45, 52, 60, 68, 75, 82, 88, 93, 97];

export const ledgerAmberRamp: BrandVariants = RAMP_STEPS.reduce((acc, step, i) => {
  acc[step] = hslToHex(AMBER_H, AMBER_S, RAMP_LIGHTNESS[i]);
  return acc;
}, {} as Record<(typeof RAMP_STEPS)[number], string>) as BrandVariants;

export const ledgerDeskLightTheme: Theme = createLightTheme(ledgerAmberRamp);
export const ledgerDeskDarkTheme: Theme = createDarkTheme(ledgerAmberRamp);
