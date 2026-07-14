import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { FluentProvider } from "@fluentui/react-components";
import { ledgerDeskLightTheme } from "@adaptivecash/design-tokens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function renderWithProviders(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <FluentProvider theme={ledgerDeskLightTheme}>{children}</FluentProvider>
      </QueryClientProvider>
    );
  }

  return { queryClient, ...render(ui, { wrapper: Wrapper }) };
}
