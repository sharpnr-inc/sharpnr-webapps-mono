import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { SPINE_X, SPINE_Y, SPINE_LEN, CONSEQUENCES } from "./cascade";
import { useEcosystemAnimation } from "./animations/useEcosystemAnimation";

/*
 * What one action sets off.
 *
 * This scene absorbed what used to be two — reach and automation were the
 * same claim made twice. One event enters at the left and runs forward;
 * each junction it passes throws off a consequence that some other part of
 * the business had to handle. Nobody triggered any of them.
 *
 * The alternating branches make the eye travel forward rather than read a
 * list, which is the difference between showing automation and describing
 * it. Flat and axis-aligned — the isometric view belongs to Scene 03.
 *
 * Visual-left, argument-right.
 */
export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEcosystemAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center overflow-x-clip px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The cascade — visual-left on desktop */}
        <div
          ref={fieldRef}
          className="order-2 relative aspect-[512/380] w-full max-w-lg lg:order-1"
          aria-hidden="true"
        >
          {/* The action travelling forward */}
          <div
            className="hp-casc-spine"
            style={{ left: `${SPINE_X}%`, top: `${SPINE_Y}%`, width: `${SPINE_LEN}%` }}
          />
          <div
            className="hp-casc-head"
            style={{ left: `${SPINE_X}%`, top: `${SPINE_Y}%`, width: 34 }}
          />

          <div
            className="hp-casc-origin"
            style={{ left: `${SPINE_X}%`, top: `${SPINE_Y}%` }}
          >
            <span className="hp-casc-origin-kicker">EVENT_001</span>
            <span className="hp-casc-origin-name">SALE CREATED</span>
          </div>

          {CONSEQUENCES.map((c) => {
            const up = c.side === "up";
            return (
              <div key={c.label} data-consequence={c.label}>
                <div
                  className={`hp-casc-branch ${up ? "hp-casc-branch--up" : ""}`}
                  style={{
                    left: `${c.x}%`,
                    top: up ? `${SPINE_Y - c.drop}%` : `${SPINE_Y}%`,
                    height: `${c.drop}%`,
                  }}
                />
                <div
                  className={`hp-casc-junction hp-casc-junction--w${c.weight}`}
                  style={{ left: `${c.x}%`, top: `${SPINE_Y}%` }}
                />
                {/* The outcome sits at the far end of its own branch */}
                <div
                  className={`hp-casc-out hp-casc-out--w${c.weight}`}
                  style={{
                    left: `${c.x}%`,
                    top: up ? `${SPINE_Y - c.drop}%` : `${SPINE_Y + c.drop}%`,
                    transform: up
                      ? "translate(-50%, -100%) translateY(-8px)"
                      : "translate(-50%, 0) translateY(8px)",
                  }}
                >
                  <span className="hp-casc-label">{c.label}</span>
                  <span className="hp-casc-owner">{c.owner}</span>
                </div>
              </div>
            );
          })}
          <div
            className="hp-casc-done"
            style={{ left: `${SPINE_X + SPINE_LEN + 1}%`, top: `${SPINE_Y}%` }}
          >
            STATE SYNCHRONISED
          </div>
        </div>

        {/* The argument — first in the markup, right column on desktop */}
        <div className="order-1 lg:order-2 lg:ml-auto lg:max-w-xl lg:pl-6">
          <h2
            ref={headingRef}
            className="hp-scene-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="One action," />
            </span>
            <span className="block text-twilight">
              <Words text="Everything follows." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 text-mute">
            One event becomes shared context across your entire business.
          </p>
        </div>
      </div>
    </section>
  );
}
