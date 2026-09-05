import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startSiloService } from "./service";
import { siloAccountStatusQueryKey } from "./queries";

export function useStartSiloService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startSiloService"],
    mutationFn: startSiloService,
    onSuccess: () => {
      // The gate in the Silo layout reads this query — refresh it so the user
      // drops straight into the feature once the service is live.
      queryClient.invalidateQueries({ queryKey: siloAccountStatusQueryKey });
    },
  });
}
