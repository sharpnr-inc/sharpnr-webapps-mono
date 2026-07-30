/*
 * Scene 03 — the map, as geometry.
 *
 * Three bands, read top to bottom: applications, the platform they run on,
 * the foundation it stands on. Divided by rules that span the full width,
 * the way a section is delimited on an architectural drawing.
 *
 * The platform is a slab, not a box. When it was a rounded rect the same
 * size as a module it read as *another application* sitting in the middle
 * of the stack — the one thing the scene must not say. A slab that runs
 * edge to edge and carries the band above it is architecture rather than
 * UI, and the difference is entirely in the geometry.
 *
 * Routing is strictly 90°, and deliberately unequal: the outer columns
 * merge into shared trunks before they reach the slab, the centre drops
 * straight. Six identical drops read as a template; grouped runs read as
 * something that was engineered.
 */

export const VIEW = { w: 560, h: 512 } as const;

export const Y = {
  headA: 12,
  rowA: 30,
  rowB: 92,
  moduleH: 50,
  /** Where the drops converge. No rule is drawn here — the slab's own top
      edge already divides the bands, and a second line was just clutter. */
  ruleA: 158,
  slab: 206,
  /* Shorter again now the slab holds one row of business objects rather
     than an open record with a field table in it. A slab is a structural
     member, not a panel — it should look like something the band above
     stands on, and depth was only ever needed to fit the record. */
  slabH: 98,
  /** The object row inside the slab. */
  objRow: 244,
  objectH: 34,
  /** The rule opening the foundation band. */
  ruleB: 356,
  headB: 350,
  fRowA: 368,
  fRowB: 426,
  foundationH: 42,
} as const;

/** The business objects a module writes. Empty means "all of them". */
export type Writes = readonly string[];

export interface Module {
  label: string;
  /** One word for what it does — it reads as a product, not a category. */
  sub: string;
  cx: number;
  row: 0 | 1;
  /** Which trunk this column feeds. */
  trunk: number;
  /** Subtitle tint, 0–1. Varied per module so the row looks set by hand
   *  rather than generated — six identical boxes read as a template. */
  tint: number;
  /** The business objects this application actually writes. */
  writes: Writes;
}

export const MODULE_W = 156;

/*
 * Six applications, evenly ranked — none is the "main" one, which is the
 * point. Front of house on the top rank, back office beneath.
 *
 * `writes` names the business objects each application actually touches,
 * and it is the thing that keeps the scene honest. Every module used to
 * drop into a slab holding one customer record, which drew Payroll writing
 * to a customer. It does not: Payroll writes employees, Accounting writes
 * invoices, Operations works orders and bookings.
 *
 * An empty list means "every object" and belongs to Communication alone —
 * a message attaches to whatever is being discussed, so it genuinely does
 * reach all of them. That is a property of the product, not a shortcut
 * around the mapping.
 */
export const MODULES: Module[] = [
  { label: "CRM", sub: "Customers", cx: 98, row: 0, trunk: 0, tint: 0.82, writes: ["customers"] },
  { label: "Operations", sub: "Workflows", cx: 280, row: 0, trunk: 1, tint: 0.62, writes: ["orders", "bookings"] },
  { label: "Marketplace", sub: "Trade", cx: 462, row: 0, trunk: 2, tint: 0.74, writes: ["orders", "products"] },
  { label: "Accounting", sub: "Invoices", cx: 98, row: 1, trunk: 0, tint: 0.58, writes: ["invoices"] },
  { label: "People", sub: "Payroll", cx: 280, row: 1, trunk: 1, tint: 0.78, writes: ["employees"] },
  { label: "Communication", sub: "Messaging", cx: 462, row: 1, trunk: 2, tint: 0.66, writes: [] },
];

/** Three trunks, not six drops. The outer pairs share a run. */
export const TRUNKS = [98, 280, 462];

export const SLAB = { y: Y.slab, h: Y.slabH } as const;

/*
 * The record the platform holds — the same customer Scene 02 showed five
 * systems disagreeing about. There, five identities; here, one, owned by
 * nobody in particular and read by everything above. Masked to the last
 * three digits exactly as Scene 02 masks it.
 *
 * Set out as an engineering record rather than a contact card: a labelled
 * field column reads as a system of record, which is the claim.
 */
/*
 * The slab: a shared business foundation, not a customer record.
 *
 * ── Why there is no longer a person in the middle ─────────────────────
 * This band used to hold one open customer record — "Ramesh Kumar",
 * CUST-0194 — with all six applications dropping into it. The intent was
 * to answer Scene 02, which ends on "Five systems. Five identities. One
 * customer." What it actually drew was every application writing to a
 * customer, and that is architecturally false:
 *
 *   Payroll does not depend on a customer. Identity does not. Storage does
 *   not. Marketplace trades with suppliers as readily as customers, and a
 *   message in Communication is as likely to be about an employee or a
 *   vendor.
 *
 * Worse than any single wrong line, it made Customer look like the centre
 * of the platform — which is CRM architecture. Sharpnr is not CRM-first;
 * it is a shared foundation that many kinds of record live on. A hero that
 * says otherwise misrepresents the product at the first thing a visitor
 * looks at.
 *
 * So the slab now holds the business objects themselves. Every application
 * above has a legitimate reason to reach it, because each one writes the
 * objects it owns rather than all of them writing one.
 *
 * ── What Scene 02 gets instead ────────────────────────────────────────
 * The handoff survives without the fake person: Scene 02 ends on one
 * customer held five ways, and "Customers" is the first object on this
 * slab — one shared object rather than five copies. The argument lands the
 * same way, and nothing on screen is invented.
 *
 * Counts were considered for these chips (Customers 28,402, Orders
 * 12,184). They are rejected: every figure would be fabricated, and a
 * fabricated metric on the homepage is a worse problem than a vague one.
 */
export const SLAB_LABEL = "System of record";

export type ObjectId =
  | "customers"
  | "orders"
  | "invoices"
  | "employees"
  | "products"
  | "bookings";

export interface BusinessObject {
  id: ObjectId;
  label: string;
  cx: number;
}

export const OBJECT_W = 78;

/* One row of six, deliberately unlike the 3×2 grids above and below it.
   Three identical grids stacked would have read as one shape repeated;
   the band that is the point should not look like the bands either side. */
export const OBJECTS: BusinessObject[] = [
  { id: "customers", label: "Customers", cx: 62 },
  { id: "orders", label: "Orders", cx: 149 },
  { id: "invoices", label: "Invoices", cx: 236 },
  { id: "employees", label: "Employees", cx: 323 },
  { id: "products", label: "Products", cx: 410 },
  { id: "bookings", label: "Bookings", cx: 497 },
];

/*
 * The foundation, named. These are the reason the platform exists — one
 * identity, one permission model, one event stream — and at three items in
 * small type they were reading as a footnote.
 */
export const FOUNDATION = [
  { label: "Identity", cx: 98, row: 0 },
  { label: "Permissions", cx: 280, row: 0 },
  { label: "Storage", cx: 462, row: 0 },
  { label: "Events", cx: 98, row: 1 },
  { label: "Automation", cx: 280, row: 1 },
  { label: "Intelligence", cx: 462, row: 1 },
];

export const FOUNDATION_W = 156;

/**
 * Module → trunk → slab.
 *
 * Row B drops straight onto its trunk. Row A steps sideways into the gutter
 * beside its own column first, so it clears the footprint of the module
 * below — which is exactly what a board does when a run has to pass a part.
 */
export function dropPath(m: Module): string {
  const top = (m.row === 0 ? Y.rowA : Y.rowB) + Y.moduleH;
  const trunk = TRUNKS[m.trunk];
  if (m.row === 1) return `M ${m.cx} ${top} L ${trunk} ${Y.ruleA}`;
  const lane = m.cx + MODULE_W / 2 + 12;
  const mid = Y.rowB - 16;
  return `M ${m.cx} ${top} L ${m.cx} ${mid} L ${lane} ${mid} L ${lane} ${Y.rowB + Y.moduleH + 14} L ${trunk} ${Y.rowB + Y.moduleH + 14} L ${trunk} ${Y.ruleA}`;
}

/** Trunk → slab. The centre one is heaviest; it carries the most. */
export const trunkPath = (x: number) => `M ${x} ${Y.ruleA} L ${x} ${Y.slab}`;

/** Slab → foundation. One drop, then a spine across, then short legs. */
export const FOOT_SPINE = `M 280 ${Y.slab + Y.slabH} L 280 ${Y.ruleB}`;
