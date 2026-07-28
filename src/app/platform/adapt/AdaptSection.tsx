import { useRef, useState } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useAdaptAnimation } from "./animations/useAdaptAnimation";

const industries = [
  {
    name: "Hospitality",
    status: "available" as const,
    workflows: ["Reservations", "Tables & rooms", "Kitchen orders", "Guest billing"],
  },
  {
    name: "Healthcare",
    status: "soon" as const,
    workflows: ["Appointments", "Patient records", "Pharmacy", "Billing & insurance"],
  },
  {
    name: "Retail",
    status: "roadmap" as const,
    workflows: ["Point of sale", "Inventory", "Procurement", "Loyalty"],
  },
  {
    name: "Education",
    status: "roadmap" as const,
    workflows: ["Admissions", "Classes", "Examinations", "Fees"],
  },
  {
    name: "Manufacturing",
    status: "roadmap" as const,
    workflows: ["Production", "Quality", "Warehouse", "Dispatch"],
  },
] as const;

const foundation = ["Finance", "People", "Customers", "Identity", "Governance"];

/**
 * Section 03 — One platform. Different businesses.
 * Switch industries and watch the operational experience transform
 * while the foundation underneath never changes. The transition is
 * the message.
 */
export function AdaptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const workflowsRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const industry = industries[active];

  const { switchTo } = useAdaptAnimation({ sectionRef, introRef, workflowsRef });

  const handleSelect = (i: number) => {
    if (i === active) return;
    switchTo(() => setActive(i));
  };

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            align="center"
            eyebrow="One platform. Different businesses."
            heading={
              <>
                Different businesses.
                <br />
                One connected foundation.
              </>
            }
            lede="Every industry has unique operational needs, but finance, people, communication and data remain universal. Sharpnr adapts the experience — the foundation underneath never changes."
          />
        </div>

        {/* Industry selector */}
        <div className="mt-14 flex flex-wrap justify-center gap-2.5">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              type="button"
              onClick={() => handleSelect(i)}
              aria-pressed={i === active}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                i === active
                  ? "border-cyan/55 bg-cyan/10 text-white"
                  : "border-sky/15 bg-sky/[0.025] text-mute hover:border-sky/30 hover:text-white"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* The adaptive workspace */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl border border-sky/15 bg-sky/[0.025]">
          {/* Operational experience — transforms with the industry */}
          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-mute/70">
                Operational experience
              </p>
              <StatusBadge tone="navy" kind={industry.status} />
            </div>
            <ul
              ref={workflowsRef}
              className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {industry.workflows.map((w) => (
                <li
                  key={w}
                  className="rounded-lg border border-sky/12 bg-sky/[0.035] px-3 py-4 text-center text-sm font-medium text-white/85"
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* The foundation — never changes */}
          <div className="border-t border-sky/15 bg-sky/[0.045] px-6 py-6 md:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
              The foundation — shared by every industry
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {foundation.map((f) => (
                <li key={f} className="text-sm font-medium text-white/85">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Availability — always transparent */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-8 text-sm sm:grid-cols-3">
          <div>
            <StatusBadge tone="navy" kind="available" />
            <p className="mt-3 text-mute">Hospitality</p>
          </div>
          <div>
            <StatusBadge tone="navy" kind="soon" />
            <p className="mt-3 text-mute">Healthcare (Lifco)</p>
          </div>
          <div>
            <StatusBadge tone="navy" kind="roadmap" label="Planned expansion" />
            <p className="mt-3 text-mute">
              Retail, education, manufacturing, professional services and more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
