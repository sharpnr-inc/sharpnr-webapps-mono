import { useQuery } from "@tanstack/react-query";
import { getOrgDepartmentById, listAllOrgDepartments } from "./service";

export function useOrgDepartments() {
  return useQuery({
    queryKey: ["orgDepartments"],
    queryFn: listAllOrgDepartments,
  });
}
export function useOrgDepartmentById(departmentId: string) {
  return useQuery({
    queryKey: ["orgDepartmentById", departmentId],
    queryFn: () => getOrgDepartmentById(departmentId),
  });
}
