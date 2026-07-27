import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { PARTS, LINKS, STUB } from "./fragments";
import { useChaosAnimation } from "./animations/useChaosAnimation";

/*
 * The problem.
 *
 * The board before Sharpnr: the same parts, designators and routed traces
 * the platform is made of, except every run is severed and the pieces lie
 * flat instead of assembled. Speaking the problem in the same dialect as
 * the solution is what makes Scene 03's turn land — the visitor recognises
 * the language and sees it completed a moment later.
 *
 * Flat throughout. The isometric view belongs to Scene 03 alone.
 *
 * Visual-left, argument-right. Mobile always shows the argument first.
 */
export function ChaosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useChaosAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center overflow-x-clip px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The severed board — visual-left on desktop */}
        <div
          ref={fieldRef}
          className="order-2 relative aspect-[512/435] w-full max-w-lg lg:order-1"
          aria-hidden="true"
        >
          {LINKS.map((l, i) => {
            const horizontal = l.dir === "h";
            const stub = l.len * STUB;
            const farStart = l.len * (1 - STUB);
                        // Two stubs and a gap, never one line: the absence in the
            // middle is the entire message.
            return (
              <div key={`l${i}`} data-link={i}>
                <div
                  className="hp-frag-trace"
                  style={{
                    left: `${l.x}%`,
                    top: `${l.y}%`,
                    width: horizontal ? `${stub}%` : 2,
                    height: horizontal ? 2 : `${stub}%`,
                  }}
                />
                <div
                  className="hp-frag-trace"
                  style={{
                    left: horizontal ? `${l.x + farStart}%` : `${l.x}%`,
                    top: horizontal ? `${l.y}%` : `${l.y + farStart}%`,
                    width: horizontal ? `${stub}%` : 2,
                    height: horizontal ? 2 : `${stub}%`,
                  }}
                />
                <div
                  className="hp-frag-break"
                  style={{
                    left: horizontal ? `${l.x + stub}%` : `${l.x}%`,
                    top: horizontal ? `${l.y}%` : `${l.y + stub}%`,
                  }}
                />
                <div
                  className="hp-frag-break"
                  style={{
                    left: horizontal ? `${l.x + farStart}%` : `${l.x}%`,
                    top: horizontal ? `${l.y}%` : `${l.y + farStart}%`,
                  }}
                />
                {/* Sets out from the near stub and dies at the break */}
                <div
                  className="hp-frag-pulse"
                  data-dir={l.dir}
                  data-travel={stub}
                  style={{
                    left: `${l.x}%`,
                    top: `${l.y}%`,
                    width: horizontal ? 14 : 2,
                    height: horizontal ? 2 : 14,
                    marginLeft: horizontal ? -14 : 0,
                    marginTop: horizontal ? 0 : -14,
                    background: horizontal
                      ? "linear-gradient(to right, rgba(0,180,216,0), #00b4d8)"
                      : "linear-gradient(to bottom, rgba(0,180,216,0), #00b4d8)",
                  }}
                />
              </div>
            );
          })}

          {PARTS.map((part) => (
            <div
              key={part.label}
              data-part={part.label}
              className="hp-frag-part"
              style={{
                left: `${part.x}%`,
                top: `${part.y}%`,
                width: `${part.w}%`,
                height: `${part.h}%`,
              }}
            >
              <span className="hp-frag-name">{part.label}</span>
              <span className="hp-frag-state">{part.state}</span>
            </div>
          ))}
        </div>

        {/* The argument — first in the markup, right column on desktop */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <h2
            ref={headingRef}
            className="hp-scene-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Business shouldn't," />
            </span>
            <span className="block text-twilight">
              <Words text="Feel fragmented." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Great tools. None of them talking. Your people become the integration.
          </p>
        </div>
      </div>
    </section>
  );
}
