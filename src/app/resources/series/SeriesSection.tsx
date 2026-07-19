import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useSeriesAnimation } from "./animations/useSeriesAnimation";

const series = [
  {
    name: "Inside Sharpnr",
    line: "Behind the platform — product decisions, philosophy and the journey of building it.",
  },
  {
    name: "Field Notes",
    line: "Lessons from real businesses: operational challenges, observations and ideas worth sharing.",
  },
  {
    name: "Blueprints",
    line: "Processes, playbooks and frameworks for building better organizations — made for immediate use.",
  },
  {
    name: "Perspectives",
    line: "Essays on leadership, technology, design and the future of connected businesses.",
  },
  {
    name: "Engineering Journal",
    line: "Architecture, performance, reliability and platform design — for builders who enjoy how products evolve.",
  },
  {
    name: "Design Notebook",
    line: "Interaction design, visual systems, accessibility and everything that shapes how Sharpnr feels.",
  },
] as const;

/**
 * Section 04 — Editorial series. Long-running conversations, not
 * one-time posts. Every new publication becomes another chapter.
 */
export function SeriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useSeriesAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Series"
            heading="Follow ideas that keep evolving."
            lede="Some ideas can't be explained in one article, and some conversations never really end. Every series grows over time — each new chapter building on the last."
          />
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((s) => (
            <div
              key={s.name}
              className="series-cover flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-blue/50"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">
                  Series
                </p>
                <h3 className="mt-3 text-title-lg font-semibold text-navy">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.line}
                </p>
              </div>
              <p className="mt-6 text-xs text-slate-400">
                First chapters in progress
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
