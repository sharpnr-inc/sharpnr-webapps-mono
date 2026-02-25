import { GetLegalEntities } from "@/_orchestrator/api/api.service";
import { useQuery } from "@tanstack/react-query";

export function useOrganizationLegalEntities() {
  return useQuery({
    queryKey: ["legal-entities"],
    queryFn: GetLegalEntities,
  });
}
