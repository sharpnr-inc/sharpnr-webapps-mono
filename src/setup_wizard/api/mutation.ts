import { useMutation } from "@tanstack/react-query";
import { UpdateSuperAdmin } from "./service";

export function useSetupWizSuperAdminUpdateMutation() {
  return useMutation({
    mutationKey: ["SETUP_WIZARD", "UPDATE_SUPER_ADMIN"],
    mutationFn: UpdateSuperAdmin,
  });
}

export function useSetupWizOperationAddPropertyMutation() {}
