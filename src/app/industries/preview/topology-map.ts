/*
 * Which sector is drawn as which shape.
 *
 * Separate from `./topologies` because that file exports the figures
 * themselves, and a module that exports both a component and a lookup table
 * cannot be hot-replaced — Vite reloads the page instead of the figure.
 *
 * The names are the argument, not decoration: a cycle closes, a spine has a
 * length and branches off it, a chain runs once and finishes. Changing an
 * entry here changes what the page claims about that industry, and the
 * animation follows, because each figure declares its `data-topology`.
 */
export type Topology =
  | "chain"
  | "spine"
  | "cycle"
  | "reverse"
  | "converge"
  | "ascent"
  | "parallel"
  | "nested";

/** Anything unlisted falls back to a chain. */
export const TOPOLOGY: Record<string, Topology> = {
  healthcare: "spine",
  retail: "cycle",
  commerce: "reverse",
  manufacturing: "converge",
  education: "ascent",
  professional: "parallel",
  technology: "nested",
};
