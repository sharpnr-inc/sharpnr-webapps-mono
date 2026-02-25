import { useQuery } from "@tanstack/react-query";
import { GetKitchenKOT } from "./api.service";

export function useKitchenKOTs(kitchenID: string) {
  return useQuery({
    queryKey: ["Kitchen", "KOT"],
    queryFn: () => GetKitchenKOT(kitchenID),
  });
}
