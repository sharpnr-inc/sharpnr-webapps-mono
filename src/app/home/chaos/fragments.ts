/*
 * Scene 02 data — the board, before Sharpnr.
 *
 * Deliberately the same engineering dialect as Scene 03: named parts,
 * silkscreen designators, routed 90° traces. The difference is that every
 * run here is severed, and the parts sit flat and slightly out of true
 * rather than assembled on a board. The problem and the solution speak the
 * same language, which is what makes the turn in Scene 03 land.
 */

export interface Part {
  label: string;
  /** Flat board coordinates, % of the field. Deliberately off a grid —
   * disconnected software never arranges itself neatly. */
  x: number;
  y: number;
  /** Size carries weight: the systems a business leans on are bigger. */
  w: number;
  h: number;
  /** The part's state, printed beside it. Never an API error — a business
   * owner reads "ISOLATED", not "SCHEMA_MISMATCH". */
  state: string;
}

export const PARTS: Part[] = [
  { label: "CRM", x: 1, y: 4.7, w: 27, h: 14.1, state: "ISOLATED" },
  { label: "Accounting", x: 57, y: 1.2, w: 41, h: 15.3, state: "NO SHARED DATA" },
  { label: "Operations", x: 6, y: 44.7, w: 34, h: 15.3, state: "MANUAL" },
  { label: "Inventory", x: 63, y: 38.8, w: 31, h: 14.1, state: "LOCAL ONLY" },
  { label: "Payroll", x: 17, y: 84.7, w: 22, h: 12.9, state: "SEPARATE" },
  { label: "Support", x: 58, y: 80, w: 33, h: 15.3, state: "UNLINKED" },
];

export interface Link {
  /** Start of the run, % of the field. */
  x: number;
  y: number;
  /** The span this run *would* have covered had it completed. */
  len: number;
  dir: "h" | "v";
}

/**
 * Each link is authored as the full run it was meant to be. The component
 * draws two stubs with a wide gap between them — the shape of a connection
 * that was intended and never made.
 */
export const LINKS: Link[] = [
  { x: 28, y: 11.8, len: 29, dir: "h" }, // CRM ↔ Accounting
  { x: 14, y: 18.8, len: 25.9, dir: "v" }, // CRM ↔ Operations
  { x: 40, y: 51.8, len: 23, dir: "h" }, // Operations ↔ Inventory
  { x: 79, y: 17.6, len: 21.2, dir: "v" }, // Accounting ↔ Inventory
  { x: 26, y: 60, len: 24.7, dir: "v" }, // Operations ↔ Payroll
  { x: 39, y: 90.6, len: 19, dir: "h" }, // Payroll ↔ Support
  { x: 76, y: 52.9, len: 27.1, dir: "v" }, // Inventory ↔ Support
];

/** How much of a run each stub covers. The remaining 40% is the gap —
 * wide enough that the failure is unmissable at a glance. */
export const STUB = 0.3;
