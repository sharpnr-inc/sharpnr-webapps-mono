import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useManufacturingAnimation } from "./animations/useManufacturingAnimation";

const productionChain = [
  { stage: "Raw materials received", note: "Suppliers connected through Sharp Marketplace." },
  { stage: "Production planned", note: "Schedules, orders and materials in one plan." },
  { stage: "Manufacturing begins", note: "Work orders and progress tracked on the floor." },
  { stage: "Quality inspected", note: "Checkpoints and corrective actions, recorded." },
  { stage: "Finished goods stored", note: "Warehouses and stock movement stay current." },
  { stage: "Order fulfilled", note: "Dispatch, invoicing and accounting update together." },
] as const;

const plannedAreas = [
  "Production planning",
  "Bill of materials",
  "Shop floor operations",
  "Inventory & warehousing",
  "Quality control",
  "Preventive maintenance",
  "Dispatch & logistics",
  "Efficiency insights from IVA",
] as const;

/**
 * Section 07 — Manufacturing (roadmap). A chain of connected
 * activities from raw material to finished product.
 *
 * Full width: a chain of six stages is a run, not a pair of columns.
 */
export function ManufacturingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useManufacturingAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <div className="mb-5 flex items-center gap-3">
            <StatusBadge kind="roadmap" tone="navy" />
            <span className="text-sm text-mute">
              Sharp Operations · Manufacturing
            </span>
          </div>
          <SectionIntro
            tone="navy"
            heading={
              <>
                Built for production.
                <br />
                Connected from raw material to finished product.
              </>
            }
            lede="Manufacturing is a chain of connected activities — every stage depends on the one before it. Manufacturing is being designed to keep the entire production journey connected."
          />
        </div>

        {/* The production chain — stepped rows */}
        <ol className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {productionChain.map((step, i) => (
            <li key={step.stage} className="mfg-step border-t border-sky/15 pt-5">
              <p className="font-mono text-xs tracking-[0.22em] text-cyan/60">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold text-white">
                {step.stage}
              </h3>
              <p className="mt-1 text-sm text-mute">{step.note}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
            Being designed
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {plannedAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-sky/15 bg-sky/[0.025] px-3.5 py-1.5 text-sm text-sky/85"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-mute">
          Designed for discrete and process manufacturing, automotive,
          electronics, consumer goods, food processing, textiles, furniture,
          chemicals, pharmaceuticals and multi-plant enterprises.
        </p>
      </div>
    </section>
  );
}
