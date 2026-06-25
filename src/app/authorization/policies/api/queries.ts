import { useQuery } from "@tanstack/react-query";
import { GetAllOrgPolcies } from "./sevice";

export function useAllOrgPolicies() {
  return useQuery({
    queryKey: ["Policies"],
    queryFn: GetAllOrgPolcies,
  });
}
