import { createApiClient } from "@sharpnr/http";
import { config } from "@sharpnr/env";
import type { APIResponse } from "@sharpnr/utils";
import { UserRoutes } from "./Endpoints";
import type { UserDataResponseDto } from "./types";

/**
 * A second client for the public marketing pages.
 *
 * The shared `api` bounces to the auth app on 401/403, which is right inside
 * the console but wrong on the landing page: there a 401 is simply the answer
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
