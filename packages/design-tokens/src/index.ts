export { ledgerDeskLightTheme, ledgerDeskDarkTheme, ledgerAmberRamp } from './theme';

// Hex mirrors of tokens.css, for contexts that need a JS value (Fluent Badge
// color props, computed styles, tests) rather than a CSS custom property.
export const tokens = {
  primary: '#B8622E',
  primaryDeep: '#8F4A20',
  secondary: '#212C42',
  secondaryDeep: '#141A28',
  bg: '#FFFFFF',
  surface: '#F5F6F8',
  ink: '#23262B',
  inkMuted: '#5B5E66',
  line: '#E2E4E9',
  lineSoft: '#EDEEF1',
  success: '#1F7A3D',
  successBg: '#E4F5EA',
  warning: '#9A5B00',
  warningBg: '#FCEFD8',
  danger: '#A32A2A',
  dangerBg: '#FBE7E7'
} as const;
