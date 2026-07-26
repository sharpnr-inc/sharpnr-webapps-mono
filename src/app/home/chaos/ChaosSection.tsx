import { useRef } from "react";
import { BLOCKS } from "@/app/home/shared/blocks";
import { Words } from "@/app/home/shared/Words";
import { useChaosAnimation } from "./animations/useChaosAnimation";

/*
 * The problem.
 *
 * Seven capability blocks — flat typographic geometry, not UI cards — each
 * independently adrift. Hovering one highlights only that one; its
 * neighbours stay exactly as unresponsive as they are in real life.
 *
 * Visual-left, argument-right. Mobile always shows the argument first.
 */
interface Placement {
  top: string;
  left?: string;
  right?: string;
}

const PLACEMENT: Placement[] = [
  { top: "1%", left: "0%" },
  { top: "14%", right: "2%" },
  { top: "28%", left: "22%" },
  { top: "43%", right: "0%" },
  { top: "58%", left: "4%" },
  { top: "73%", right: "14%" },
  { top: "88%", left: "28%" },
];

export function ChaosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useChaosAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The illustration — visual-left on desktop */}
        <div
          ref={fieldRef}
          className="order-2 relative aspect-3/4 w-full max-w-md lg:order-1"
          aria-hidden="true"
        >
          {BLOCKS.map((block, i) => {
            const p = PLACEMENT[i];
            return (
              <div
                key={block.label}
                data-label={block.label}
                style={{ top: p.top, left: p.left, right: p.right }}
                className="hp-block absolute w-[54%]"
              >
                <div className="hp-island flex items-center gap-3 px-4 py-3.5">
                  <span className="hp-island-icon">
                    <block.icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-white/85 md:text-base">
                    {block.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* The argument — first in the markup, right column on desktop */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <h2
            ref={headingRef}
            className="hp-hero-title font-extrabold text-white"
          >
            <Words text="Business shouldn't feel fragmented." />
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Every department uses great software, but great software rarely
            works together. Your business spends more time connecting
            systems than moving forward.
          </p>
        </div>
      </div>
    </section>
  );
}
