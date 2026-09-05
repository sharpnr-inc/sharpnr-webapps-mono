import { useQuery } from "@tanstack/react-query";
import { GetAllInventoriesOfLegalEntity } from "../api_calls";

export function useLegalEntityInventories(legalEntity?: string) {
  return useQuery({
    queryKey: ["Legal Entity", "Inventories", legalEntity],
    queryFn: () => GetAllInventoriesOfLegalEntity(legalEntity!),
    enabled: !!legalEntity,
  });
}
