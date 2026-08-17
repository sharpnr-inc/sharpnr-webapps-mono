import { useQuery } from "@tanstack/react-query";
import { GetAllOrgResources } from "./service";

export function useAllResourcesOfOrg() {
  return useQuery({
    queryKey: ["org_all_resources"],
    queryFn: GetAllOrgResources,
  });
}
