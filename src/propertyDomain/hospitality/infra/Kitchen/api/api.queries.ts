import { useQuery } from "@tanstack/react-query";
import {
  GetAllOrgKitchen,
  GetKitchenConfiguration,
  GetKitchenDetails,
  GetKitchenKOT,
} from "./api.service";

export function useKitchenKOTs(kitchenID: string) {
  return useQuery({
    queryKey: ["Kitchen", "KOT"],
    queryFn: () => GetKitchenKOT(kitchenID),
  });
}

export function useAllKitchens() {
  return useQuery({
    queryKey: [""],
    queryFn: GetAllOrgKitchen,
  });
}

export function useKitchenDetails(kitchenID: string) {
  return useQuery({
    queryKey: ["Kitchen", "Kitchen-details", kitchenID],
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
