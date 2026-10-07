import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SetupWizAddProperty,
  UpdateOrgName,
  UpdateSuperAdmin,
} from "./service";
import { setupProgressQueryKey } from "./queries";

// Saving a step moves the wizard on, so the progress the route guard reads is
// out of date the moment a save succeeds. The guard fetches with `fetchQuery`,
// which refetches an invalidated entry before deciding where to send the user.
function useInvalidateSetupProgress() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: setupProgressQueryKey });
}

export function useSetupWizSuperAdminUpdateMutation() {
  const invalidateProgress = useInvalidateSetupProgress();
  return useMutation({
    mutationKey: ["SETUP_WIZARD", "UPDATE_SUPER_ADMIN"],
    mutationFn: UpdateSuperAdmin,
    onSuccess: invalidateProgress,
  });
}

export function useSetupWizUpdateOrgNameMutation() {
  const invalidateProgress = useInvalidateSetupProgress();
  return useMutation({
    mutationKey: ["SETUP_WIZARD", "UPDATE_ORGANIZATION_NAME"],
    mutationFn: UpdateOrgName,
    onSuccess: invalidateProgress,
  });
}

export function useSetupWizOperationAddPropertyMutation() {
  const invalidateProgress = useInvalidateSetupProgress();
  return useMutation({
    mutationKey: ["SETUP_WIZARD", "CREATE_PROPERTY"],
    mutationFn: SetupWizAddProperty,
    onSuccess: invalidateProgress,
  });
}
