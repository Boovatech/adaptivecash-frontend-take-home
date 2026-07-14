import { RequestListFilters } from "@adaptivecash/api-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { requestKeys } from "./requestKeys";
import { requestsApi } from "./requestsApi";

export function useRequestsQuery(filters: RequestListFilters) {
  return useQuery({
    queryKey: requestKeys.list(filters),
    queryFn: ({ signal }) =>
      requestsApi.listRequests(filters, signal),
    placeholderData: keepPreviousData,
  });
}