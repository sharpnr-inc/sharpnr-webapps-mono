import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startStockwaveService } from "./service";
import { stockwaveAccountStatusQueryKey } from "./queries";

export function useStartStockwaveService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startStockwaveService"],
    mutationFn: startStockwaveService,
    onSuccess: () => {
      // The gate in the stockwave layout reads this query — refresh it so the
      // user drops straight into the feature once the service is live.
      queryClient.invalidateQueries({
        queryKey: stockwaveAccountStatusQueryKey,
      });
    },
  });
}
