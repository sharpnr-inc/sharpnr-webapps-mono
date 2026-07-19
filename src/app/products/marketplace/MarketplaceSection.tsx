import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useMarketplaceAnimation } from "./animations/useMarketplaceAnimation";

const relationships = [
  "Suppliers",
  "Vendors",
  "Manufacturers",
  "Service providers",
  "Distributors",
  "Franchise partners",
  "Contractors",
  "Corporate customers",
] as const;

const capabilities = [
  {
    title: "Verified organizations",
    line: "Every organization is verified before joining, so businesses transact with confidence.",
  },
  {
    title: "Supplier discovery",
    line: "Find suppliers by products, services, industries, certifications and locations.",
  },
  {
    title: "RFQs & quotations",
    line: "Invite multiple suppliers, compare responses, negotiate and decide — all connected.",
  },
  {
    title: "Procurement",
    line: "Purchase orders, approvals, deliveries and invoices without leaving the ecosystem.",
  },
  {
    title: "Vendor management",
    line: "Profiles, contracts, communication history and transaction records in one workspace.",
  },
  {
    title: "Connected accounting",
    line: "Purchases create accounting entries and update inventory automatically. Nothing twice.",
  },
] as const;

const journey = [
  "A hotel needs new furniture",
  "Verified suppliers are compared",
  "Specifications discussed in Cables",
  "Purchase order approved",
  "Shipment tracked, stock received",
  "Books and supplier history update on their own",
] as const;

/**
 * Section 06 — Sharp Marketplace. A business network, not a shop:
 * organizations discover, communicate, negotiate and trade with
 * organizations.
 */
export function MarketplaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useMarketplaceAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            eyebrow="Sharp Marketplace"
            heading={
              <>
                Business doesn't stop at your organization.
                <br />
                Neither should your platform.
              </>
            }
            lede="Sharp Marketplace connects verified organizations on one trusted business network. Discover suppliers, request quotations, negotiate securely and manage every relationship from beginning to end."
          />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Capabilities */}
          <div>
            <div className="space-y-7">
              {capabilities.map((cap) => (
                <div key={cap.title} className="mkt-cap border-l-2 border-slate-200 pl-5">
                  <h3 className="text-base font-semibold text-slate-900">
                    {cap.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{cap.line}</p>
                </div>
              ))}
            </div>
          </div>

          {/* One relationship, start to finish */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                One relationship, start to finish
              </p>
              <ol className="relative mt-6 space-y-5">
                <div className="absolute bottom-3 left-[5px] top-3 w-px bg-slate-200" />
                {journey.map((step) => (
                  <li key={step} className="mkt-step relative flex items-start gap-4">
                    <span className="relative z-10 mt-1.5 block size-[11px] shrink-0 rounded-full border-2 border-blue/60 bg-white" />
                    <span className="text-sm leading-relaxed text-slate-600">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                More than procurement — your business network
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {relationships.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-600"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
