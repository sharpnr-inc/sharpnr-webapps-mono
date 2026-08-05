import { useQuery } from "@tanstack/react-query";
import { GetAllOrgKitchen, GetKitchenKOT } from "./api.service";

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
