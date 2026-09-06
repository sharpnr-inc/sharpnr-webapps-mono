import { queryOptions, useQuery } from "@tanstack/react-query";
import { createApiClient } from "@sharpnr/http";
import { config } from "@sharpnr/env";
import type { APIResponse } from "@sharpnr/utils";

/**
 * Identity route. Spelled out here rather than imported because
 * sharp-healthcare has no api layer of its own yet -- the app is still in
 * development, and the public site is the only thing that needs to ask who a
 * visitor is. Move this to a shared endpoints file once the app grows one.
 */
const GET_USER = "/identity/web/user";

export type UserDataResponseDto = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  role: string;
};

/**
 * A client for the public marketing page.
 *
 * Never redirects: on the landing page a 401 is simply the answer for a
 * signed-out visitor, and bouncing on it would throw every anonymous visitor
 * off the site.
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
  const res = await publicApi.get<APIResponse<UserDataResponseDto>>(GET_USER);
  return res.data;
}

export const publicCurrentUserQuery = queryOptions({
  queryKey: ["public", "current-user"],
  queryFn: probeCurrentUser,
  retry: false,
  staleTime: 1000 * 60 * 5,
});

export function usePublicCurrentUser() {
  return useQuery(publicCurrentUserQuery);
}
