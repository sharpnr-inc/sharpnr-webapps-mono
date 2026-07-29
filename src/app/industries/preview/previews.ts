/*
 * The seven industries that do not exist yet.
 *
 * Every one of them used to have its own section component, its own
 * animation hook, its own arrangement of lists and panels, and its own
 * eight-bullet explanation of what each module would do. Seven bespoke
 * documents of a thing that has not been built is the wrong amount of
 * page: it made the roadmap look like a catalogue, and it made a visitor
 * work to discover that none of it ships.
 *
 * So this is data, and one component renders all seven. Each gets roughly
 * one screen and contains four things only:
 *
 *   the heading and its status   what it is, and that it is not built
 *   one line of copy             what it is being designed around
 *   one operational flow         the five stages, drawn, at 70% width
 *   a compact category row       who it is being designed for
 *
 * Four rules the content here obeys without exception.
 *
 *   1. Nothing claims to exist. "Designed", "planned", "being designed" —
 *      never "built", never "supports", never a present tense that could be
 *      read as availability. The one industry allowed the present tense is
 *      Hospitality, which has earned it. The category rows are bare nouns
 *      with no verb attached for the same reason: "Hospitals · Clinics"
 *      is a statement of intended market, "we support hospitals" is a lie.
 *
 *   2. Headings are two lines, the first ending in a comma and the second
 *      set in twilight, six words at the outside (design.md §4). The
 *      industry name is always the whole of the first line, so the name a
 *      visitor scans for and the name a search engine indexes are the same
 *      string, in an <h2>, unabbreviated.
 *
 *   3. Names are facts. Industry names, segment names and product names
 *      come from `website_instruction/07_Industries.md` and `sharpnr.md`.
 *      Where a suggested segment had no basis in the spec it was replaced
 *      by one that does — the spec's own words for healthcare are clinic,
 *      diagnostic center, hospital, wellness organization and healthcare
 *      network, and those are what appear.
 *
 *   4. The flows are each industry's own operational vocabulary. No two of
 *      these five-step sequences share a single stage, because if two
 *      sectors rendered the same flow the format would be doing all the
 *      talking and the content none.
 *
 * `weight` is the page's slope. The further down a visitor is, the less
 * there is: 1 near the top, 3 at the bottom. It only ever removes.
 */
import {
  Beaker,
  BookOpen,
  Briefcase,
  Building2,
  Car,
  Factory,
  FlaskConical,
  Globe,
  GraduationCap,
  HeartPulse,
  Layers,
  type LucideIcon,
  Network,
  Package,
  Pill,
  Repeat,
  Scale,
  School,
  Server,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sofa,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Calculator,
  Code,
  Megaphone,
  Presentation,
  Ruler,
} from "lucide-react";

export interface IndustryCategory {
  name: string;
  /** Decorative. The label always carries the meaning. */
  icon: LucideIcon;
}

export interface IndustryPreviewData {
  /** Matches `IndustryEntry.id` in `../roadmap`. */
  id: string;
  /** The industry name, verbatim. Also the whole of the heading's line 1. */
  name: string;
  /** Heading line 2 — twilight, and never more than three words. */
  tail: string;
  /** One line of copy. Never two. Intent, never availability. */
  intro: string;
  /** Kicker over the flow — what kind of journey this is. */
  flowKicker: string;
  /** Five stages. Always five: the run reads as one rhythm. */
  stages: readonly string[];
  /** What the flow is made of. Sits on the band under it. */
  capabilities: readonly string[];
  /**
   * Segments this industry is being designed for. Five or six — one tight
   * row, not a grid. Hospitality gets the full card treatment because it
   * exists; a preview that grew a ten-card grid would stop being a preview,
   * which is the one thing these sections must remain.
   */
  categories: readonly IndustryCategory[];
  weight: 1 | 2 | 3;
}

export const PREVIEWS: readonly IndustryPreviewData[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    tail: "connected end to end.",
    intro:
      "Designed so one patient record carries the whole visit, with no department typing it in again.",
    flowKicker: "PATIENT JOURNEY",
    stages: ["Appointment", "Consultation", "Diagnostics", "Treatment", "Follow-up"],
    capabilities: [
      "Patient Records",
      "Scheduling",
      "Laboratory",
      "Pharmacy",
      "Billing",
    ],
    categories: [
      { name: "Hospitals", icon: Building2 },
      { name: "Clinics", icon: Stethoscope },
      { name: "Diagnostic Centres", icon: FlaskConical },
      { name: "Pharmacies", icon: Pill },
      { name: "Wellness Organizations", icon: HeartPulse },
      { name: "Healthcare Networks", icon: Network },
    ],
    weight: 1,
  },
  {
    id: "technology",
    name: "Technology & Enterprise",
    tail: "one engagement.",
    intro:
      "Designed around how technology teams win work and deliver it — first conversation to invoice, as one record.",
    flowKicker: "ENGAGEMENT JOURNEY",
    stages: ["Lead", "Proposal", "Project", "Delivery", "Invoice"],
    capabilities: ["Pipeline", "Proposals", "Projects", "Workforce", "Invoicing"],
    categories: [
      { name: "IT Services", icon: Server },
      { name: "Software Companies", icon: Code },
      { name: "Product Teams", icon: Layers },
      { name: "Shared Services", icon: Network },
      { name: "Enterprises", icon: Globe },
    ],
    weight: 1,
  },
  {
    id: "commerce",
    name: "Digital Commerce",
    tail: "one continuous order.",
    intro:
      "Designed around the online order, so a listing, a shipment and a return stay one record across every channel.",
    flowKicker: "ORDER JOURNEY",
    stages: ["Listing", "Order", "Fulfilment", "Delivery", "Returns"],
    capabilities: ["Catalogue", "Orders", "Warehousing", "Payments", "Customers"],
    categories: [
      { name: "D2C Brands", icon: Package },
      { name: "Marketplaces", icon: ShoppingBag },
      { name: "Omnichannel Retail", icon: Store },
      { name: "Subscription Commerce", icon: Repeat },
    ],
    weight: 2,
  },
  {
    id: "education",
    name: "Education",
    tail: "the whole student journey.",
    intro:
      "Designed for one record that follows a student from first application to graduation, read by staff and parents alike.",
    flowKicker: "STUDENT JOURNEY",
    stages: ["Application", "Enrollment", "Classes", "Examinations", "Graduation"],
    capabilities: [
      "Admissions",
      "Student Records",
      "Timetables",
      "Examinations",
      "Fees",
    ],
    categories: [
      { name: "Schools", icon: School },
      { name: "Colleges & Universities", icon: GraduationCap },
      { name: "Coaching Institutes", icon: BookOpen },
      { name: "Training Centres", icon: Presentation },
      { name: "Multi-campus Institutions", icon: Network },
    ],
    weight: 2,
  },
  {
    id: "professional",
    name: "Professional Services",
    tail: "built on relationships.",
    intro:
      "Designed around the client relationship, keeping the brief, the work and the retainer attached to the hours behind them.",
    flowKicker: "CLIENT JOURNEY",
    stages: ["Enquiry", "Engagement", "Delivery", "Review", "Retainer"],
    capabilities: ["Clients", "Engagements", "Time", "Documents", "Invoicing"],
    categories: [
      { name: "Agencies", icon: Megaphone },
      { name: "Consultancies", icon: Briefcase },
      { name: "Law Firms", icon: Scale },
      { name: "Accounting Practices", icon: Calculator },
      { name: "Architecture Studios", icon: Ruler },
    ],
    weight: 2,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tail: "material to dispatch.",
    intro:
      "Built around the manufacturing lifecycle, so a batch stays traceable from what arrived to what left.",
    flowKicker: "PRODUCTION CHAIN",
    stages: ["Raw Material", "Production", "Quality", "Warehouse", "Dispatch"],
    capabilities: [
      "Bill of Materials",
      "Work Orders",
      "Quality Control",
      "Warehousing",
      "Dispatch",
    ],
    categories: [
      { name: "Discrete Manufacturing", icon: Factory },
      { name: "Process Manufacturing", icon: Beaker },
      { name: "Automotive", icon: Car },
      { name: "Food Processing", icon: UtensilsCrossed },
      { name: "Multi-plant Enterprises", icon: Network },
    ],
    weight: 3,
  },
  {
    id: "retail",
    name: "Retail",
    tail: "one stock figure.",
    intro:
      "Designed around modern retail operations, so one count holds true from the supplier's delivery to the reorder.",
    flowKicker: "PRODUCT JOURNEY",
    stages: ["Supplier", "Warehouse", "Shelf", "Checkout", "Replenishment"],
    capabilities: [
      "Point of Sale",
      "Inventory",
      "Transfers",
      "Pricing",
      "Procurement",
    ],
    categories: [
      { name: "Supermarkets", icon: ShoppingCart },
      { name: "Fashion & Apparel", icon: Shirt },
      { name: "Electronics", icon: Server },
      { name: "Furniture & Home", icon: Sofa },
      { name: "Convenience Stores", icon: Store },
      { name: "Chains & Franchises", icon: Network },
    ],
    weight: 3,
  },
] as const;
