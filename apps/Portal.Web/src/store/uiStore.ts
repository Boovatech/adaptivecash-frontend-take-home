import { create } from 'zustand';

// UI-only state (ADR-008): never store API entities here, only ids/flags.
// Server data itself lives in TanStack Query (usePortalSnapshot).
interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  selectedDocumentId: string | null;
  selectDocument: (id: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  selectedDocumentId: null,
  selectDocument: (id) => set({ selectedDocumentId: id })
}));
