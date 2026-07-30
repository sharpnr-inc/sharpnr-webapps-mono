/*
 * A single industry glyph, on a stage of its own.
 *
 * The drawings themselves are `./glyph-shapes` and the map from industry id
 * to drawing is `./glyph-registry`; this file only supplies the `<svg>` a
 * standalone glyph needs. Callers inside an existing `<svg>` — the hero
 * rail in `./diagrams` — take the fragment from the registry directly and
 * skip this wrapper.
 */
import { INDUSTRY_GLYPH } from "./glyph-registry";

/** The shared stage. Nothing may be drawn outside 4 → 60 by 4 → 40. */
export const GLYPH_VIEWBOX = "0 0 64 44";

/**
 * A glyph on its own, for a section header.
 *
 * Decorative by definition — the industry name always sits beside it as
 * real text, so the glyph is hidden from assistive technology rather than
 * given a label that would be read out twice.
 */
export function IndustryGlyph({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const Glyph = INDUSTRY_GLYPH[id];
  if (!Glyph) return null;
  return (
    <svg
      viewBox={GLYPH_VIEWBOX}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <Glyph />
    </svg>
  );
}
