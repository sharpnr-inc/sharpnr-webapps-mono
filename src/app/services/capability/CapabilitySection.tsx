import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useCapabilityAnimation } from "./animations/useCapabilityAnimation";
import type { Capability } from "../capabilities";

interface CapabilitySectionProps {
  capability: Capability;
  /** Alternates orientation and surface down the page. */
  index: number;
}

/**
 * One business capability, told the same honest way each time:
 * what you can accomplish, why it matters, how it actually flows,
 * and the products quietly powering it.
 */
export function CapabilitySection({ capability, index }: CapabilitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const flip = index % 2 === 1;

  useCapabilityAnimation({ sectionRef, introRef });

  return (
    <section
      ref={sectionRef}
      id={capability.id}
      className={`scroll-mt-24 ${index % 2 === 0 ? "bg-soft" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            eyebrow={capability.eyebrow}
            heading={capability.heading}
            lede={capability.lede}
          />
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* What you can accomplish + why it matters */}
          <div className={flip ? "lg:order-last" : ""}>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              What you can accomplish
            </p>
            <ul className="mt-4 space-y-2.5">
              {capability.accomplish.map((item) => (
                <li
                  key={item}
                  className="cap-item border-l-2 border-slate-200 pl-4 text-base text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="prose-width mt-8 text-base leading-relaxed text-slate-600">
              {capability.why}
            </p>
          </div>

          {/* The connected experience */}
          <div>
            <div
              className={`rounded-2xl border border-slate-200 p-6 md:p-8 ${
                index % 2 === 0 ? "bg-white" : "bg-soft"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                How it actually flows
              </p>
              <ol className="relative mt-6 space-y-4">
                <div className="absolute bottom-3 left-[5px] top-3 w-px bg-slate-200" />
                {capability.journey.map((step) => (
                  <li key={step} className="cap-step relative flex items-start gap-4">
                    <span className="relative z-10 mt-1.5 block size-[11px] shrink-0 rounded-full border-2 border-blue/60 bg-white" />
                    <span className="text-sm leading-relaxed text-slate-600">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-slate-100 pt-5 text-sm font-medium text-navy">
                {capability.journeyClose}
              </p>
            </div>

            {/* Powered by — capability first, products second */}
            <p className="mt-6 text-sm text-slate-500">
              Powered by{" "}
              <span className="font-medium text-slate-700">
                {capability.poweredBy.join(", ")}
              </span>
              {capability.alongside.length > 0 && (
                <>
                  {" "}
                  — working alongside {capability.alongside.join(", ")}.
                </>
              )}
            </p>
          </div>
        </div>

        {capability.extra}
      </div>
    </section>
  );
}
