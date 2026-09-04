import { queryOptions, useQuery } from "@tanstack/react-query";
import { probeCurrentUser } from "./publicClient";
import {
  GetOrganizationSetUpProgress,
  GetOrganizationStatus,
  VerifySignupCookie,
  getCablesAccountStatus,
  getCablesBootstrap,
  getCablesMessages,
} from "./service";

export function useVerifySignupCookies() {
  return useQuery({
    queryKey: ["Auth", "Verify-Cookie-session"],
    queryFn: VerifySignupCookie,
  });
}

export const organizationStatusQuery = queryOptions({
  queryKey: ["Org", "status"],
  queryFn: GetOrganizationStatus,
});

export function useOrganizationStatus() {
  return useQuery({
    queryKey: ["Org", "status"],
    queryFn: GetOrganizationStatus,
  });
}

/* ---------------------------------- <***> --------------------------------- */

export const cablesAccountStatusQueryKey = [
  "cables",
  "account-status",
] as const;

/** Shared so the `_user` guard and the hook read the exact same cache entry. */
export const cablesAccountStatusQuery = queryOptions({
  queryKey: cablesAccountStatusQueryKey,
  queryFn: getCablesAccountStatus,
});

export function useCablesAccountStatus() {
  return useQuery(cablesAccountStatusQuery);
}

/* ---------------------------------- <***> --------------------------------- */

export const setupProgressQuery = queryOptions({
  queryKey: ["setup-progress"],
  queryFn: GetOrganizationSetUpProgress,
});

export function useOrganizationSetupProgress() {
  return useQuery(setupProgressQuery);
}

/* ---------------------------------- <***> --------------------------------- */

/**
 * Who is visiting the public pages, if anyone.
 *
 * Kept apart from the `_user` guard's `["user-details"]` query because it runs
 * through the non-redirecting client — a failure here means "signed out", not
 * "something broke", so it must not retry or bounce.
 */
export const publicCurrentUserQuery = queryOptions({
  queryKey: ["public", "current-user"],
  queryFn: probeCurrentUser,
  retry: false,
  staleTime: 1000 * 60 * 5,
});

export function usePublicCurrentUser() {
  return useQuery(publicCurrentUserQuery);
}

/* -------------------------------------------------------------------------- */
/*                              Cables workspace                              */
/* -------------------------------------------------------------------------- */

export const cablesBootstrapQueryKey = ["cables", "bootstrap"] as const;

/**
 * The workspace shell. One request for identity, roster and sidebar.
 *
 * `staleTime: 0` because the sidebar carries unread counts, which the socket
 * invalidates constantly — anything longer would leave stale badges on screen.
 */
export const cablesBootstrapQuery = queryOptions({
  queryKey: cablesBootstrapQueryKey,
  queryFn: getCablesBootstrap,
  staleTime: 0,
});

export function useCablesBootstrap() {
  return useQuery(cablesBootstrapQuery);
}

export const cablesMessagesQueryKey = (conversationId: string) =>
  ["cables", "messages", conversationId] as const;

/**
 * The newest page of a conversation.
 *
 * Only the first page is a query — older pages are fetched imperatively when
 * the user scrolls up, and appended, because the socket also writes into this
 * cache and an infinite-query page structure would fight it.
 */
export function useCablesMessages(conversationId: string | null) {
  return useQuery({
    queryKey: cablesMessagesQueryKey(conversationId ?? "none"),
    queryFn: () => getCablesMessages(conversationId as string),
    enabled: !!conversationId,
    staleTime: 0,
  });
}
