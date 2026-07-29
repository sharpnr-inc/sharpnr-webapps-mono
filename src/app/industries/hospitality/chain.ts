/*
 * Hospitality — the systems behind one guest moment.
 *
 * The section used to hand off from the guest journey to a row of chips,
 * which said "here are twelve product names" and nothing about how they
 * relate. This is the data behind the replacement: a cascade, and the
 * order in which one guest action propagates through it.
 *
 * Two things are separated on purpose.
 *
 *   TIERS / EDGES   the *structure* — what feeds what. Fixed.
 *   SEQUENCE        the *causality* — the order a single order travels.
 *                   Workforce lights with the kitchen because a fired
 *                   ticket is what puts a station to work; it is not a
 *                   separate beat.
 *
 * Geometry lives here rather than in the component so the wide drawing and
 * the stacked mobile version render from one source and can never drift.
 * Positions are in viewBox units; nothing here knows about CSS.
 */

export interface ChainNode {
  id: string;
  label: string;
  /** Small mono line that arrives when the step lights. */
  note: string;
  tier: number;
}

/* Sharp Operations · Hospitality, as it is described in
   website_instruction/07_Industries.md — no product is invented here. */
export const CHAIN_NODES: ChainNode[] = [
  { id: "pos", label: "Point of Sale", note: "Order placed", tier: 1 },
  { id: "kitchen", label: "Kitchen Display", note: "Ticket fired", tier: 2 },
  { id: "inventory", label: "Inventory", note: "", tier: 2 },
  { id: "accounting", label: "Accounting", note: "Entry posted", tier: 2 },
  { id: "workforce", label: "Workforce", note: "Station staffed", tier: 3 },
  { id: "crm", label: "CRM", note: "Guest history updated", tier: 3 },
  { id: "analytics", label: "Live Insights", note: "Figures refreshed", tier: 4 },
  { id: "iva", label: "IVA", note: "", tier: 5 },
];

/** What feeds what. Structure, not order. */
export const CHAIN_EDGES: [string, string][] = [
  ["pos", "inventory"],
  ["pos", "kitchen"],
  ["pos", "accounting"],
  ["inventory", "workforce"],
  ["kitchen", "workforce"],
  ["accounting", "crm"],
  ["workforce", "analytics"],
  ["crm", "analytics"],
  ["analytics", "iva"],
];

/*
 * The ecosystem the whole thing stands on.
 *
 * These are products, not capabilities — Sharp Accounting is a thing you
 * can buy, "Accounting" in the cascade above is something the platform
 * does. The two must never be mistaken for each other, so they are drawn
 * differently: capabilities are boxed and set in the page's sans, products
 * are unboxed mono sitting on one continuous line. Same accent for both;
 * the distinction is typographic, not chromatic.
 *
 * Names are written exactly as the rest of the site writes them. "Sharp
 * Accounting" is never shortened to "Accounting" here, because the cascade
 * already has a node by that name.
 *
 * The order below is the order they sit along the band, and it alternates
 * between the upper and lower label row — which is what gives every name
 * 225 units of room instead of 112.
 */
export interface EcoNode {
  id: string;
  label: string;
}

export const ECOSYSTEM: EcoNode[] = [
  { id: "eco-accounting", label: "Sharp Accounting" },
  { id: "eco-hrms", label: "Sharp HRMS" },
  { id: "eco-crms", label: "Sharp CRMS" },
  { id: "eco-cables", label: "Cables" },
  { id: "eco-tasks", label: "Tasks" },
  { id: "eco-silo", label: "Silo" },
  { id: "eco-iva", label: "IVA" },
  { id: "eco-marketplace", label: "Sharp Marketplace" },
];

/**
 * The causal chain, in order. `via` is the edge the travelling charge runs
 * along to reach this step, `with` is anything that lights at the same
 * instant rather than as its own beat, and `eco` is the product in the band
 * below that registers the same event.
 *
 * `eco` is deliberately sparse. A step gets one only where the relationship
 * is real — stock falling is what sends you to the marketplace, a fired
 * ticket is work and a staffed station is people. Cables has no beat of its
 * own because a single order does not start a conversation; it settles with
 * the rest of the band at the end, which is the honest claim.
 */
export const SEQUENCE: {
  id: string;
  via?: [string, string];
  with?: string[];
  eco?: string[];
}[] = [
  { id: "pos" },
  {
    id: "kitchen",
    via: ["pos", "kitchen"],
    with: ["workforce"],
    eco: ["eco-tasks", "eco-hrms"],
  },
  { id: "inventory", via: ["pos", "inventory"], eco: ["eco-marketplace"] },
  { id: "accounting", via: ["pos", "accounting"], eco: ["eco-accounting"] },
  { id: "crm", via: ["accounting", "crm"], eco: ["eco-crms"] },
  { id: "analytics", via: ["crm", "analytics"], eco: ["eco-silo"] },
  { id: "iva", via: ["analytics", "iva"], eco: ["eco-iva"] },
];

/** The five words of the guest journey, condensed from the rail above it. */
export const JOURNEY = [
  "Discover",
  "Reserve",
  "Dine",
  "Pay",
  "Return",
] as const;

/* Illustrative only — a mechanism, not a product claim. The count exists
   so the diagram can show a number *changing*, which is the one thing a
   highlight cannot say. */
export const STOCK_FROM = 184;
export const STOCK_TO = 183;

export const IVA_LINE = "Suggests a reorder before stock runs low.";

export const BAND_KICKER = "THE SHARP ECOSYSTEM";

/* ── Wide geometry ────────────────────────────────────────────────────
   One column of authority down the middle, tiers widening and narrowing
   again. The cascade is meant to read as a structure seen from the front,
   which is why every run is orthogonal — a radial fan would say "hub and
   satellites", and these are stages, not satellites. */

export const WIDE = {
  w: 900,
  h: 692,
  nodeH: 44,
  journeyY: 26,
  handoffTop: 44,
  handoffBottom: 84,
  handoffLabelY: 102,
  pos: {
    pos: { cx: 450, top: 126, w: 148 },
    inventory: { cx: 154, top: 214, w: 152 },
    kitchen: { cx: 450, top: 214, w: 152 },
    accounting: { cx: 746, top: 214, w: 152 },
    workforce: { cx: 300, top: 302, w: 152 },
    crm: { cx: 600, top: 302, w: 152 },
    analytics: { cx: 450, top: 390, w: 152 },
    iva: { cx: 450, top: 470, w: 240 },
  } as Record<string, { cx: number; top: number; w: number }>,
} as const;

/* ── The ecosystem band ───────────────────────────────────────────────
   A slab, in the same language as the platform slab in
   `src/app/home/one-platform/PlatformMap.tsx`: one line running the full
   width with everything sitting on it. The line is the argument — eight
   separate boxes would have said the opposite of "nothing operates in
   isolation".

   Labels alternate between two rows so each one has 225 units of room
   rather than 112; at one row of eight, "Sharp Marketplace" would have had
   to be shrunk or shortened, and shortening it is forbidden. */
export const BAND = {
  /** Where the trunk leaves the bottom of IVA. */
  trunkTop: 514,
  labelY: 552,
  lineY: 574,
  /** Tick length for the upper and lower label rows. */
  tickA: 18,
  tickB: 44,
  rowA: 606,
  rowB: 632,
  bottomY: 652,
} as const;

/** Centres of the eight ticks along the band. */
export const ECO_X = ECOSYSTEM.map((_, i) => 56.25 + i * 112.5);

/** Everything about one product's place on the band. */
export function ecoSpot(i: number) {
  const upper = i % 2 === 0;
  return {
    x: ECO_X[i],
    tick: upper ? BAND.tickA : BAND.tickB,
    y: upper ? BAND.rowA : BAND.rowB,
  };
}

/** Journey stage centres across the top band. */
export const JOURNEY_X = [92, 271, 450, 629, 808];

/**
 * An orthogonal run from one node's bottom edge to another's top edge.
 *
 * Always a <path> so DrawSVGPlugin — and the plain stroke-dashoffset draw
 * this section actually uses — can measure it with getTotalLength.
 */
export function edgePath(fromId: string, toId: string) {
  const a = WIDE.pos[fromId];
  const b = WIDE.pos[toId];
  const fromY = a.top + WIDE.nodeH;
  const toY = b.top;
  if (a.cx === b.cx) return `M${a.cx} ${fromY} L${a.cx} ${toY}`;
  const railY = Math.round((fromY + toY) / 2);
  return `M${a.cx} ${fromY} L${a.cx} ${railY} L${b.cx} ${railY} L${b.cx} ${toY}`;
}

/** Nodes grouped by tier — the stacked mobile rendering walks this. */
export function tiers() {
  const out: ChainNode[][] = [];
  CHAIN_NODES.forEach((n) => {
    (out[n.tier - 1] ??= []).push(n);
  });
  return out.filter(Boolean);
}
