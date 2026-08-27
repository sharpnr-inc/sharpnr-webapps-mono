import { useQuery } from "@tanstack/react-query";
import { getUserGroupsOfOrganization } from "./service";

// This Hooks return the UserGroups in the Organization
export function useUserGroups() {
  return useQuery({
    queryKey: ["SENTINEL", "USER_GROUP"],
    queryFn: getUserGroupsOfOrganization,
  });
}
