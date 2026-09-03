import { api } from "@sharpnr/http";
import type {
  CablesServiceResponseDto,
  SetupProgressResponseDTO,
  UserAuthenticatedResponse,
  UserDataResponseDto,
} from "./types";
import type { APIResponse } from "@sharpnr/utils";

export const AuthApiEndpoints = {
  Signup: {
    initializeOnboarding: "/signup/initiate",
    verifyOtp: "/signup/verify-otp",
    checkToken: "signup/verify-token",
    resendEmail: "",
  },

  Auth: {
    login: "identity/web/login",
    logout: "identity/web/logout",
    ForgetPassword: "",
    fetchIdentity: "",
  },
};

export const OrgCoreEndpoints = {
  Customer: {
    CreateCustomer: () => `orchestrator/org/customers/add`,
    Search: (searchQuery: string) =>
      `orchestrator/org/customers/search?searchQuery=${searchQuery}`,
  },
};

/**
 * Identity Service – Web User Endpoints
 *
 * Centralized route helpers for authentication-related
 * user APIs used by the Sharpnr web clients.
 *
 * These helpers ensure consistent endpoint usage across
 * the application and make refactoring easier if paths change.
 */
export const UserRoutes = {
  /**
   * Returns the endpoint for fetching the authenticated user's profile.
   *
   * ⚠️ Requires:
   * - Active authenticated session (cookie / token)
   *
   * ✅ Typical usage:
   * Used after login verification or inside protected routes
   * to retrieve the current user's identity details.
   *
   * @returns {string} Endpoint URL for retrieving the current user's profile
   *
   * Example:
   * fetch(UserRoutes.getUser())
   */
  getUser: (): string => `/identity/web/user`,

  /**
   * Returns the endpoint for verifying whether the user
   * is currently authenticated.
   *
   * ⚠️ Does NOT return full profile data
   * ✔️ Only confirms session validity
   *
   * ✅ Typical usage:
   * - Route guards
   * - App bootstrap auth check
   * - Silent session validation
   * - TanStack Router loader authentication verification
   *
   * @returns {string} Endpoint URL for authentication verification
   *
   * Example:
   * fetch(UserRoutes.authenticateUser())
   */
  authenticateUser: (): string => `/identity/web/verify-auth`,
  logout: () => `/identity/web/logout`,
};

export const OrchestratorConsole = {
  status: "/orchestrator/org-status",
};

export async function VerifySignupCookie() {
  const res = await api.get(AuthApiEndpoints.Signup.checkToken);
  return res.data;
}

export async function AddCustomerInOrg() {
  const res = await api.post(OrgCoreEndpoints.Customer.CreateCustomer());
  return res.data;
}

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
  const res = await api.get<APIResponse<null>>(UserRoutes.logout());
  return res.data;
}

export async function GetOrganizationStatus() {
  const res = await api.get(OrchestratorConsole.status);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export const SetupWizardAPIEndpoints = {
  GetOrganizationSetUpProgress: "/orchestrator/setup-wiz/progress",
};

export const CablesEndpoints = {
  getCablesAccountStatus: () => `/orchestrator/cables`,
};

/**
 * Reads how far the organisation has got through the setup wizard.
 *
 * Cables is only usable once the org is fully set up in the orchestrator, so
 * the `_user` route guard sends unfinished orgs back there.
 */
export async function GetOrganizationSetUpProgress() {
  const res = await api.get<APIResponse<SetupProgressResponseDTO>>(
    SetupWizardAPIEndpoints.GetOrganizationSetUpProgress,
  );
  return res.data;
}

/**
 * Reads whether the org has started Cables and whether it is currently active.
 * Starting the service happens in the orchestrator, not here.
 */
export async function getCablesAccountStatus() {
  const res = await api.get<APIResponse<CablesServiceResponseDto>>(
    CablesEndpoints.getCablesAccountStatus(),
  );
  return res.data;
}
