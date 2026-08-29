import { api } from "@sharpnr/http";
import type { APIResponse } from "@sharpnr/utils";
import type {
  PermissionCatalog,
  ResourceDescriptor,
  RolePermissionsPayload,
  RolePermissionsView,
} from "../types";

const routes = {
  resources: () => `/orchestrator/sentinel/resources`,
  resourceDetails: (type: string) =>
    `/orchestrator/sentinel/resources/${encodeURIComponent(type)}`,
  rolePermissions: (roleID: string) =>
    `/orchestrator/sentinel/roles/${roleID}/permissions`,
};

/** Shape of GET /resources — summaries only, no actions. */
interface ResourceSummary {
  type: string;
  label: string;
  description?: string;
  category?: string;
}

/** Shape of GET /resources/:type — the descriptor plus instances. */
interface ResourceDetails extends ResourceSummary {
  actions?: ResourceDescriptor["actions"];
  /**
   * hasInstances distinguishes "this type has no selectable instances" from
   * "instances exist but this org has none" — both arrive as an empty array,
   * and only the first should hide the scope control entirely.
   */
  hasInstances?: boolean;
  instances?: ResourceDescriptor["instances"];
}

/**
 * Builds the catalog the matrix renders.
 *
 * Two round trips because the aggregator has no single catalog endpoint: the
 * list returns summaries WITHOUT actions, and actions only arrive from the
 * per-type details call. The fan-out is parallel and the result is cached by
 * react-query, so it is fine at today's handful of resource types — but the
 * right fix is one `GET /orchestrator/sentinel/catalog` that returns every
 * descriptor with its actions in a single response. That endpoint is ~10 lines
 * on top of the existing `ListResources`, and it removes the N+1 entirely.
 */
export async function fetchPermissionCatalog(): Promise<PermissionCatalog> {
  const listed = await api.get<APIResponse<ResourceSummary[]>>(routes.resources());
  const summaries = listed.data?.data ?? [];

  const details = await Promise.all(
    summaries.map((s) =>
      api.get<APIResponse<ResourceDetails>>(routes.resourceDetails(s.type)),
    ),
  );

  return details.map((res, i) => {
    const d = res.data?.data;
    const summary = summaries[i]!;
    return {
      type: d?.type ?? summary.type,
      label: d?.label ?? summary.label,
      description: d?.description ?? summary.description,
      category: d?.category ?? summary.category,
      actions: d?.actions ?? [],
      instances: d?.hasInstances === false ? undefined : (d?.instances ?? undefined),
    };
  });
}

/* -------------------------------------------------------------------------- */
/*                            Role permissions                                */
/* -------------------------------------------------------------------------- */

/**
 * NOTE: these two endpoints do not exist on the backend yet — they are the
 * other half of the proposal. `PermissionMatrix` works without them (pass
 * `initialActions` and handle `onSave` yourself), so the UI can be reviewed
 * before the server side is written.
 *
 * Server side, both are small. Read returns the stored `policyJson` for the
 * role's single generated policy. Write validates every id against the
 * aggregator catalog, regenerates the Cedar text, updates the row, and calls
 * InvalidateOrganization. Validating against the catalog is also the fix for
 * the escalation hole — the API becomes physically unable to express a grant
 * that isn't a registered action.
 */
export async function getRolePermissions(
  roleID: string,
): Promise<RolePermissionsView> {
  const res = await api.get<APIResponse<RolePermissionsView>>(
    routes.rolePermissions(roleID),
  );
  return res.data?.data ?? { actions: [], rules: {} };
}

export async function saveRolePermissions(
  roleID: string,
  payload: RolePermissionsPayload,
): Promise<void> {
  await api.put(routes.rolePermissions(roleID), payload);
}
