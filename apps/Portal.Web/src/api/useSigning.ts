import { CreateSigningSessionCommand, SigningSessionStatus } from "@adaptivecash/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestsApi } from "./requestsApi";
import { requestKeys } from "./requestKeys";

// TODO: make statuses as constants not to use strings
export function isTerminalSigning(status: SigningSessionStatus): boolean {
  return status === "Verified" || status === "Failed" || status === "Expired";
}

export function useCreateSigningSession(requestId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: CreateSigningSessionCommand) =>
      requestsApi.createSigningSession(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requestKeys.all });
    },
  });
}

export function useSigningSessionQuery(sessionId: string | undefined, requestId: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: requestKeys.signing(sessionId ?? "pending"),
    enabled: Boolean(sessionId),
    queryFn: async ({ signal }) => {
      const session = await requestsApi.getSigningSession(sessionId!, signal);

      if (isTerminalSigning(session.status)) {
        await queryClient.invalidateQueries({ queryKey: requestKeys.all });
      }

      return session;
    },
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status && isTerminalSigning(status) ? false : 10_000;
    },
  })
}
