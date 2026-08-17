import axios, { type AxiosInstance } from "axios";
import { config } from "@sharpnr/env";
import { getCookie } from "@sharpnr/utils";

/**
 * @file @sharpnr/http
 * @description The suite's shared axios client: CSRF on writes, redirect-to-auth
 * on 401/403.
 *
 * Every app used to carry three files -- `middlewares/axios.ts`,
 * `middlewares/interceptor.ts` and `middlewares/unauthorized.ts` -- copied and
 * then drifted. The interceptors only ever ran if `main.tsx` remembered to
 * side-effect-import them, and three apps had silently forgotten to.
 *
 * Here the interceptors are attached when the client is created, so importing
 * the client is all it takes: there is no separate wiring step left to forget.
 *
 * ─── HOW TO USE ───────────────────────────────────────────────────────────────
 * Most apps import the ready-made client and keep no local file at all:
 *
 *   import { api } from "@sharpnr/http";
 *
 * Apps whose behaviour genuinely differs build their own with
 * `createApiClient` -- see the note on `api` at the bottom of this file.
 */

const CSRF_HEADER_NAME = "X-CSRF-Token";

/** Methods that do not mutate state, so they carry no CSRF header. */
const SAFE_HTTP_METHODS = ["GET", "HEAD", "OPTIONS"];

export interface ApiClientOptions {
  /** Backend base URL, i.e. `config.apiBaseUrl`. */
  baseUrl: string;

  /** Name of the CSRF cookie to copy into the request header. */
  csrfCookieName: string;

  /**
   * Where to send an unauthenticated user. Required for `redirect: "auth-app"`
   * (the default) and ignored for `redirect: "home"`.
   *
   * The current URL is passed along as `?redirect_uri=`, which sharp-auth
   * honours only for registered app origins.
   */
  authAppUrl?: string;

  /**
   * `"auth-app"` bounces to the auth app -- correct for every app except
   * sharp-auth itself, which uses `"home"` to fall back to its own root.
   */
  redirect?: "auth-app" | "home";

  /** Statuses that trigger the redirect. Defaults to 401 and 403. */
  redirectStatuses?: number[];

  /**
   * Requests whose URL contains this string never trigger a redirect: the
   * auth probe is *expected* to 401 for a signed-out user, and bouncing on it
   * produces a redirect loop.
   */
  authCheckPath?: string;

  /** Runs once before redirecting, e.g. to clear a user store. */
  onUnauthorized?: (status: number) => void;

  /** Merged into the default `Content-Type: application/json`. */
  headers?: Record<string, string>;
}

/**
 * Creates an axios instance with the suite's CSRF and 401/403 interceptors
 * already attached.
 */
export function createApiClient(options: ApiClientOptions): AxiosInstance {
  const {
    baseUrl,
    csrfCookieName,
    authAppUrl,
    redirect = "auth-app",
    redirectStatuses = [401, 403],
    authCheckPath = "verify-authentication",
    onUnauthorized,
    headers,
  } = options;

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  // ── Request: attach CSRF token to state-changing requests ────────────────
  api.interceptors.request.use(
    (requestConfig) => {
      const method = requestConfig.method?.toUpperCase() ?? "GET";
      if (SAFE_HTTP_METHODS.includes(method)) return requestConfig;

      const csrfToken = getCookie(csrfCookieName);
      if (!csrfToken) {
        // Deliberately does not log the token itself.
        console.warn("CSRF token cookie not found");
        return requestConfig;
      }

      requestConfig.headers = requestConfig.headers ?? {};
      // Never clobber a token a caller set explicitly.
      if (!requestConfig.headers[CSRF_HEADER_NAME]) {
        requestConfig.headers[CSRF_HEADER_NAME] = csrfToken;
      }

      return requestConfig;
    },
    (error) => Promise.reject(error),
  );

  // ── Response: bounce to auth on 401/403 ──────────────────────────────────
  // Guard so multiple in-flight failures don't each fire a navigation.
  let redirecting = false;

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status: number | undefined = error.response?.status;
      const url: string | undefined = error.config?.url;

      const isAuthCheck = Boolean(authCheckPath && url?.includes(authCheckPath));
      const shouldRedirect =
        status !== undefined &&
        redirectStatuses.includes(status) &&
        !isAuthCheck &&
        !redirecting &&
        typeof window !== "undefined";

      if (shouldRedirect) {
        redirecting = true;
        onUnauthorized?.(status);

        if (redirect === "home") {
          // The auth app itself: fall back to its own root, and only if we are
          // not already there -- otherwise this is a no-op and the guard is
          // released so a later failure can still act.
          if (window.location.pathname !== "/") {
            window.location.href = "/";
          } else {
            redirecting = false;
          }
        } else if (authAppUrl) {
          // Full URL so deep links and query params survive the round trip.
          const returnTo = encodeURIComponent(window.location.href);
          // Full browser navigation + replace, so Back doesn't loop here.
          window.location.replace(`${authAppUrl}/?redirect_uri=${returnTo}`);
        } else {
          redirecting = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}

/**
 * The suite's standard client: CSRF on writes, bounce to the auth app on
 * 401/403. Import this directly -- most apps need nothing else:
 *
 *   import { api } from "@sharpnr/http";
 *
 * Two apps legitimately differ and build their own with `createApiClient`:
 * sharp-auth (it *is* the auth app, so it has nowhere external to bounce to)
 * and sharp-hospitality (it clears its user store on the way out).
 */
export const api = createApiClient({
  baseUrl: config.apiBaseUrl,
  csrfCookieName: config.csrfToken,
  authAppUrl: config.authAppUrl,
});
