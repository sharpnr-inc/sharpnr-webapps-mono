import { createApiClient } from "@sharpnr/http";
import { appUserActions } from "@/store/AppUserStore";
import { config } from "@/configs/env";

export default createApiClient({
  baseUrl: config.apiBaseUrl,
  csrfCookieName: config.csrfToken,
  authAppUrl: config.authAppUrl,
  // Drop the cached user before leaving, so a re-login starts clean.
  onUnauthorized: () => appUserActions.clearUser(),
});
