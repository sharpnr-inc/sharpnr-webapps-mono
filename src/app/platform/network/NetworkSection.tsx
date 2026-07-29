import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { NetworkDiagram } from "./NetworkDiagram";
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
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            align="center"
            eyebrow="Business network"
            heading={
              <>
                Business doesn&rsquo;t stop,
                <br />
                <span className="text-twilight">at your own front door.</span>
              </>
            }
            lede="Sharp-Marketplace is where businesses already on Sharpnr buy from and sell to each other. Nothing is taken in commission."
          />
        </div>

        {/* One connected business relationship */}
        <div className="mx-auto mt-16 max-w-3xl">
          <NetworkDiagram />
        </div>

        {/* The steps of the relationship.
            The sequence is carried by the numbers, not by connector dashes
            between the pills: a dash is a child of the pill it follows, so
            whenever the row wrapped it stranded a dash at the end of the
            line with nothing after it.

            Wider than the diagram above so all five stay on one line on a
            desktop — the process runs past the two organizations, which is
            the point of the section. */}
        <div className="mx-auto max-w-5xl">
          <ol className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            {relationshipSteps.map((step, i) => (
              <li
                key={step}
                className="network-step flex items-center gap-2 rounded-full border border-sky/15 bg-sky/[0.025] py-1.5 pl-3 pr-4"
              >
                <span className="text-[0.625rem] font-medium tabular-nums tracking-[0.1em] text-cyan/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-medium text-mute md:text-sm">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          {/* `sharpnr.md` is explicit that Sharpnr does not process payments
              yet and that the site must never imply otherwise, so the second
              sentence is not optional. */}
          <p className="network-outro mx-auto mt-10 max-w-md text-center text-base text-mute">
            When the order goes through, the supplier and the entry appear in
            your books on their own. Payments still settle outside the
            platform.
          </p>
        </div>
      </div>
    </section>
  );
}
