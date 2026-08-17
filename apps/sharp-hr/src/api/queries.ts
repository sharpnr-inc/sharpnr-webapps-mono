import { useQuery } from "@tanstack/react-query";
import { GetOrganizationEmployee } from "./service";

export function useOrgEmployees() {
  return useQuery({
    queryKey: ["ORGANIZATION", "LIST", "EMPLOYEES"],
    queryFn: GetOrganizationEmployee,
  });
}
