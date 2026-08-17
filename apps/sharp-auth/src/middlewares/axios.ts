import { createApiClient } from "@sharpnr/http";
import { config } from "@/configs/env";

export default createApiClient({
  baseUrl: config.apiBaseUrl,
  csrfCookieName: config.csrfToken,
  // This *is* the auth app -- fall back to its own root rather than bouncing
  // to itself, and treat only 401 as unauthenticated.
  redirect: "home",
  redirectStatuses: [401],
});
