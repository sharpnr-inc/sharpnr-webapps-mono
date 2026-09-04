import { api } from "@sharpnr/http";
import { SetupWizardRoutes, UserRoutes } from "./appuser.endpoints";
import type { APIResponse } from "@sharpnr/utils";
import type {
  UserAuthenticatedResponse,
  UserDataResponseDto,
  SetupProgressResponseDTO,
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

export async function logout() {
  const res = await api.get<APIResponse<unknown>>(UserRoutes.logout());
  return res.data;
}

/**
 * Onboarding progress for the signed-in user's organization.
 *
 * The wizard itself lives in the orchestrator app; Stockwave only reads the
 * progress so it can bounce a half-configured org back there.
 */
export async function GetOrganizationSetUpProgress() {
  const res = await api.get<APIResponse<SetupProgressResponseDTO>>(
    SetupWizardRoutes.getOrganizationSetUpProgress(),
  );
  return res.data;
}
