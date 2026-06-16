import {
  getAppByKey,
  getDefaultApp,
  isAllowedRedirect,
  type SharpnrApp,
} from "@/configs/app-registry";

/**
 * Post-authentication redirect handling.
 *
 * Apps bounce unauthenticated users here as:
 *   auth.sharpnr.com/?redirect_uri=https://orchestrator.sharpnr.com/foo
 *   auth.sharpnr.com/?app=orchestrator            (key-based, optional)
 *
 * After a successful login we send them back to where they came from — but only
 * if the destination is a registered Sharpnr app (see app-registry.ts). Anything
 * else falls back to the default workspace, so the auth domain can't be abused
 * as an open redirect.
 */

const REDIRECT_PARAM = "redirect_uri";
const APP_PARAM = "app";
const STORAGE_KEY = "sharpnr.auth.redirect";

interface RedirectParams {
  redirectUri?: string | null;
  app?: string | null;
}

function buildAppUrl(app: SharpnrApp): string {
  const base = app.url.replace(/\/+$/, "");
  const path = app.defaultPath ?? "/";
  if (path === "/" || path === "") return `${base}/`;
  return base + (path.startsWith("/") ? path : `/${path}`);
}

/**
 * Resolve an absolute, validated destination URL.
 *  1. A full `redirect_uri` is honored only when its origin is a registered app.
 *  2. Otherwise an `app` key (if provided & known) resolves to that app's URL.
 *  3. Otherwise the default workspace app.
 */
export function resolveRedirectTarget(params: RedirectParams = {}): string {
  const redirectUri = params.redirectUri?.trim();
  if (redirectUri && isAllowedRedirect(redirectUri)) {
    return redirectUri;
  }

  const appKey = params.app?.trim();
  if (appKey) {
    const app = getAppByKey(appKey);
    if (app) return buildAppUrl(app);
  }

  return buildAppUrl(getDefaultApp());
}

/** Read redirect params from a query string (current URL's by default). */
export function readRedirectParams(
  search: string = window.location.search,
): RedirectParams {
  const params = new URLSearchParams(search);
  return {
    redirectUri: params.get(REDIRECT_PARAM),
    app: params.get(APP_PARAM),
  };
}

/**
 * Persist a valid redirect target so it survives multi-step flows
 * (signup → OTP) and navigation between /login and /signup. No-op when the
 * incoming request carries no redirect intent.
 */
export function captureRedirectTarget(search?: string): void {
  const { redirectUri, app } = readRedirectParams(search);
  if (!redirectUri && !app) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, resolveRedirectTarget({ redirectUri, app }));
  } catch {
    /* sessionStorage may be unavailable (privacy mode); fall through */
  }
}

/** Resolve the destination: URL params first, then persisted value, then default. */
export function getPostAuthTarget(): string {
  const { redirectUri, app } = readRedirectParams();
  if (redirectUri || app) {
    return resolveRedirectTarget({ redirectUri, app });
  }
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored && isAllowedRedirect(stored)) return stored;
  } catch {
    /* ignore */
  }
  return resolveRedirectTarget();
}

export function clearRedirectTarget(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Send the user to their post-auth destination, replacing the history entry so
 * Back doesn't return to the login screen. Clears the persisted target first.
 */
export function redirectAfterAuth(): void {
  const target = getPostAuthTarget();
  clearRedirectTarget();
  window.location.replace(target);
}
