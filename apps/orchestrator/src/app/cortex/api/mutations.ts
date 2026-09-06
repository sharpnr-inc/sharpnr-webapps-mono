import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startCortexService } from "./service";
import { cortexAccountStatusQueryKey } from "./queries";

export function useStartCortexService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startCortexService"],
    mutationFn: startCortexService,
    onSuccess: () => {
      // The gate in the Cortex layout reads this query — refresh it so the
      // user drops straight into the feature once the service is live.
      queryClient.invalidateQueries({ queryKey: cortexAccountStatusQueryKey });
    },
  });
}
