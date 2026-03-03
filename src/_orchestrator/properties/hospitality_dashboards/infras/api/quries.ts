import { useQuery } from "@tanstack/react-query";
import { GetKitchenConfiguration, GetKitchenDetails } from "./api.service";

export function useKitchenDetails(kitchenID: string) {
  return useQuery({
    queryKey: ["Kitchen", "Kitchen-details"],
    queryFn: async () => await GetKitchenDetails(kitchenID!),
    enabled: !!kitchenID,
  });
}

export function useKitchenConfiguration(kitchenID: string) {
  return useQuery({
    queryKey: ["Kitchen", "Kitchen-configuration"],
    queryFn: async () => await GetKitchenConfiguration(kitchenID),
  });
}
