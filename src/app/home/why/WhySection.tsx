import { useRef } from "react";
import { useWhyAnimation } from "./animations/useWhyAnimation";

/*
 * Scene 07 — What we believe.
 *
 * Mechanism: intertitles.
 *
 * Beliefs set in columns become a feature comparison. Held one at a time,
 * full width, with nothing else on screen, they read as conviction. Each card
 * holds the frame alone while the visitor passes it, the way a silent film
 * holds a title before returning to the action.
 */
const BELIEFS = [
  "Software should be built together, not connected afterwards.",
  "Who you are should mean the same thing everywhere.",
  "Take only what you need. Nothing should need rebuilding later.",
  "Growing should not change how your people work.",
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useWhyAnimation({ sectionRef, gridRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div ref={gridRef}>
        {BELIEFS.map((belief, i) => (
          <div
            key={belief}
            className="hp-title-card flex min-h-[68svh] items-center px-6 md:min-h-[80svh] md:px-10"
          >
            <p className="mx-auto w-full max-w-4xl text-[clamp(1.75rem,4.6vw,3.5rem)] font-extrabold leading-[1.16] tracking-[-0.04em] text-white">
              <span className="mr-5 align-middle text-[0.3em] font-semibold tabular-nums tracking-[0.18em] text-cyan/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              {belief}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
