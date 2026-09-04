import { useMutation } from "@tanstack/react-query";
import { addNewSuperAdmin } from "./service";

export function useAddNewSuperAdminMutation() {
  return useMutation({
    mutationFn: addNewSuperAdmin,
    mutationKey: ["addSuperAdminInOrg"],
  });
}
