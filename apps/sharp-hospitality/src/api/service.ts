import api from "@/middlewares/axios";
import { UserRoutes } from "./endpoints";
import type { APIResponse } from "@/lib/api_response";
import type { UserDataResponseDto } from "./types";

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
  const res = await api.get<APIResponse<null>>(UserRoutes.authenticateUser());
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetAuthenticatedUser() {
  const res = await api.get<APIResponse<UserDataResponseDto>>(
    UserRoutes.getUser(),
  );
  return res.data;
}

export async function logout() {
  const res = await api.get<APIResponse<any>>(UserRoutes.logout());
  return res.data;
}
