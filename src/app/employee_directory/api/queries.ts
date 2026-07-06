import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "./service";

export function useEmployees() {
  return useQuery({
    queryKey: ["all_org_employees"],
    queryFn: fetchEmployees,
  });
}
