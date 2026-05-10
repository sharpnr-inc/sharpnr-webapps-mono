import { useMutation } from "@tanstack/react-query";
import { UpdateOrgName, UpdateSuperAdmin } from "./service";

export function useSetupWizSuperAdminUpdateMutation() {
  return useMutation({
    mutationKey: ["SETUP_WIZARD", "UPDATE_SUPER_ADMIN"],
    mutationFn: UpdateSuperAdmin,
  });
}

export function useSetupWizUpdateOrgNameMutation() {
  return useMutation({
    mutationKey: ["SETUP_WIZARD", "UPDATE_ORGANIZATION_NAME"],
    mutationFn: UpdateOrgName,
  });
}

export function useSetupWizOperationAddPropertyMutation() {}
