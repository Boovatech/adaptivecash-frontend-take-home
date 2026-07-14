import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Globals are disabled in this project, so RTL's auto-cleanup never registers.
// Unmount between tests to avoid DOM bleed-through (duplicate elements) and to
// disconnect Fluent's tabster MutationObservers before teardown.
afterEach(() => cleanup());
