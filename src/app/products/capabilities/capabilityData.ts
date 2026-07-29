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
 * The page is a tour of one platform, capability by capability — never a
 * product list. Groups are the nine documents in
 * `website_instruction/06_Capabilities`, with Intelligence lifted to second
 * by direction: it is the capability that touches every other one, so it is
 * introduced early rather than buried in the middle. Each group's lede is
 * that capability doc's own positioning line, cut to one clause.
 *
 * ── One voice for every product line ──────────────────────────────────
 * Every description answers the same question: what this lets the business
 * do. Not how it is built, not what it contains. Earlier passes mixed
 * feature lists ("docs, sheets, presentations"), implementation detail
 * ("S3-compatible", "double-entry", "runs on its own domain") and outcome
 * copy on the same page, which reads as several people writing.
 * Infrastructure vocabulary is gone entirely — a visitor deciding what to
 * adopt is not shopping for storage classes. The three things the page says
 * plainly, in the copy above the list: every product works on its own,
 * adopt only what you need, anything you add works with what you have.
 *
 * ── Links, and what "Soon" means ──────────────────────────────────────
 * Every URL comes from `configs/env.ts`, and all twelve are reachable:
 * eleven as products below, plus `authAppUrl` through the page's Get
 * Started action, which is what that URL is for.
 *
 * One rule, applied without exception: a product with no application to
 * open is listed, is NOT a link, and carries "Soon". Guessing a URL would
 * ship a 404; leaving a product out would misrepresent the platform; and
 * an unmarked card with no link reads as an oversight rather than as a
 * statement. Nothing here is dated, because nothing here has a date.
 *
 * ── Judgement calls, so nobody has to reverse-engineer them ────────────
 *  - Orchestrator sits under Automation. `sharpnr.md` calls it the glue
 *    that connects every service to every other, which is the mechanism
 *    behind work moving without anyone re-entering it.
 *  - Cortex sits under Developer Platform, on the strength of that doc's
 *    Identity component — "provide secure access across connected
 *    experiences". It is the only shipping product that does this across
 *    the whole platform.
 *  - Tasks is not a product of its own. It is one of the things an
 *    employee opens OpenSharp IAM to do, and it is written that way.
 *  - The Developer Platform doc also describes APIs, SDKs, webhooks and an
 *    integration framework. None of those is a product in `sharpnr.md`, so
 *    none is claimed here.
 */

export interface CapabilityProduct {
  name: string;
  /** One line: what this lets the business do. Never how it is built. */
  line: string;
  /** The live app. Omitted entirely when there is nothing to open yet. */
  href?: string;
  /** A short status mark. Present on exactly the products with no `href`. */
  note?: string;
}

export interface Capability {
  index: string;
  /** The capability, named as `06_Capabilities` names it. */
  name: string;
  /** The capability's own positioning line, cut to one clause. */
  lede: string;
  Mark: ComponentType;
  /**
   * Draw the shared backplane through this capability. Reserved for
   * Intelligence, which is the one capability that reaches into every
   * other — said with linework rather than with a sentence claiming it.
   */
  connected?: boolean;
  products: CapabilityProduct[];
}

const SOON = "Soon";

export const CAPABILITIES: Capability[] = [
  {
    index: "01",
    name: "Operations",
    lede: "Plan, coordinate, execute and track the work a business runs on.",
    Mark: MarkOperations,
    products: [
      {
        /* Just the edition here. The group heading opposite already reads
           "Operations", so the full "Sharp Operations · Hospitality" on the
           card repeated the word the eye had just read and made the line
           twice as long for no extra meaning. In this column the two cards
           are the two editions — Hospitality and Lifco — and the capability
           they belong to is the heading beside them.

           The full form still stands everywhere the parent is not already
           on screen: the footer, the Industries kicker, structured data.
           Bare "Sharp-Hospitality" is wrong in all of them. */
        name: "Hospitality",
        line: "Keep a venue or an entire chain running — tables, orders, the kitchen and the rooms, with nothing left to reconcile afterwards.",
        href: config.hospitalityAppUrl,
      },
      {
        name: "Lifco",
        line: "Run clinical and patient work end to end, so care and admin stop being two separate jobs.",
        note: SOON,
      },
    ],
  },
  {
    index: "02",
    name: "Intelligence",
    lede: "What is happening, why it is happening, and what to do next.",
    Mark: MarkIntelligence,
    connected: true,
    products: [
      {
        name: "IVA",
        line: "Ask the business a question and get an answer that already accounts for how everything connects.",
        note: SOON,
      },
      {
        name: "Analytics",
        line: "See what is actually happening across the business, without anyone assembling it by hand.",
        note: SOON,
      },
      {
        name: "Recommendations",
        line: "Get a clear next step at the point a decision has to be made.",
        note: SOON,
      },
      {
        name: "Automation",
        line: "Hand off recurring work so people spend their time on the parts that need judgement.",
        note: SOON,
      },
      {
        name: "Knowledge",
        line: "Find what the business already knows, the moment someone needs it.",
        note: SOON,
      },
    ],
  },
  {
    index: "03",
    name: "Communication",
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
    name: "Automation",
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
    name: "Finance",
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
    name: "Marketplace",
    lede: "Reach the customers, partners and opportunities beyond your own operations.",
    Mark: MarkMarketplace,
    products: [
      {
        name: "Sharp-CRM",
        line: "Turn leads and campaigns into relationships the business actually keeps.",
        href: config.sharpCRMAppUrl,
      },
      {
        /* `sharpnr.md` is explicit that Sharpnr does not process payments
           yet and that the site must never imply otherwise, so the second
           sentence is not optional. */
        name: "Sharp-Marketplace",
        line: "Sell to and buy from other businesses on Sharpnr, with nothing taken in commission. Payments still settle outside the platform.",
        href: config.marketplaceAppUrl,
      },
    ],
  },
  {
    index: "07",
    name: "People",
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
        line: "Give every employee one place for their tasks, approvals, attendance, leave, payslips and training — and let them handle their own requests there.",
        href: config.iamAppUrl,
      },
    ],
  },
  {
    index: "08",
    name: "Storage",
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
        line: "Know what stock exists, where it is sitting and what needs ordering, across every warehouse and location.",
        note: SOON,
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
    name: "Developer Platform",
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
