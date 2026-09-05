import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startFolioService } from "./service";
import { folioAccountStatusQueryKey } from "./queries";

export function useStartFolioService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startFolioService"],
    mutationFn: startFolioService,
    onSuccess: () => {
      // The gate in the Folio layout reads this query — refresh it so the user
      // drops straight into the feature once the service is live.
      queryClient.invalidateQueries({ queryKey: folioAccountStatusQueryKey });
    },
  });
}
