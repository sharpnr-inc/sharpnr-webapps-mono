import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { MultiIndustryDiagram } from "../diagrams";
import { useMultiIndustryAnimation } from "./animations/useMultiIndustryAnimation";

const sharedServices = [
  { name: "One accounting platform", line: "Financial reporting across every legal entity, consolidated when needed." },
  { name: "One workforce", line: "People, payroll and performance — centralized, per-business when required." },
  { name: "One identity", line: "Every employee reaches exactly what they're authorized to use." },
  { name: "One communication platform", line: "Teams collaborate securely across companies." },
  { name: "One knowledge foundation", line: "Every business contributes to a connected understanding." },
  { name: "One business assistant", line: "IVA answers for the whole organization — not one company." },
  { name: "One business network", line: "Procurement and partnerships connected through Sharp Marketplace." },
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
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            eyebrow="Multi-industry organizations"
            heading={
              <>
                One organization.
                <br />
                Every business connected.
              </>
            }
            lede="A hospitality group may also own hospitals. A retail company may run factories. Traditional software forces these organizations into separate systems — Sharpnr connects them."
          />
        </div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* What stays shared — the argument, first on mobile and left on desktop */}
          <div>
            <ul className="divide-y divide-sky/12 border-y border-sky/12">
              {sharedServices.map((s) => (
                <li key={s.name} className="multi-service py-4">
                  <h3 className="text-base font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-mute">{s.line}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions, each still its own enclosure, wired to one core.
              Held against the outer edge of its own column on desktop, like
              every other block in a 50/50 — centred, it left a band of dead
              space at the page margin. */}
          <div className="flex justify-center lg:justify-end">
            <MultiIndustryDiagram />
          </div>
        </div>

        {/* The leadership moment */}
        <div className="multi-leadership mx-auto mt-16 max-w-2xl rounded-2xl border border-sky/15 bg-sky/[0.025] px-6 py-8 text-center md:px-10">
          <p className="text-sm font-medium text-cyan">
            &ldquo;Show me the performance of every business this month.&rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            Hospitality, healthcare, retail, software and manufacturing —
            consolidated performance, operational highlights and recommended
            actions. Leadership gains one connected view of the entire
            organization.
          </p>
        </div>
      </div>
    </section>
  );
}
