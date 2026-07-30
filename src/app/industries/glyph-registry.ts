/*
 * Which glyph belongs to which industry.
 *
 * A module of its own because the two callers want different things from
 * it: `./glyphs` wraps one glyph in its own stage for a section header,
 * while `./diagrams` translates all eight onto the hero rail inside an
 * `<svg>` it already owns. Both need the lookup; neither wants the other's
 * wrapper.
 *
 * Keeping the map out of `./glyph-shapes` is also what lets that file
 * export nothing but components, so Vite can hot-replace a glyph while you
 * are drawing it.
 */
import type { ReactNode } from "react";

import {
  Commerce,
  Education,
  Healthcare,
  Hospitality,
  Manufacturing,
  Professional,
  Retail,
  Technology,
} from "./glyph-shapes";

/** Keyed by `IndustryEntry.id`. */
export const INDUSTRY_GLYPH: Record<string, () => ReactNode> = {
  hospitality: Hospitality,
  healthcare: Healthcare,
  technology: Technology,
  commerce: Commerce,
  education: Education,
  professional: Professional,
  manufacturing: Manufacturing,
  retail: Retail,
};
