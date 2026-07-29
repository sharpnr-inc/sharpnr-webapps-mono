/*
 * Industries — the roadmap, as one list.
 *
 * The single most important fact on this page is that exactly one industry
 * experience exists today. Everything else is being designed. That fact is
 * held here, once, and every part of the page reads it from here: the rail
 * in the hero, the status chip on each section header, the order the
 * sections appear in.
 *
 * Names are the ones the page indexes on, so they are written the way they
 * should be found and are never abbreviated.
 *
 * `lines` exists because the hero rail sets each name inside a 112-unit
 * column: SVG has no text wrapping, so a two-word name that would overflow
 * carries its own break rather than being shrunk or truncated.
 */

export type IndustryStatus = "available" | "design";

export interface IndustryEntry {
  id: string;
  name: string;
  /** The name broken for the hero rail's narrow columns. */
  lines: readonly string[];
  status: IndustryStatus;
}

export const INDUSTRIES: readonly IndustryEntry[] = [
  {
    id: "hospitality",
    name: "Hospitality",
    lines: ["Hospitality"],
    status: "available",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    lines: ["Healthcare"],
    status: "design",
  },
  {
    id: "technology",
    name: "Technology & Enterprise",
    lines: ["Technology &", "Enterprise"],
    status: "design",
  },
  {
    id: "commerce",
    name: "Digital Commerce",
    lines: ["Digital", "Commerce"],
    status: "design",
  },
  { id: "education", name: "Education", lines: ["Education"], status: "design" },
  {
    id: "professional",
    name: "Professional Services",
    lines: ["Professional", "Services"],
    status: "design",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    lines: ["Manufacturing"],
    status: "design",
  },
  { id: "retail", name: "Retail", lines: ["Retail"], status: "design" },
] as const;

/*
 * "Available now" and "In design" — not "Coming soon" and not "Roadmap".
 *
 * "In design" is the honest word: these are not built, not in beta and not
 * dated. Nothing on this page may read as though an unfinished experience
 * can be bought today.
 */
export const STATUS_LABEL: Record<IndustryStatus, string> = {
  available: "Available now",
  design: "In design",
};

/** The same two words, set for the rail's mono type. */
export const STATUS_SHORT: Record<IndustryStatus, string> = {
  available: "AVAILABLE NOW",
  design: "IN DESIGN",
};
