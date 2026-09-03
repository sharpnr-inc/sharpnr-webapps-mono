import { queryOptions, useQuery } from "@tanstack/react-query";
import { probeCurrentUser } from "./publicClient";
import {
  GetOrganizationSetUpProgress,
  GetOrganizationStatus,
  VerifySignupCookie,
  getCablesAccountStatus,
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
