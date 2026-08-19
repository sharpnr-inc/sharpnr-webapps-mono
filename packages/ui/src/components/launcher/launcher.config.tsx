import type { ElementType } from "react";
import { config } from "@sharpnr/env";
import {
  Boxes,
  Brain,
  Database,
  FileText,
  Hotel,
  Megaphone,
  MessagesSquare,
  ReceiptText,
  ShoppingBag,
  Stethoscope,
  Users,
  Workflow,
} from "lucide-react";

export type LauncherItem = {
  id: string;
  label: string;
  /** Icon component, e.g. a lucide-react icon. */
  icon: ElementType;
  /** One-line summary, shown under the label. */
  description?: string;
  /**
   * External Sharpnr app URL -- always taken from `@sharpnr/env`, never
   * hardcoded. Rendered as a plain `<a href>`, so no router is involved.
   */
  href?: string;
  /**
   * Internal route, for apps that override `sections` with their own
   * workspaces. Handed to the `onNavigate` prop so the app's router does it.
   */
  to?: string;
};

export type LauncherSection = {
  id: string;
  title: string;
  items: LauncherItem[];
};

/**
 * The default listing: every Sharpnr *service* and *business operation* app
 * declared in `@sharpnr/env`.
 *
 * Deliberately excluded, because they are not apps a user launches from here:
 * auth (login portal), iam (employee portal, the launcher's usual host), docs
 * and the marketing website.
 */
export const LAUNCHER_SECTIONS: LauncherSection[] = [
  {
    id: "sharpnr_services",
    title: "Sharpnr Services",
    items: [
      {
        id: "orchestrator",
        label: "Orchestrator",
        description: "Command center",
        icon: Workflow,
        href: config.orchestratorAppUrl,
      },
      {
        id: "accounting",
        label: "Accounting",
        description: "Finance & ledger",
        icon: ReceiptText,
        href: config.accountingAppUrl,
      },
      {
        id: "sharpcrm",
        label: "Sharp CRM",
        description: "Leads & campaigns",
        icon: Megaphone,
        href: config.sharpcrmAppUrl,
      },
      {
        id: "hr",
        label: "Sharp HR",
        description: "People & payroll",
        icon: Users,
        href: config.hrAppUrl,
      },
      {
        id: "silo",
        label: "Silo",
        description: "Storage & data",
        icon: Database,
        href: config.siloAppUrl,
      },
      {
        id: "cortex",
        label: "Cortex",
        description: "IT & access control",
        icon: Brain,
        href: config.cortexAppUrl,
      },
      {
        id: "folio",
        label: "Folio",
        description: "Docs & sheets",
        icon: FileText,
        href: config.folioAppUrl,
      },
      {
        id: "stockwave",
        label: "Stockwave",
        description: "Inventory",
        icon: Boxes,
        href: config.stockwaveAppUrl,
      },
      {
        id: "marketplace",
        label: "Marketplace",
        description: "B2B & O2O trading",
        icon: ShoppingBag,
        href: config.marketplaceAppUrl,
      },
      {
        id: "cables",
        label: "Cables",
        description: "Messaging & calls",
        icon: MessagesSquare,
        href: config.cablesAppUrl,
      },
    ],
  },
  {
    id: "business_operations",
    title: "Business Operations",
    items: [
      {
        id: "hospitality",
        label: "Hospitality",
        description: "Hotels, bars & POS",
        icon: Hotel,
        href: config.hospitalityAppUrl,
      },
      {
        id: "healthcare",
        label: "Healthcare",
        description: "Clinics & patients",
        icon: Stethoscope,
        href: config.healthcareAppUrl,
      },
    ],
  },
];
