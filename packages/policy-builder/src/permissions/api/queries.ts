import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPermissionCatalog,
  getRolePermissions,
  saveRolePermissions,
} from "./service";
import type { RolePermissionsPayload } from "../types";

/**
 * The catalog is app vocabulary, not org data: it changes when a module ships,
 * never during a session. Long staleTime keeps the matrix instant when an admin
 * moves between roles.
 */
export function usePermissionCatalog() {
  return useQuery({
    queryKey: ["SENTINEL", "CATALOG"],
    queryFn: fetchPermissionCatalog,
    staleTime: 60 * 60 * 1000,
  });
}

export function useRolePermissions(roleID?: string) {
  return useQuery({
    queryKey: ["SENTINEL", "ROLE_PERMISSIONS", roleID],
    queryFn: () => getRolePermissions(roleID!),
    enabled: Boolean(roleID),
  });
}

export function useSaveRolePermissions(roleID?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RolePermissionsPayload) =>
      saveRolePermissions(roleID!, payload),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["SENTINEL", "ROLE_PERMISSIONS", roleID],
      });
    },
  });
}
