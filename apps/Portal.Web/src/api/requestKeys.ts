import { RequestListFilters } from "@adaptivecash/api-client";

export const TENANT_ID = 'ACME-BANK-UA';
export const requestKeys = {
  all: ['requests', TENANT_ID] as const,
  list: (filters: RequestListFilters) => 
    ['requests', TENANT_ID, 'list', filters] as const,
  detail: (requestId: string) =>
    ['requests', TENANT_ID, 'detail', requestId] as const,
  signing: (sessionId: string) => ['signing', sessionId] as const,
};
