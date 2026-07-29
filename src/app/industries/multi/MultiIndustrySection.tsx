import { useRef } from "react";
import { DualHeading } from "../DualHeading";
import { MultiIndustryDiagram } from "../diagrams";
import { useMultiIndustryAnimation } from "./animations/useMultiIndustryAnimation";

const sharedServices = [
  { name: "One accounting platform" },
  { name: "One workforce" },
  { name: "One identity" },
  { name: "One communication platform" },
  { name: "One knowledge foundation" },
  { name: "One business assistant" },
  { name: "One business network" },
] as const;

/**
 * Section 08 — Multi-industry organizations. Businesses stay
 * autonomous; leadership stays connected.
 *
 * Third and last of the page's splits, so it faces back the other way from
 * Corporate: what stays shared on the left, the diagram on the right. The
 * page settles into a centred finale after this.
 */
export function MultiIndustrySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useMultiIndustryAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        {/* The page turns centred here and stays centred to the footer.
            The alternation belonged to the roadmap run; once a page starts
            centring it should not swing back, or the finale reads as one
            more entry rather than as the close. */}
        <div
          ref={introRef}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-twilight sm:text-[0.6875rem] sm:tracking-[0.3em]">
            Multi-industry organizations
          </p>
          <DualHeading
            lead="One organization,"
            tail="every business connected."
            className="mt-5 text-heading-lg md:text-heading-xl"
          />
          <p className="mt-5 text-body-lg text-mute">
            A hospitality group may also own hospitals. A retail company may
            run factories. Traditional software forces these organizations
            into separate systems — Sharpnr connects them.
          </p>
        </div>

        <div className="mx-auto mt-14 flex max-w-md justify-center">
          <MultiIndustryDiagram />
        </div>

        {/* What stays shared. Names only — each one's explanation was a
            sentence saying the name again, and the diagram above has
            already made the structural claim. */}
        <ul className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3">
          {sharedServices.map((s) => (
            <li
              key={s.name}
              className="multi-service font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-sky/70"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
