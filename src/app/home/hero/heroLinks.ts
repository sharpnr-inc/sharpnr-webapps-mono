/*
 * A handful of words that occasionally send a pulse to the mark at the
 * centre — never to each other. The hero's story is convergence *toward*
 * Sharpnr, so every line that appears has to resolve there; a line between
 * two unrelated words would flash without ever explaining itself. Shared
 * between the visual (which renders the placeholder paths) and the
 * animation hook (which drives them).
 */
/* Every entry must match a `label` in HeroVisual's WORDS — the animation
   looks each one up by `data-label` and silently skips a miss, so a stale
   name here disappears without erroring. Two per cluster. */
export const HERO_SPOKES: string[] = [
  "Identity",
  "Security",
  "Marketplace",
  "Operations",
  "Data",
  "Automation",
];
