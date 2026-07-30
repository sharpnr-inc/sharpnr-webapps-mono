/*
 * Scene 04 data — one action and everything it sets off.
 *
 * Merges what used to be two scenes making the same claim ("everything
 * reaches what needs it" / "everything connects automatically"). Reach and
 * automation are the same idea, so they get one scene and one visual: a
 * single event travelling forward, throwing off consequences as it goes.
 *
 * Flat and axis-aligned, in the same routed dialect as Scenes 02 and 03 —
 * the isometric view stays exclusive to Scene 03.
 */

/** Where the spine sits vertically, % of the field. */
export const SPINE_Y = 50;
/** The action enters here and runs to the right edge. */
export const SPINE_X = 5;
export const SPINE_LEN = 90;

export interface Consequence {
  /** Junction on the spine, % of the field. Spacing is deliberately
   * uneven — evenly spaced events read as a diagram, uneven ones read as
   * things that actually happened. */
  x: number;
  side: "up" | "down";
  /** Stem length. Kept short so the eye stays on the spine. */
  drop: number;
  label: string;
  /** The system that handled it, in silkscreen. */
  owner: string;
  /** 1 = the consequence that matters most, 3 = a quiet downstream effect.
   * Drives node size and glow, so the row has hierarchy rather than five
   * equally-shouting outcomes. */
  weight: 1 | 2 | 3;
}

export const CONSEQUENCES: Consequence[] = [
  { x: 17, side: "up", drop: 19, label: "Stock adjusted", owner: "INVENTORY", weight: 2 },
  { x: 30, side: "down", drop: 16, label: "Invoice raised", owner: "ACCOUNTING", weight: 2 },
  { x: 53, side: "up", drop: 25, label: "Ledger updated", owner: "ACCOUNTING", weight: 1 },
  { x: 66, side: "down", drop: 15, label: "Team notified", owner: "OPERATIONS", weight: 3 },
  { x: 86, side: "up", drop: 18, label: "Forecast revised", owner: "INTELLIGENCE", weight: 3 },
];
