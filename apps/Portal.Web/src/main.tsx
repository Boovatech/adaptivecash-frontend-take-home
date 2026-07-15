import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { FluentProvider } from '@fluentui/react-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { ledgerDeskLightTheme } from '@adaptivecash/design-tokens';
import '@adaptivecash/design-tokens/tokens.css';
import { queryClient } from './api/queryClient';
import { AppShell } from './shell/AppShell';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={ledgerDeskLightTheme}>
        <AppShell />
      </FluentProvider>
    </QueryClientProvider>
  </StrictMode>
);
