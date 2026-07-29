import { Words } from "@/app/home/shared/Words";

/*
 * The site's heading form, as one component (design.md §4).
 *
 * Two lines, the first ending in a comma and the second set in twilight,
 * six words at the outside, and always through `Words` so every heading on
 * the page animates through the one shared reveal in `choreography.ts`.
 * A heading written as a plain string sits perfectly still while every
 * other heading around it moves, which is more noticeable than no motion
 * at all.
 *
 * The dual colour is the part that is easy to treat as decoration and is
 * not: it is what makes a heading recognisably this site's rather than any
 * dark SaaS page's. It applies to sub-section headings too, not only the
 * one at the top of a scene.
 *
 * The `.ind-heading` hook is what `./headings` finds. A heading that
 * renders through this component is animated automatically; one that does
 * not, is not — which is the intended pressure.
 */

const SIZE = {
  h2: "text-heading-lg md:text-heading-xl",
  h3: "text-heading-sm md:text-heading-md",
} as const;

export function DualHeading({
  as = "h2",
  lead,
  tail,
  id,
  className = "",
}: {
  as?: "h2" | "h3";
  /** Line one. Ends with a comma — never a period. */
  lead: string;
  /** Line two, in twilight. */
  tail: string;
  id?: string;
  className?: string;
}) {
  const Tag = as;
  return (
    <Tag
      id={id}
      className={`ind-heading font-extrabold text-white ${className || SIZE[as]}`}
    >
      <span className="ind-heading-1 block">
        <Words text={lead} />
      </span>
      <span className="ind-heading-2 block text-twilight">
        <Words text={tail} />
      </span>
    </Tag>
  );
}
