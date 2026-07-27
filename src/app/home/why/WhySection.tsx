import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { useWhyAnimation } from "./animations/useWhyAnimation";

/*
 * What we believe.
 *
 * A datasheet, not a card grid. Four principles as numbered rows under
 * hairline rules — the spec of one machined product rather than four
 * separate tiles. Cards would say "four features"; a datasheet says "one
 * thing, specified", which is precisely what the heading claims.
 *
 * Full-width: the alternating left/right rhythm ended at Scene 05, and the
 * closing two scenes stay centred so the page settles rather than
 * continuing to swing.
 */
const PRINCIPLES = [
  {
    name: "Designed together",
    belief: "Software should be built together, not connected afterwards.",
  },
  {
    name: "One foundation",
    belief: "Who you are means the same thing everywhere.",
  },
  {
    name: "Independent capabilities",
    belief: "Take only what you need. Nothing needs rebuilding later.",
  },
  {
    name: "Built to scale",
    belief: "Growing doesn't change how your people work.",
  },
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useWhyAnimation({ sectionRef, headingRef, copyRef, listRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 ref={headingRef} className="hp-scene-title font-extrabold text-white">
          <span className="block">
            <Words text="Designed as one," />
          </span>
          <span className="block text-twilight">
            <Words text="Not stitched together." />
          </span>
        </h2>
        <p ref={copyRef} className="hp-hero-copy mx-auto mt-6 max-w-lg text-mute">
          Built as one platform from day one.
        </p>
      </div>

      {/* Every row shares one grid template, so the three columns stay
          aligned down the whole sheet. Title and description sit side by
          side rather than stacked — stacking collapses the ledger back
          into a list. */}
      <div ref={listRef} className="mx-auto mt-14 max-w-4xl md:mt-16">
        {PRINCIPLES.map((principle, i) => (
          <div key={principle.name} className="hp-spec-row">
            <div className="hp-spec-rule" />
            <div className="grid gap-x-10 gap-y-3 sm:grid-cols-[3.5rem_13rem_1fr]">
              <span className="hp-spec-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="hp-spec-name">{principle.name}</h3>
              <p className="hp-spec-body">{principle.belief}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
