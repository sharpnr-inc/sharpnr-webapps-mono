import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useRetailAnimation } from "./animations/useRetailAnimation";

/* Retail follows the movement of a product. */
const productFlow = [
  "Supplier delivers",
  "Warehouse receives",
  "Shelf is stocked",
  "Customer purchases",
  "Stock & books update",
  "IVA flags slow movers",
] as const;

const plannedAreas = [
  "Store operations across locations",
  "Fast, flexible point of sale",
  "Real-time inventory everywhere",
  "Warehouse & transfers",
  "Procurement & replenishment",
  "Pricing & promotions",
  "Customer loyalty through Sharp CRMS",
  "Store teams through Sharp HRMS",
] as const;

/**
 * Section 04 — Retail (roadmap). The journey follows the product:
 * from supplier to shelf to customer to tomorrow's decision.
 */
export function RetailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useRetailAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <div className="mb-5 flex items-center gap-3">
            <StatusBadge kind="roadmap" />
            <span className="text-sm text-slate-500">
              Sharp Operations · Retail
            </span>
          </div>
          <SectionIntro
            heading={
              <>
                Retail moves fast.
                <br />
                Your platform should move faster.
              </>
            }
            lede="Products arrive, shelves are stocked, purchases happen, suppliers replenish — and every sale changes tomorrow's decisions. Retail is being designed to keep that entire movement connected."
          />
        </div>

        {/* The product's journey — horizontal band */}
        <ol className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3">
          {productFlow.map((step, i) => (
            <li key={step} className="retail-step flex items-center gap-3">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                {step}
              </span>
              {i < productFlow.length - 1 && (
                <span className="hidden h-px w-5 bg-slate-300 sm:block" />
              )}
            </li>
          ))}
        </ol>

        <ul className="mt-12 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {plannedAreas.map((area) => (
            <li key={area} className="retail-area border-l-2 border-slate-200 pl-4 text-sm text-slate-600">
              {area}
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-500">
          Designed for retail stores, multi-store chains, supermarkets,
          fashion, electronics, furniture, pharmacies, convenience stores and
          omnichannel retail.
        </p>
      </div>
    </section>
  );
}
