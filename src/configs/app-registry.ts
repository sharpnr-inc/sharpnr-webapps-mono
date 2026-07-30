import { config } from "./env";

/**
 * Registry of first-party Sharpnr apps that this auth service signs users into.
 *
 * It serves two purposes:
 *   1. Metadata source for each app (key, display name, base url, landing path).
 *   2. A security allowlist — only origins registered here are valid
 *      post-authentication redirect targets, which prevents open-redirect abuse
 *      (e.g. `auth.sharpnr.com?redirect_uri=https://evil.com`).
 *
 * ── Adding a new app ──────────────────────────────────────────────────────────
 *   • At build time: add an entry to `baseApps` below (and its env var in env.ts).
 *   • At runtime:    call `registerApp({ key, name, url })` from anywhere.
 */
export interface SharpnrApp {
  /** Stable identifier, also usable as the `?app=` redirect key. */
  key: string;
  /** Human-readable name. */
  name: string;
  /** Base origin/URL of the app (sourced from validated env config). */
  url: string;
  /** Path to land on when no explicit path is supplied. Defaults to "/". */
  defaultPath?: string;
}

/** Base registry, derived from validated env config. */
const baseApps: SharpnrApp[] = [
  { key: "iam", name: "Workspace", url: config.iamAppUrl, defaultPath: "/" },
  { key: "orchestrator", name: "Orchestrator", url: config.orchestratorAppUrl },
  { key: "accounting", name: "Accounting", url: config.accountingAppUrl },
  { key: "hospitality", name: "Hospitality", url: config.hospitalityAppUrl },
  { key: "sharpcrm", name: "SharpCRM", url: config.sharpcrmAppUrl },
  { key: "hr", name: "HR", url: config.hrAppUrl },
  { key: "cables", name: "Cables", url: config.cablesAppUrl },
  { key: "silo", name: "Silo", url: config.siloAppUrl },
  { key: "folio", name: "Folio", url: config.folioAppUrl },
  { key: "marketplace", name: "Marketplace", url: config.marketplaceAppUrl },
  { key: "cortex", name: "Cortex", url: config.cortexAppUrl },
];

/** The app users land on when no valid redirect target is supplied. */
export const DEFAULT_APP_KEY = "iam";

/** Mutable registry keyed by app key — supports runtime extension/override. */
const registry = new Map<string, SharpnrApp>();

function normalizeOrigin(url?: string): string | null {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/**
 * Register (or override) an app. Entries with a missing/invalid URL are skipped
 * so the allowlist never contains an unusable origin.
 */
export function registerApp(app: SharpnrApp): void {
  if (!normalizeOrigin(app.url)) return;
  registry.set(app.key, app);
}

// Seed the registry. Apps whose env URL is unset are silently skipped.
baseApps.forEach(registerApp);

export function listApps(): SharpnrApp[] {
  return [...registry.values()];
}

export function getAppByKey(key: string): SharpnrApp | undefined {
  return registry.get(key);
}

/** The default landing app (the workspace), used as the ultimate fallback. */
export function getDefaultApp(): SharpnrApp {
  const app = getAppByKey(DEFAULT_APP_KEY) ?? listApps()[0];
  if (!app) {
    throw new Error("App registry is empty — no default redirect target.");
  }
  return app;
}

/** Find a registered app whose origin matches the given URL's origin. */
export function getAppByOrigin(url: string): SharpnrApp | undefined {
  const origin = normalizeOrigin(url);
  if (!origin) return undefined;
  return listApps().find((app) => normalizeOrigin(app.url) === origin);
}

/** Whether a URL points at a known, registered Sharpnr app origin. */
export function isAllowedRedirect(url: string): boolean {
  return Boolean(getAppByOrigin(url));
}
