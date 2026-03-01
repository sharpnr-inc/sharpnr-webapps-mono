import { useQuery } from "@tanstack/react-query";
import { GetKitchenDetails } from "./api.service";

export function useKitchenDetails(kitchenID: string) {
  return useQuery({
    queryKey: ["Kitchen", "Kitchen-details"],
    queryFn: async () => await GetKitchenDetails(kitchenID),
  });
}
