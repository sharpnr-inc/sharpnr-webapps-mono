import { useQuery } from "@tanstack/react-query";
import { GetAllOrgRoles } from "./sevice";

export function useAllOrgRoles() {
  return useQuery({
    queryKey: ["OrgRoles"],
    queryFn: GetAllOrgRoles,
  });
}
