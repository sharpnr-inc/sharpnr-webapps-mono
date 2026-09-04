import { api } from "@sharpnr/http";
import type {
  CablesBootstrap,
  CablesConversation,
  CablesMessage,
  CablesMessagePage,
  CablesServiceResponseDto,
  ChannelResponseDto,
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

/* -------------------------------------------------------------------------- */
/*                              Cables workspace                              */
/* -------------------------------------------------------------------------- */

/**
 * The workspace API.
 *
 * Note there is no separate DM endpoint set: a channel and a direct message are
 * both conversations server-side, so one set of message routes serves both.
 */
export const CablesWorkspaceEndpoints = {
  bootstrap: () => `/cables/bootstrap`,
  conversations: () => `/cables/conversations`,
  openDirect: () => `/cables/conversations/direct`,
  messages: (conversationId: string) =>
    `/cables/conversations/${conversationId}/messages`,
  read: (conversationId: string) =>
    `/cables/conversations/${conversationId}/read`,
  channels: () => `/cables/channels`,
  joinChannel: (channelId: string) => `/cables/channels/${channelId}/join`,
};

/**
 * The client's first call. Returns identity, roster and sidebar together, and
 * reconciles the org roster server-side — an employee hired since the last
 * visit gets their cables identity here.
 */
export async function getCablesBootstrap() {
  const res = await api.get<APIResponse<CablesBootstrap>>(
    CablesWorkspaceEndpoints.bootstrap(),
  );
  return res.data;
}

export async function listCablesConversations() {
  const res = await api.get<APIResponse<CablesConversation[]>>(
    CablesWorkspaceEndpoints.conversations(),
  );
  return res.data;
}

/**
 * Reads one page of history, newest first.
 *
 * `before` is a seq cursor rather than a page number: history grows at the end
 * being read, so an offset would skip or repeat rows whenever someone posts
 * mid-scroll.
 */
export async function getCablesMessages(
  conversationId: string,
  before?: number,
) {
  const res = await api.get<APIResponse<CablesMessagePage>>(
    CablesWorkspaceEndpoints.messages(conversationId),
    { params: before ? { before } : undefined },
  );
  return res.data;
}

/**
 * Sends a message over HTTP — never up the socket, which only carries fan-out.
 *
 * `clientMessageId` is generated here, before the request, so a retry after a
 * dropped connection resolves to the row already written instead of posting
 * twice. It also lets the optimistic bubble be reconciled with the stored row
 * when the same message arrives back over the socket.
 */
export async function sendCablesMessage(
  conversationId: string,
  body: string,
  clientMessageId: string,
) {
  const res = await api.post<APIResponse<CablesMessage>>(
    CablesWorkspaceEndpoints.messages(conversationId),
    { body, clientMessageId },
  );
  return res.data;
}

/** Moves the read cursor, which is what clears the sidebar badge. */
export async function markCablesConversationRead(
  conversationId: string,
  seq: number,
) {
  const res = await api.post<APIResponse<null>>(
    CablesWorkspaceEndpoints.read(conversationId),
    { seq },
  );
  return res.data;
}

/** Gets or creates the DM with one other member. Safe to call repeatedly. */
export async function openCablesDirectConversation(memberId: string) {
  const res = await api.post<APIResponse<CablesConversation>>(
    CablesWorkspaceEndpoints.openDirect(),
    { memberId },
  );
  return res.data;
}

export async function listCablesChannels() {
  const res = await api.get<APIResponse<ChannelResponseDto[]>>(
    CablesWorkspaceEndpoints.channels(),
  );
  return res.data;
}

export async function createCablesChannel(input: {
  name: string;
  topic?: string;
  visibility?: "PUBLIC" | "PRIVATE";
}) {
  const res = await api.post<APIResponse<null>>(
    CablesWorkspaceEndpoints.channels(),
    input,
  );
  return res.data;
}

export async function joinCablesChannel(channelId: string) {
  const res = await api.post<APIResponse<CablesConversation>>(
    CablesWorkspaceEndpoints.joinChannel(channelId),
  );
  return res.data;
}
