import { queryOptions, useQuery } from "@tanstack/react-query";
import { createApiClient } from "@sharpnr/http";
import { config } from "@sharpnr/env";
import type { APIResponse } from "@sharpnr/utils";
import { UserRoutes } from "./endpoints";
import type { UserDataResponseDto } from "./types";

/**
 * A second client for the public marketing pages.
 *
 * The shared `api` bounces to the auth app on 401/403, which is right inside
 * the product but wrong on the landing page: there a 401 is simply the answer
 * for a signed-out visitor, and redirecting on it would throw every anonymous
 * visitor off the marketing site. This client never redirects, so the caller
 * decides what a 401 means.
 */
const publicApi = createApiClient({
  baseUrl: config.apiBaseUrl,
  csrfCookieName: config.csrfToken,
  redirectStatuses: [],
});

/**
 * Asks who the visitor is, tolerating "nobody".
 *
 * Rejects on 401 for a signed-out visitor — callers should treat any failure
 * as "not signed in" rather than as an error worth showing.
 */
export async function probeCurrentUser() {
  const res = await publicApi.get<APIResponse<UserDataResponseDto>>(
    UserRoutes.getUser(),
  );
  return res.data;
}

/**
 * Who is visiting the public pages, if anyone.
 *
 * Kept apart from the route guard's user query because it runs through the
 * non-redirecting client above — a failure here means "signed out", not
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
