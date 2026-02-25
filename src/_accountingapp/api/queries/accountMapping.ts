import { useQuery } from "@tanstack/react-query";
import { GetAccountMappingOfOrgs } from "../api_calls";

export function useAccountMapping() {
  return useQuery({
    queryKey: ["Accounting", "Mapping", "fetch"],
    queryFn: GetAccountMappingOfOrgs,
  });
}
