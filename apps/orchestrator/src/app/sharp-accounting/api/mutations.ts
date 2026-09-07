import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startAccountingService } from "./service";
import { accountingAccountStatusQueryKey } from "./queries";

export function useStartAccountingService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startAccountingService"],
    mutationFn: startAccountingService,
    onSuccess: () => {
      // The gate in the accounting layout reads this query — refresh it so the
      // user drops straight into the feature once the service is live.
      queryClient.invalidateQueries({
        queryKey: accountingAccountStatusQueryKey,
      });
    },
  });
}
