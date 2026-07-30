import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useWorldAnimation } from "./animations/useWorldAnimation";

/**
 * Section 02 — The world we see. The observation that led to
 * Sharpnr: businesses became connected; their software didn't.
 */
export function WorldSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useWorldAnimation({ sectionRef, bodyRef });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="hp-section relative scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={bodyRef} className="mx-auto max-w-2xl">
          <SectionIntro
            tone="navy"
            eyebrow="The world we see"
            heading={
              <>
                A business works together,
                <br />
                <span className="text-twilight">its software rarely does.</span>
              </>
            }
            lede="The books depend on what the team did today. What the team did depends on who turned up. Nothing in a business happens on its own."
          />

          <div className="mt-8 space-y-5 text-base leading-relaxed text-mute">
            <p>
              Software, though, is sold by department. One tool for the books,
              another for the team, another for customers. Each solved its own
              problem and none solved the one between them.
            </p>
            <p>
              So things get copied across. The same job gets done twice. People
              spend their week retyping instead of doing the work they bought
              the software for.
            </p>
            <p>
              The answer was never more software. It was software that already
              knew what the rest of it was doing.
            </p>
          </div>

          {/* The idea, in one line */}
          <blockquote className="world-quote my-14 border-l-2 border-cyan pl-6">
            <p className="text-heading-sm font-bold text-white md:text-heading-md">
              Business is already connected.
              <br />
              Software should be too.
            </p>
          </blockquote>

          <div className="space-y-5 text-base leading-relaxed text-mute">
            <p>
              Nobody starts a business to maintain software. They start one to
              look after customers, pay a team well and make decisions they can
              stand behind.
            </p>
            <p>
              Software should sit quietly underneath all of that, not become
              another thing to manage. That is what we are building.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
