import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startHrmsService } from "./service";
import { hrmsAccountStatusQueryKey } from "./queries";

export function useStartHrmsService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["startHrmsService"],
    mutationFn: startHrmsService,
    onSuccess: () => {
      // The gate in the SharpHR layout reads this query — refresh it so the
      // user drops straight into the feature once the service is live.
      queryClient.invalidateQueries({ queryKey: hrmsAccountStatusQueryKey });
    },
  });
}
