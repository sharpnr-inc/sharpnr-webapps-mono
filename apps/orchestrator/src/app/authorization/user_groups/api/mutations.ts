import { useMutation } from "@tanstack/react-query";
import { createSentinelUserGroup } from "./service";

export function useCreateSentinelUserGroupMutation() {
  return useMutation({
    mutationFn: createSentinelUserGroup,
    mutationKey: ["SENTINEL", "ADD_USER_GROUP"],
  });
}
