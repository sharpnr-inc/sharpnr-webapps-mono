import { useQuery } from "@tanstack/react-query";
import { listAllOrgDepartments } from "./service";

export function useOrgDepartments() {
  return useQuery({
    queryKey: ["orgDepartments"],
    queryFn: listAllOrgDepartments,
  });
}
