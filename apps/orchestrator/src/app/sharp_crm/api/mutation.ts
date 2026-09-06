import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startSharpCrmService } from "./service";
import { sharpCrmAccountStatusQueryKey } from "./queries";

export function useStartSharpCrmService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startSharpCrmService"],
    mutationFn: startSharpCrmService,
    onSuccess: () => {
      // The gate in the SharpCRM layout reads this query — refresh it so the
      // user drops straight into the feature once the service is live.
      queryClient.invalidateQueries({
        queryKey: sharpCrmAccountStatusQueryKey,
      });
    },
  });
}
