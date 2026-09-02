import { useQuery } from "@tanstack/react-query";
import { getCostCenters } from "./service";

export function useOrgCostCenters() {
  return useQuery({
    queryKey: ["orgCostCenters"],
    queryFn: getCostCenters,
  });
}
