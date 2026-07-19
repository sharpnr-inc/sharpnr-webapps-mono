import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useNetworkAnimation } from "./animations/useNetworkAnimation";

const relationshipSteps = [
  "Request for quotation",
  "Discussion in Cables",
  "Quotation approved",
  "Purchase order",
  "Delivery tracked",
] as const;

/**
 * Section 07 — Business beyond your organization.
 * Two organizations, one trusted relationship — the connection is
 * the hero, never a shopping interface.
 */
export function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useNetworkAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Business network"
            heading={
              <>
                Business doesn't stop
                <br />
                at your organization.
              </>
            }
            lede="Sharp Marketplace connects verified organizations on one trusted business network — discover suppliers, request quotations, negotiate securely and trade with confidence."
          />
        </div>

        {/* One connected business relationship */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative flex items-center justify-between">
            {/* Your organization */}
            <div className="network-org relative z-10 flex flex-col items-center gap-3">
              <span className="flex size-20 items-center justify-center rounded-full border border-blue/40 bg-white text-center text-xs font-semibold text-navy md:size-24 md:text-sm">
                Your
                <br />
                organization
              </span>
            </div>

            {/* The relationship */}
            <div className="absolute inset-x-24 top-1/2 h-px -translate-y-1/2 bg-slate-300 md:inset-x-28">
              <div className="network-fill h-full w-full origin-left scale-x-0 bg-cyan/70" />
            </div>

            {/* Verified supplier */}
            <div className="network-org relative z-10 flex flex-col items-center gap-3">
              <span className="flex size-20 items-center justify-center rounded-full border border-cyan/50 bg-white text-center text-xs font-semibold text-navy md:size-24 md:text-sm">
                Verified
                <br />
                supplier
              </span>
            </div>
          </div>

          {/* The steps of the relationship */}
          <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
            {relationshipSteps.map((step, i) => (
              <li key={step} className="network-step flex items-center gap-3">
                <span className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 md:text-sm">
                  {step}
                </span>
                {i < relationshipSteps.length - 1 && (
                  <span className="hidden h-px w-4 bg-slate-300 md:block" />
                )}
              </li>
            ))}
          </ol>

          <p className="network-outro mx-auto mt-10 max-w-md text-center text-base text-slate-600">
            When the order completes, accounting, inventory and supplier
            history update automatically — the relationship becomes part of
            your business knowledge.
          </p>
        </div>
      </div>
    </section>
  );
}
