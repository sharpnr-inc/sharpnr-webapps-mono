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
