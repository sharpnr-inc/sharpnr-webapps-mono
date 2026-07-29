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
  /* ~23% shorter. The panel had a lot of dead vertical space and an
     engineering record should read dense. */
  slabH: 118,
  /** The rule opening the foundation band. */
  ruleB: 356,
  headB: 350,
  fRowA: 368,
  fRowB: 426,
  foundationH: 42,
} as const;

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
}

export const MODULE_W = 156;

/* Six applications, evenly ranked — none is the "main" one, which is the
   point. Front of house on the top rank, back office beneath. */
export const MODULES: Module[] = [
  { label: "CRM", sub: "Customers", cx: 98, row: 0, trunk: 0, tint: 0.82 },
  { label: "Operations", sub: "Workflows", cx: 280, row: 0, trunk: 1, tint: 0.62 },
  { label: "Marketplace", sub: "Trade", cx: 462, row: 0, trunk: 2, tint: 0.74 },
  { label: "Accounting", sub: "Invoices", cx: 98, row: 1, trunk: 0, tint: 0.58 },
  { label: "People", sub: "Payroll", cx: 280, row: 1, trunk: 1, tint: 0.78 },
  { label: "Communication", sub: "Messaging", cx: 462, row: 1, trunk: 2, tint: 0.66 },
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
export const RECORD = {
  /* Not "Sharpnr Platform". The site has already said whose platform this
     is; naming the slab after the brand wasted the one label that could
     instead explain the architecture. "System of record" is the actual
     concept — one place a fact is true. */
  slab: "System of record",
  kind: "Customer",
  name: "Ramesh Kumar",
  fields: [
    ["ID", "CUST-0194"],
    ["Phone", "+91 98xxxx345"],
    ["Owner", "Shared"],
    ["Status", "Active"],
  ] as const,
};

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
