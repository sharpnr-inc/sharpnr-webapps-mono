import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetOrganizationStatus } from "./api_service";
import { probeCurrentUser } from "./publicClient";

/* ---------------------------------- <***> --------------------------------- */

/* ---------------------------------- <***> --------------------------------- */

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

/**
 * Who is visiting the public pages, if anyone.
 *
 * Kept apart from the `_appuser` guard's `["user-details"]` query because it
 * runs through the non-redirecting client — a failure here means "signed out",
 * not "something broke", so it must not retry or bounce.
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
