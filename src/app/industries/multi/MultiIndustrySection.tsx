import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useMultiIndustryAnimation } from "./animations/useMultiIndustryAnimation";

/* A diversified group — every division on its own experience. */
const divisions = [
  { name: "Hospitality", x: 280, y: 66 },
  { name: "Healthcare", x: 470, y: 156 },
  { name: "Retail", x: 470, y: 324 },
  { name: "Software", x: 280, y: 414 },
  { name: "Manufacturing", x: 90, y: 324 },
  { name: "Education", x: 90, y: 156 },
] as const;

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
 */
export function MultiIndustrySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useMultiIndustryAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-ice/45">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
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
          {/* Divisions orbiting one foundation */}
          <div className="flex justify-center">
            <svg
              viewBox="0 0 560 480"
              role="img"
              aria-label="Six business divisions orbiting one shared Sharpnr foundation"
              className="h-auto w-full max-w-md"
            >
              <g fill="none" stroke="#0077b6" strokeOpacity="0.35" strokeWidth="1.2">
                {divisions.map((d) => (
                  <path key={`s-${d.name}`} className="multi-spoke" d={`M${d.x} ${d.y} L280 240`} />
                ))}
              </g>
              {divisions.map((d) => (
                <g key={d.name} className="multi-node">
                  <circle cx={d.x} cy={d.y} r="9" fill="#ffffff" stroke="#0077b6" strokeOpacity="0.55" strokeWidth="1.4" />
                  <text
                    x={d.x}
                    y={d.y < 240 ? d.y - 20 : d.y + 30}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="500"
                    fill="#475569"
                  >
                    {d.name}
                  </text>
                </g>
              ))}
              <g className="multi-core">
                <circle cx="280" cy="240" r="46" fill="#03045e" />
                <text x="280" y="236" textAnchor="middle" fontSize="12" fontWeight="600" fill="#ffffff">
                  Shared
                </text>
                <text x="280" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="#ffffff">
                  foundation
                </text>
              </g>
            </svg>
          </div>

          {/* What stays shared */}
          <div>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {sharedServices.map((s) => (
                <li key={s.name} className="multi-service py-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{s.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The leadership moment */}
        <div className="multi-leadership mx-auto mt-16 max-w-2xl rounded-2xl bg-navy px-6 py-8 text-center md:px-10">
          <p className="text-sm font-medium text-cyan">
            "Show me the performance of every business this month."
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
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
