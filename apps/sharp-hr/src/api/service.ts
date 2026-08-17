import { api } from "@sharpnr/http";
import { HrRoutes, UserRoutes } from "./endpoints";
import type { APIResponse } from "@/lib/api_response";
import type {
  OrgEmployeeList,
  UserAuthenticatedResponse,
  UserDataResponseDto,
} from "./types";

/**
 * Verifies whether the current user session is authenticated.
 *
 * Calls the identity service authentication verification endpoint.
 * This does NOT return full user profile data — only session validity
 * and identity references.
 *
 * Typically used in:
 * - TanStack Router loaders
 * - App bootstrap authentication checks
 * - Route guards
 * - Silent session validation flows
 *
 * @returns APIResponse<UserAuthenticatedResponse>
 */
export async function verifyUserAuthentication() {
  const res = await api.get<APIResponse<UserAuthenticatedResponse>>(
    UserRoutes.authenticateUser(),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetAuthenticatedUser() {
  const res = await api.get<APIResponse<UserDataResponseDto>>(
    UserRoutes.getUser(),
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function logout() {
  const res = await api.get<APIResponse<unknown>>(UserRoutes.logout());
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

/* -------------------------------------------------------------------------- */
/*                          HR Employeee Api service                          */
/* -------------------------------------------------------------------------- */

export async function GetOrganizationEmployee() {
  const res = await api.get<APIResponse<OrgEmployeeList[]>>(
    HrRoutes.FetchAllEmployees(),
  );
  return res.data;
}
