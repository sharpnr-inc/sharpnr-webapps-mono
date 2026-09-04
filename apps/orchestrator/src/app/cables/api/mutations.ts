import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startCablesService } from "./service";
import { cablesAccountStatusQueryKey } from "./queries";

export function useStartCablesService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startCablesService"],
    mutationFn: startCablesService,
    onSuccess: () => {
      // The gate in the cables layout reads this query — refresh it so the
      // user drops straight into the feature once the service is live.
      queryClient.invalidateQueries({ queryKey: cablesAccountStatusQueryKey });
    },
  });
}
