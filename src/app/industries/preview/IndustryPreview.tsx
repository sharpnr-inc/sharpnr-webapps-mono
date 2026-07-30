import { useRef } from "react";
import { DualHeading } from "../DualHeading";
import { IndustryGlyph } from "../glyphs";
import { IndustryMotif } from "../motifs";
import { StatusChip } from "../StatusChip";
import { CategoryTicker } from "./CategoryTicker";
import { FlowDiagram } from "./FlowDiagram";
import type { IndustryPreviewData } from "./previews";
import { useIndustryPreviewAnimation } from "./animations/useIndustryPreviewAnimation";

/*
 * One future industry, one screen.
 *
 * Every section on this page below Hospitality is this component. That is
 * deliberate: seven differently-shaped explanations of seven things that
 * do not exist made the roadmap look like a product line. One repeated
 * shape makes it look like what it is — a plan, stated the same way seven
 * times, with the same admission in the same place each time.
 *
 * Four rules the layout obeys, all from design.md.
 *
 *   70/30, not 50/50. The flow is a five-step horizontal sequence, and at
 *   half a column those five steps cramp, the labels shrink and the runs
 *   collapse — at which point the copy has to carry the meaning again,
 *   which is the exact failure this rework exists to undo. The visual is
 *   the argument here, so the visual gets the majority of the width. The
 *   30% column is a hard constraint on the copy, not a suggestion: if
 *   something does not fit in it, the something is too long.
 *
 *   Alternate. Consecutive previews face opposite ways, so seven of them
 *   in a row read as a run rather than as seven rows of one template.
 *   `index` decides, so reordering the roadmap can never accidentally put
 *   two of the same facing side by side.
 *
 *   Outer edge. The text block sits against the outer edge of its own
 *   column, and the cap and the push are on the wrapper around heading and
 *   copy — never on the paragraph, where they give the heading and the
 *   copy different left edges.
 *
 *   Mobile stacks argument first, whichever side desktop uses. A
 *   figure-left preview that kept its DOM order on a phone would open with
 *   an unexplained diagram.
 *
 * The heading is the site's dual-colour form (design.md §4): two lines
 * through `Words`, the first the industry name verbatim and ending in a
 * comma, the second in twilight. The name being the whole of line one is
 * what keeps the string a visitor scans for, the string a search engine
 * indexes and the <h2> all the same thing.
 *
 * `weight` is the page's slope, 1 near the top and 3 at the bottom. It only
 * ever removes: less padding, a smaller heading, a slightly narrower
 * figure. Nothing is added as the page descends, and no label anywhere
 * explains that the page is getting lighter. If the hierarchy needs a
 * caption it has failed.
 */

const PAD = {
  1: "py-20 md:py-28",
  2: "py-16 md:py-24",
  3: "py-14 md:py-20",
} as const;

/* Deliberately modest for a scene heading — six words in a 30% column at
   display size wraps to four lines and stops being a heading. */
const HEADING = {
  1: "text-heading-md md:text-heading-lg",
  2: "text-heading-sm md:text-heading-md",
  3: "text-title-lg md:text-heading-sm",
} as const;

const GLYPH = {
  1: "h-10 w-14",
  2: "h-9 w-12",
  3: "h-8 w-11",
} as const;

export function IndustryPreview({
  data,
  index,
}: {
  data: IndustryPreviewData;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useIndustryPreviewAnimation({ sectionRef, headRef, figureRef });

  const { weight } = data;
  /* Even previews put the figure on the left, odd on the right. Which side
     the run starts on matters far less than never repeating a facing. */
  const figureLeft = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className={`relative isolate scroll-mt-24 overflow-hidden border-t border-white/[0.07] ${PAD[weight]}`}
      aria-labelledby={`${data.id}-heading`}
    >
      {/* The room this industry happens in. Strokes on transparent, held
          at the opacity of the hero field, bleeding off the outer edge
          behind the copy column — never behind the flow diagram, which it
          would compete with. `overflow-hidden` above is what guarantees it
          can never widen the page. */}
      <IndustryMotif
        id={data.id}
        className={`pointer-events-none absolute top-1/2 -z-10 hidden h-auto w-[36rem] -translate-y-1/2 opacity-[0.07] lg:block ${
          figureLeft ? "-right-24" : "-left-24"
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:pl-20">
        {/* Where this sector meets the datum. One tick, at the section's
            own middle, reaching from the spine to the content edge —
            drawn, not animated, because the spine's scrub is the only
            motion this hand-off is allowed to have. */}
        <span
          className="absolute left-8 top-1/2 hidden h-px w-12 bg-cyan/25 lg:block"
          aria-hidden="true"
        />

        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            figureLeft
              ? "lg:grid-cols-[3fr_2fr]"
              : "lg:grid-cols-[2fr_3fr]"
          }`}
        >
          {/* The argument. First in the flow on every width; on desktop it
              takes whichever column this preview's turn gives it, and sits
              against that column's outer edge. */}
          <div
            ref={headRef}
            className={`order-1 w-full max-w-xl lg:max-w-none ${
              figureLeft ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <IndustryGlyph
                id={data.id}
                className={`shrink-0 opacity-70 ${GLYPH[weight]}`}
              />
              <StatusChip status="design" />
            </div>

            <DualHeading
              id={`${data.id}-heading`}
              lead={`${data.name},`}
              tail={data.tail}
              className={`mt-6 ${HEADING[weight]}`}
            />

            <p className="mt-5 text-sm leading-relaxed text-mute">
              {data.intro}
            </p>
          </div>

          <div
            className={`order-2 w-full ${
              figureLeft ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div ref={figureRef}>
              <FlowDiagram
                id={data.id}
                kicker={data.flowKicker}
                stages={data.stages}
                capKicker="DESIGNED AROUND"
                capabilities={data.capabilities}
                label={`${data.name}: ${data.stages.join(", then ")} — one connected flow, designed around ${data.capabilities.join(", ")}.`}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Who it is being designed for, running.

          Bare nouns, never a verb — the section is already marked "In
          design", and "Hospitals · Clinics" is a statement of intended
          market where "we support hospitals" would be a claim. Full-bleed
          within the section band, travelling with the section's own
          direction. */}
      <CategoryTicker
        categories={data.categories}
        direction={figureLeft ? "ltr" : "rtl"}
        label={`${data.name} — segments this experience is being designed for`}
      />
    </section>
  );
}
