import { useMutation } from "@tanstack/react-query";
import { createSentinelRoleInOrg } from "./sevice";

export function useCreateSentinelRoleMutation() {
  return useMutation({
    mutationFn: createSentinelRoleInOrg,
    mutationKey: ["SENTINEL", "ADD_NEW_ROLE"],
  });
}
