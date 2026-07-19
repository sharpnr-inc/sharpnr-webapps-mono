import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useCorporateAnimation } from "./animations/useCorporateAnimation";

const clientJourney = [
  "Client inquiry",
  "Proposal prepared",
  "Project approved",
  "Team collaborates in Cables & Folio",
  "Progress tracked in Tasks",
  "Invoice through Sharp Accounting",
  "The relationship continues",
] as const;

const ivaHelps = [
  "Summarize meetings and draft proposals",
  "Generate and review code, explain codebases",
  "Create project plans and documentation",
  "Analyze project profitability",
  "Recommend resource allocation",
  "Provision access while respecting policies",
] as const;

/**
 * Section 05 — Corporate & professional services (roadmap). For
 * organizations whose business is people, projects and knowledge.
 */
export function CorporateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useCorporateAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <div className="mb-5 flex items-center gap-3">
            <StatusBadge kind="roadmap" />
            <span className="text-sm text-slate-500">
              Sharp Operations · Corporate
            </span>
          </div>
          <SectionIntro
            heading={
              <>
                Built for teams that build businesses.
                <br />
                Connected work from proposal to delivery.
              </>
            }
            lede="Software companies, consulting firms, agencies and enterprises don't manage inventory — they manage work. Every engagement starts as a conversation and ends as delivered value. Corporate is being designed to keep that whole journey connected."
          />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* The client journey */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              One client engagement
            </p>
            <ol className="relative mt-6 space-y-5">
              <div className="absolute bottom-3 left-[5px] top-3 w-px bg-slate-200" />
              {clientJourney.map((step) => (
                <li key={step} className="corp-step relative flex items-start gap-4">
                  <span className="relative z-10 mt-1.5 block size-[11px] shrink-0 rounded-full border-2 border-blue/60 bg-white" />
                  <span className="text-sm leading-relaxed text-slate-600 md:text-base">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* IVA as a teammate */}
          <div className="rounded-2xl border border-slate-200 bg-soft p-6 md:p-8">
            <h3 className="text-title-md font-semibold text-navy">
              IVA becomes an everyday teammate.
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Not just for management — for every employee.
            </p>
            <ul className="mt-5 space-y-2.5">
              {ivaHelps.map((item) => (
                <li key={item} className="corp-iva border-l-2 border-cyan/60 pl-4 text-sm text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-slate-500">
          Designed for software companies, IT services, consulting firms,
          agencies, design studios, law firms, chartered accountants,
          recruitment agencies, research organizations and enterprises.
        </p>
      </div>
    </section>
  );
}
