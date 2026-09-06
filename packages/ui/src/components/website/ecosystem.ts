import { config } from "@sharpnr/env";

/**
 * The one place a marketing site learns about its siblings.
 *
 * Every public site renders the same footer and the same "works with" section,
 * so the app list, the display names and the URLs are declared once here rather
 * than re-typed on thirteen landing pages. URLs always come from `@sharpnr/env`
 * -- a hardcoded sharpnr URL anywhere in a website directory is a bug.
 *
 * This is deliberately separate from `launcher.config.tsx`: the launcher lists
 * the apps a signed-in user can jump into and needs icons, while this list is
 * read by anonymous visitors and needs prose. They happen to cover almost the
 * same apps today, but they answer different questions.
 */

/** Stable ids, used by sites to name themselves and their siblings. */
export type EcosystemAppId =
  | "cables"
  | "silo"
  | "folio"
  | "cortex"
  | "orchestrator"
  | "stockwave"
  | "accounting"
  | "marketplace"
  | "sharpcrm"
  | "iam"
  | "hr"
  | "hospitality"
  | "healthcare";

/**
 * Footer grouping. Four buckets keep the ecosystem legible at a glance --
 * a flat list of thirteen apps reads as noise.
 */
export type EcosystemGroupId = "platform" | "business" | "people" | "operations";

export type EcosystemApp = {
  id: EcosystemAppId;
  /** How the app is written in prose. Match this exactly in copy. */
  name: string;
  /** Four or five words on what it is, shown beside the footer link. */
  role: string;
  /** Always from `@sharpnr/env`, never a literal. */
  href: string;
  group: EcosystemGroupId;
};

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: "cables",
    name: "Cables",
    role: "Conversation, in every app",
    href: config.cablesAppUrl,
    group: "platform",
  },
  {
    id: "silo",
    name: "Silo",
    role: "Files, objects, databases, lakes",
    href: config.siloAppUrl,
    group: "platform",
  },
  {
    id: "folio",
    name: "Folio",
    role: "Documents, sheets, canvases",
    href: config.folioAppUrl,
    group: "platform",
  },
  {
    id: "cortex",
    name: "Cortex",
    role: "IT console for devices and data",
    href: config.cortexAppUrl,
    group: "platform",
  },
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "Owner-level control of everything",
    href: config.orchestratorAppUrl,
    group: "platform",
  },
  {
    id: "stockwave",
    name: "Stockwave",
    role: "Inventory and warehouses",
    href: config.stockwaveAppUrl,
    group: "business",
  },
  {
    id: "accounting",
    name: "sharp-accounting",
    role: "Multi-entity double-entry books",
    href: config.accountingAppUrl,
    group: "business",
  },
  {
    id: "marketplace",
    name: "sharp-marketplace",
    role: "Buying and selling between orgs",
    href: config.marketplaceAppUrl,
    group: "business",
  },
  {
    id: "sharpcrm",
    name: "sharp-crm",
    role: "Customers and loyalty",
    href: config.sharpcrmAppUrl,
    group: "business",
  },
  {
    id: "iam",
    name: "sharp-iam",
    role: "The employee's portal",
    href: config.iamAppUrl,
    group: "people",
  },
  {
    id: "hr",
    name: "sharp-hr",
    role: "The HR team's application",
    href: config.hrAppUrl,
    group: "people",
  },
  {
    id: "hospitality",
    name: "sharp-hospitality",
    role: "Hotels, restaurants and bars",
    href: config.hospitalityAppUrl,
    group: "operations",
  },
  {
    id: "healthcare",
    name: "sharp-healthcare",
    role: "Healthcare operations",
    href: config.healthcareAppUrl,
    group: "operations",
  },
];

export const ECOSYSTEM_GROUPS: { id: EcosystemGroupId; title: string }[] = [
  { id: "platform", title: "Platform" },
  { id: "business", title: "Business" },
  { id: "people", title: "People" },
  { id: "operations", title: "Operations" },
];

const BY_ID = new Map(ECOSYSTEM_APPS.map((app) => [app.id, app]));

/**
 * Looks an app up by id.
 *
 * Throws rather than returning undefined: every id in this file is a literal
 * written by us, so a miss means a typo in a landing page that should surface
 * in development instead of silently rendering a dead link.
 */
export function ecosystemApp(id: EcosystemAppId): EcosystemApp {
  const app = BY_ID.get(id);
  if (!app) throw new Error(`Unknown sharpnr app id: ${id}`);
  return app;
}

/** The apps in one footer group, minus the site doing the rendering. */
export function ecosystemGroup(
  group: EcosystemGroupId,
  exclude?: EcosystemAppId,
): EcosystemApp[] {
  return ECOSYSTEM_APPS.filter(
    (app) => app.group === group && app.id !== exclude,
  );
}
