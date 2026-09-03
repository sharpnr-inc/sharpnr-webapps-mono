import { queryOptions, useQuery } from "@tanstack/react-query";
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
