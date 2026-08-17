import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { CAPABILITY_DIAGRAMS } from "../capability-diagrams";
import { useCapabilityAnimation } from "./animations/useCapabilityAnimation";
import type { Capability } from "../capabilities";

interface CapabilitySectionProps {
  capability: Capability;
  /** Alternates which side the flow panel sits on. */
  index: number;
}

/**
 * One business capability, told the same honest way each time:
 * what you can accomplish, why it matters, how it actually flows,
 * and the products quietly powering it.
 *
 * Seven of these run back to back, so they alternate: the flow panel is on
 * the right for even sections and on the left for odd ones. The argument
 * always comes first in the markup, so a phone reads what you can
 * accomplish before the panel that proves it, whichever side desktop puts
 * them on. The section surfaces no longer alternate — the canvas is one
 * continuous sheet now, and the hairline between sections carries the
 * rhythm the white/soft flip used to.
 */
export function CapabilitySection({ capability, index }: CapabilitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const flip = index % 2 === 1;
  const Diagram = CAPABILITY_DIAGRAMS[capability.id];

  /* The entrance direction follows the layout, exactly as the Industries
     category strips do (claude.md): a flipped section enters from the
     opposite edge, so seven sections of one component never travel the
     same way twice in a row. */
  useCapabilityAnimation({ sectionRef, introRef, flip });

  return (
    <section
      ref={sectionRef}
      id={capability.id}
      className="relative scroll-mt-24 border-t border-white/[0.07]"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            eyebrow={capability.eyebrow}
            heading={capability.heading}
            lede={capability.lede}
          />
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* What you can accomplish + why it matters.
              The cap and the push live on this wrapper rather than on the
              paragraph: capped separately, the label, the list and the copy
              end up with three different edges. When this column runs on the
              right the whole block is pushed to the page's outer edge, so it
              never hugs the gutter and leaves dead space at the margin. */}
          <div
            className={`order-1 ${
              flip ? "lg:order-2 lg:ml-auto lg:max-w-xl" : "lg:order-1 lg:mr-auto lg:max-w-xl lg:pr-6"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
              What you can accomplish
            </p>
            <ul className="mt-4 space-y-2.5">
              {capability.accomplish.map((item) => (
                <li
                  key={item}
                  className="cap-item border-l border-sky/20 pl-4 text-base text-mute"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base leading-relaxed text-mute">
              {capability.why}
            </p>
          </div>

          {/* The connected experience */}
          <div className={`order-2 ${flip ? "lg:order-1" : "lg:order-2"}`}>
            <div className="cap-panel rounded-2xl border border-sky/15 bg-sky/[0.025] p-6 md:p-8">
              {/* What the capability *is*, before how it flows. Seven of
                  these sections run back to back and the panel was the only
                  thing in them that changed, so without a drawing the whole
                  middle of the page read as one section repeated. */}
              {Diagram && (
                <div className="-mt-1 mb-6 border-b border-sky/12 pb-6">
                  <Diagram />
                </div>
              )}
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-mute/70">
                How it actually flows
              </p>
              <ol className="relative mt-6 space-y-4">
                <div className="absolute bottom-3 left-[5px] top-3 w-px bg-sky/20" />
                {capability.journey.map((step) => (
                  <li key={step} className="cap-step relative flex items-start gap-4">
                    <span className="relative z-10 mt-1.5 block size-[11px] shrink-0 rounded-full border-2 border-cyan/60 bg-canvas" />
                    <span className="text-sm leading-relaxed text-mute">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="cap-close mt-6 border-t border-sky/12 pt-5 text-sm font-medium text-white">
                {capability.journeyClose}
              </p>
            </div>

            {/* Powered by — capability first, products second */}
            <p className="cap-powered mt-6 text-sm text-mute/70">
              Powered by{" "}
              <span className="font-medium text-sky/85">
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
