/**
 * Isometric projection helpers for the hero platform graphic.
 * Standard 2:1 isometric — one grid unit maps to (±S, S/2) on screen,
 * z maps straight up in pixels.
 */

export const S = 20;

export interface Pt {
  x: number;
  y: number;
}

/** Project grid coords (x, y) at height z into screen space. */
export function iso(x: number, y: number, z: number): Pt {
  return { x: (x - y) * S, y: (x + y) * S * 0.5 - z };
}

/** SVG points string from screen points. */
export function points(pts: Pt[]): string {
  return pts.map((p) => `${p.x},${p.y}`).join(" ");
}

interface BoxFaces {
  top: string;
  left: string;
  right: string;
}

/**
 * Faces of an axis-aligned box centred at (cx, cy), footprint w×d,
 * sitting on zBottom and rising h px. Visible faces in this projection:
 * top, left (y = cy + d/2) and right (x = cx + w/2).
 */
export function box(
  cx: number,
  cy: number,
  w: number,
  d: number,
  zBottom: number,
  h: number,
): BoxFaces {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = cy - d / 2;
  const y1 = cy + d / 2;
  const zt = zBottom + h;

  return {
    top: points([
      iso(x0, y0, zt),
      iso(x1, y0, zt),
      iso(x1, y1, zt),
      iso(x0, y1, zt),
    ]),
    right: points([
      iso(x1, y0, zt),
      iso(x1, y1, zt),
      iso(x1, y1, zBottom),
      iso(x1, y0, zBottom),
    ]),
    left: points([
      iso(x0, y1, zt),
      iso(x1, y1, zt),
      iso(x1, y1, zBottom),
      iso(x0, y1, zBottom),
    ]),
  };
}
