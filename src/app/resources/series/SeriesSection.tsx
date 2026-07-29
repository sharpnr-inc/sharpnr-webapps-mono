import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import {
  BlueprintsDiagram,
  DesignDiagram,
  EngineeringDiagram,
  FieldNotesDiagram,
  InsideDiagram,
  PerspectivesDiagram,
} from "../diagrams";
import { useSeriesAnimation } from "./animations/useSeriesAnimation";

const series = [
  {
    name: "Inside Sharpnr",
    line: "Behind the platform — product decisions, philosophy and the journey of building it.",
    diagram: InsideDiagram,
  },
  {
    name: "Field Notes",
    line: "Lessons from real businesses: operational challenges, observations and ideas worth sharing.",
    diagram: FieldNotesDiagram,
  },
  {
    name: "Blueprints",
    line: "Processes, playbooks and frameworks for building better organizations — made for immediate use.",
    diagram: BlueprintsDiagram,
  },
  {
    name: "Perspectives",
    line: "Essays on leadership, technology, design and the future of connected businesses.",
    diagram: PerspectivesDiagram,
  },
  {
    name: "Engineering Journal",
    line: "Architecture, performance, reliability and platform design — for builders who enjoy how products evolve.",
    diagram: EngineeringDiagram,
  },
  {
    name: "Design Notebook",
    line: "Interaction design, visual systems, accessibility and everything that shapes how Sharpnr feels.",
    diagram: DesignDiagram,
  },
] as const;

/**
 * Section 04 — Editorial series. Long-running conversations, not
 * one-time posts. Every new publication becomes another chapter.
 *
 * Left-aligned like Explore and the Library above it. It used to be
 * centred, which put a centred section in the middle of the page and then
 * went back to a left-aligned one below — the centring belongs to the
 * closing sections, so the page settles once rather than twice.
 *
 * The cards called themselves covers and drew nothing, so six of them read
 * as six paragraphs. Each now carries the diagram for its series — see
 * `../diagrams`.
 */
export function SeriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useSeriesAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            eyebrow="Series"
            heading={
              <>
                Some ideas,
                <br />
                <span className="text-twilight">need more than one go.</span>
              </>
            }
            lede="A few things can't be said in one article. These run on, a chapter at a time."
          />
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((s) => {
            const Diagram = s.diagram;
            return (
              <div
                key={s.name}
                className="series-cover flex flex-col justify-between gap-5 rounded-xl border border-sky/15 bg-sky/[0.025] p-5 transition-colors duration-200 hover:border-sky/30 hover:bg-sky/[0.05] md:p-6"
              >
                <Diagram />
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-cyan/60">
                    Series
                  </p>
                  <h3 className="mt-3 text-title-lg font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {s.line}
                  </p>
                  <p className="mt-5 text-xs text-mute/70">
                    First chapters in progress
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
