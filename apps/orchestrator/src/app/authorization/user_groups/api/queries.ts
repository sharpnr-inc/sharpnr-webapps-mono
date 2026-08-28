import { useQuery } from "@tanstack/react-query";
import { getUserGroupDetails, getUserGroupsOfOrganization } from "./service";

// This Hooks return the UserGroups in the Organization
export function useUserGroups() {
  return useQuery({
    queryKey: ["SENTINEL", "USER_GROUP"],
    queryFn: getUserGroupsOfOrganization,
  });
}
export function useSentinelGroupDetail(sentinelGroupID: string) {
  return useQuery({
    queryKey: ["SENTINEL", "USER_GROUP", sentinelGroupID],
    queryFn: () => getUserGroupDetails(sentinelGroupID),
  });
}
