import { createApiClient } from "@sharpnr/http";
import { config } from "@/configs/env";

/**
 * The CSRF and 401/403 interceptors are attached inside `createApiClient`, so
 * importing this client is all that is required -- there are no separate
 * `interceptor.ts` / `unauthorized.ts` modules to side-effect-import any more.
 */
export default createApiClient({
  baseUrl: config.apiBaseUrl,
  csrfCookieName: config.csrfToken,
  authAppUrl: config.authAppUrl,
});
