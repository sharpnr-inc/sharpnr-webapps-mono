
/** Substrate depth. The lake is sunk below the board, not another app. */
export const SUBSTRATE_Z = -88;

export interface BoardNode {
  label: string;
  /** Centre on the board, % of the stage edge. Deliberately off a perfect
   * grid — mathematically mirrored layouts read as decoration. */
  cx: number;
  cy: number;
  /** Footprint, px. Size carries rank: foundation services are large,
   * supporting ones small. */
  w: number;
  h: number;
  /** Prism height, px. Kept low against the footprint so each block reads
   * as a machined slab rather than a brick. */
  depth: number;
  z: number;
  variant?: "hub" | "core" | "lake";
  /**
   * Package type. A real board is populated with different components, not
   * one shape scaled up and down — an IC carries a pin-1 notch and a
   * silkscreen outline, a connector is ribbed, a passive is a plain chip
   * with end terminations and no corner pads at all. Without this every
   * block is the same extrusion and the whole thing reads as generated.
   */
  part?: "ic" | "connector" | "passive";
  /** Permanent silkscreen label. Only the foundation modules carry one;
   * everything else stays clean until hovered. */
  silk?: boolean;
  anchor?: boolean;
}

export const NODES: BoardNode[] = [
  // Largest — the processor everything else is built on
  { label: "Sharpnr", silk: true, cx: 48, cy: 47, w: 132, h: 92, depth: 26, z: 0, variant: "hub", anchor: true },
  // Large — foundation services
  { label: "Accounting", silk: true, cx: 84, cy: 31, w: 104, h: 54, depth: 15, z: 0, part: "ic" },
  { label: "Operations", silk: true, cx: 54, cy: 87, w: 104, h: 64, depth: 15, z: 0, part: "ic" },
  { label: "Marketplace", silk: true, cx: 13, cy: 71, w: 112, h: 48, depth: 13, z: 0, part: "connector" },
  // Medium — supporting applications
  { label: "CRM", silk: true, cx: 45, cy: 11, w: 62, h: 46, depth: 12, z: 0, part: "ic" },
  { label: "Communication", silk: true, cx: 88, cy: 68, w: 124, h: 58, depth: 10, z: 0, part: "connector" },
  { label: "HRMS", silk: true, cx: 11, cy: 33, w: 74, h: 50, depth: 12, z: 0, part: "ic" },
  // Small — specialised
  { label: "IAM", silk: true, cx: 22, cy: 9, w: 56, h: 34, depth: 7, z: 0, part: "passive" },
  // The substrate. Data Lake is a physical destination sitting under the
  // hub at the foot of the drop line, not a label floating in the void —
  // it is the bedrock of the board and has to look like it carries weight.
  { label: "Data Lake", silk: true, cx: 50, cy: 86, w: 104, h: 56, depth: 10, z: SUBSTRATE_Z, variant: "lake", anchor: true },
  { label: "Analytics", silk: true, cx: 18, cy: 92, w: 92, h: 38, depth: 10, z: SUBSTRATE_Z, variant: "core" },
  { label: "Intelligence", silk: true, cx: 80, cy: 92, w: 104, h: 42, depth: 10, z: SUBSTRATE_Z, variant: "core" },
];

export interface TraceSeg {
  x: number;
  y: number;
  len: number;
  dir: "h" | "v";
  z: number;
  /** Routing width in px — mixed gauges, as on a real board. */
  w?: number;
  dim?: boolean;
}

export interface Via {
  x: number;
  y: number;
  z: number;
}

/**
 * Real relationships, not a hub and spoke. Every application reaches
 * Sharpnr, and the ones that genuinely exchange data are routed to each
 * other directly. Every run is axis-aligned; an L is two runs meeting at
 * a via, so the geometry stays strictly 90°.
 */
export const TRACES: TraceSeg[] = [
  // ── The ring ──
  // Every application sits on one shared loop, so any of them can reach
  // any other without passing through the middle. This is what makes the
  // board read as interconnected rather than hub-and-spoke: the radials
  // below are orchestration, not the only route between two apps.
  { x: 4, y: 4, len: 92, dir: "h", z: 0, w: 2 },
  { x: 96, y: 4, len: 90, dir: "v", z: 0, w: 2 },
  { x: 4, y: 94, len: 92, dir: "h", z: 0, w: 2 },
  { x: 4, y: 4, len: 90, dir: "v", z: 0, w: 2 },

  // ── Stubs: each application onto the ring ──
  { x: 45, y: 4, len: 7, dir: "v", z: 0, w: 1, dim: true }, // CRM
  { x: 22, y: 4, len: 5, dir: "v", z: 0, w: 1, dim: true }, // IAM
  { x: 4, y: 33, len: 7, dir: "h", z: 0, w: 1, dim: true }, // HRMS
  { x: 84, y: 31, len: 12, dir: "h", z: 0, w: 1, dim: true }, // Accounting
  { x: 88, y: 68, len: 8, dir: "h", z: 0, w: 1, dim: true }, // Communication
  { x: 4, y: 71, len: 9, dir: "h", z: 0, w: 1, dim: true }, // Marketplace
  { x: 54, y: 87, len: 7, dir: "v", z: 0, w: 1, dim: true }, // Operations

  // ── Radials: orchestration through the hub (heaviest gauge) ──
  { x: 45, y: 11, len: 36, dir: "v", z: 0, w: 3 },
  { x: 11, y: 47, len: 37, dir: "h", z: 0, w: 3 },
  { x: 48, y: 47, len: 36, dir: "h", z: 0, w: 3 },
  { x: 54, y: 47, len: 40, dir: "v", z: 0, w: 3 },

  // ── Substrate: the lake feeding its two readers ──
  { x: 18, y: 92, len: 62, dir: "h", z: SUBSTRATE_Z, w: 2 },
];

export const VIAS: Via[] = [
  // Ring corners
  { x: 4, y: 4, z: 0 },
  { x: 96, y: 4, z: 0 },
  { x: 4, y: 94, z: 0 },
  { x: 96, y: 94, z: 0 },
  // Where each application taps the ring
  { x: 45, y: 4, z: 0 },
  { x: 22, y: 4, z: 0 },
  { x: 4, y: 33, z: 0 },
  { x: 96, y: 31, z: 0 },
  { x: 96, y: 68, z: 0 },
  { x: 4, y: 71, z: 0 },
  { x: 54, y: 94, z: 0 },
  // Hub radial junctions
  { x: 11, y: 47, z: 0 },
  { x: 84, y: 47, z: 0 },
];

export interface Leg {
  x: number;
  y: number;
  dir: "h" | "v";
  /** Signed distance in board %. */
  travel: number;
}

export interface Journey {
  legs: Leg[];
  /** Where the idea lands; flashed on arrival. */
  to: string;
}

/**
 * A charge traces a whole thought, not one hop: it leaves an application,
 * crosses the hub, and arrives somewhere that had to know. Animating
 * single segments made the board look busy without ever saying anything —
 * these read as "a sale became a ledger entry".
 */
export const JOURNEYS: Journey[] = [
  // CRM → Sharpnr → Accounting
  { to: "Accounting", legs: [
    { x: 45, y: 11, dir: "v", travel: 36 },
    { x: 48, y: 47, dir: "h", travel: 36 },
  ] },
  // Operations → Sharpnr → Data Lake
  { to: "Data Lake", legs: [
    { x: 54, y: 87, dir: "v", travel: -40 },
    { x: 48, y: 47, dir: "h", travel: 2 },
  ] },
  // Marketplace → Sharpnr → Intelligence
  { to: "Intelligence", legs: [
    { x: 11, y: 47, dir: "h", travel: 37 },
    { x: 54, y: 47, dir: "v", travel: 40 },
  ] },
];
