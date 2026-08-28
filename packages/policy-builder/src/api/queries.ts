import { useQuery } from "@tanstack/react-query";
import { GetOrgPrincipals, GetOrgResources } from "./service";

export function useOrgPrincipal() {
  return useQuery({
    queryKey: ["SENTINEL", "PRINCIPALS"],
    queryFn: GetOrgPrincipals,
  });
}
export function useOrgResources() {
  return useQuery({
    queryKey: ["SENTINEL", "RESOURCES"],
    queryFn: GetOrgResources,
  });
}
