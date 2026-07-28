import type { ComponentType } from "react";
import { config } from "@/configs/env";
import {
  MarkAutomation,
  MarkCommunication,
  MarkDeveloper,
  MarkFinance,
  MarkIntelligence,
  MarkMarketplace,
  MarkOperations,
  MarkPeople,
  MarkStorage,
} from "./marks";

/*
 * The nine capabilities of the platform, and what runs each one.
 *
 * Groups are the nine documents in `website_instruction/06_Capabilities`,
 * with Intelligence lifted to second by direction — it is the capability
 * that touches every other one, so it is introduced early rather than
 * buried in the middle. Each group's lede is that capability doc's own
 * positioning line, cut to one clause.
 *
 * ── One voice for every product line ──────────────────────────────────
 * Every description answers the same question: what this lets the business
 * do. Not how it is built, not what it contains. Earlier passes mixed
 * feature lists ("docs, sheets, presentations"), implementation detail
 * ("S3-compatible", "double-entry", "its own domain") and outcome copy on
 * the same page, which reads as several people writing. Infrastructure
 * vocabulary is gone entirely — a visitor deciding what to adopt is not
 * shopping for storage classes.
 *
 * ── Links ─────────────────────────────────────────────────────────────
 * Every URL comes from `configs/env.ts`, and all twelve are reachable:
 * eleven as products below, plus `authAppUrl` through the page's Get
 * Started action, which is what that URL is for. Products with no
 * application yet are listed and simply not linked — a wrong destination
 * is worse than none.
 *
 * ── Judgement calls, so nobody has to reverse-engineer them ────────────
 *  - Orchestrator sits under Automation. `sharpnr.md` calls it the glue
 *    that connects every service to every other, which is the mechanism
 *    behind work moving without anyone re-entering it.
 *  - Cortex sits under Developer Platform, on the strength of that doc's
 *    Identity component — "provide secure access across connected
 *    experiences". It is the only shipping product that does this across
 *    the whole platform.
 *  - The Developer Platform doc also describes APIs, SDKs, webhooks and an
 *    integration framework. None of those is a product in `sharpnr.md`, so
 *    none is claimed here.
 */

export interface CatalogueProduct {
  name: string;
  /** One line: what this lets the business do. Never how it is built. */
  line: string;
  /** The live app. Omitted entirely when there is nothing to open yet. */
  href?: string;
  /** A short status mark, for a product that is not shipping yet. */
  note?: string;
}

export interface CatalogueGroup {
  index: string;
  /** The capability, named as `06_Capabilities` names it. */
  capability: string;
  /** The capability's own positioning line, cut to one clause. */
  lede: string;
  Mark: ComponentType;
  /**
   * Draw the shared backplane through this group. Reserved for
   * Intelligence, which is the one capability that reaches into every
   * other — said with linework rather than with a sentence claiming it.
   */
  connected?: boolean;
  products: CatalogueProduct[];
}

export const CATALOGUE: CatalogueGroup[] = [
  {
    index: "01",
    capability: "Operations",
    lede: "Plan, coordinate, execute and track the work a business runs on.",
    Mark: MarkOperations,
    products: [
      {
        name: "Sharp-Hospitality",
        line: "Keep a venue or an entire chain running — tables, orders, the kitchen and the rooms, without four systems to reconcile.",
        href: config.hospitalityAppUrl,
      },
      {
        name: "Lifco",
        line: "Run clinical and patient operations for a healthcare business.",
        note: "Soon",
      },
    ],
  },
  {
    index: "02",
    capability: "Intelligence",
    lede: "What is happening, why it is happening, and what to do next.",
    Mark: MarkIntelligence,
    connected: true,
    products: [
      {
        name: "IVA",
        line: "Ask the business a question and get an answer that already accounts for how everything connects.",
      },
      {
        name: "Analytics",
        line: "See what is actually happening across the business, without anyone assembling it by hand.",
      },
      {
        name: "Recommendations",
        line: "Get a clear next step at the point a decision has to be made.",
      },
      {
        name: "Automation",
        line: "Hand off recurring work so people spend their time on the parts that need judgement.",
      },
      {
        name: "Knowledge",
        line: "Find what the business already knows, the moment someone needs it.",
      },
    ],
  },
  {
    index: "03",
    capability: "Communication",
    lede: "Conversations, decisions and knowledge, kept with the work they belong to.",
    Mark: MarkCommunication,
    products: [
      {
        name: "Cables",
        line: "Keep every conversation, call and decision attached to the work that caused it.",
        href: config.cablesAppUrl,
      },
    ],
  },
  {
    index: "04",
    capability: "Automation",
    lede: "Repetitive work removed, with people still in control of it.",
    Mark: MarkAutomation,
    products: [
      {
        name: "Orchestrator",
        line: "Decide what each company can use, and let work move between those products without anyone re-entering it.",
        href: config.orchestratorAppUrl,
      },
    ],
  },
  {
    index: "05",
    capability: "Finance",
    lede: "A complete understanding of how money moves through the business.",
    Mark: MarkFinance,
    products: [
      {
        name: "Sharp-Accounting",
        line: "Know exactly where the money stands, with the books kept current as the business trades.",
        href: config.accountingAppUrl,
      },
    ],
  },
  {
    index: "06",
    capability: "Marketplace",
    lede: "Connect with the customers, partners and opportunities beyond your own operations.",
    Mark: MarkMarketplace,
    products: [
      {
        name: "Sharp-CRM",
        line: "Turn leads and campaigns into relationships the business actually keeps.",
        href: config.sharpCRMAppUrl,
      },
      {
        name: "Sharp-Marketplace",
        line: "Buy from and sell to other businesses on Sharpnr, with no commission taken. Payments settle off-platform for now.",
        href: config.marketplaceAppUrl,
      },
    ],
  },
  {
    index: "07",
    capability: "People",
    lede: "Build, support and grow the teams the business is made of.",
    Mark: MarkPeople,
    products: [
      {
        name: "Sharp-HR",
        line: "Hire, pay and support employees without chasing the paperwork around.",
        href: config.hrAppUrl,
      },
      {
        name: "OpenSharp IAM",
        line: "Give every employee one workspace for their tasks, approvals, attendance, leave, payslips and training — and let them handle their own requests.",
        href: config.iamAppUrl,
      },
    ],
  },
  {
    index: "08",
    capability: "Storage",
    lede: "Documents, files and business knowledge, held next to the work they support.",
    Mark: MarkStorage,
    products: [
      {
        name: "Folio",
        line: "Write, plan and decide together, on documents everyone can work in at once.",
        href: config.folioAppUrl,
      },
      {
        name: "Stockwave",
        line: "Know what stock exists, where it is sitting and what needs ordering, across every location.",
      },
      {
        name: "Silo",
        line: "Give the business one place its files and records live, and one version everything else reads from.",
        href: config.siloAppUrl,
      },
    ],
  },
  {
    index: "09",
    capability: "Developer Platform",
    lede: "Extend and integrate without changing the foundation underneath.",
    Mark: MarkDeveloper,
    products: [
      {
        name: "Cortex",
        line: "Decide who can reach what across every product, and keep a record of every change.",
        href: config.cortexAppUrl,
      },
    ],
  },
];
