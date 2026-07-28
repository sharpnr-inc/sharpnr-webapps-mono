import { useRef } from "react";
import { config } from "@/configs/env";
import { CtaLink } from "@/app/shared/CtaLink";
import { useConvergenceAnimation } from "./animations/useConvergenceAnimation";

/* Everything the page introduced — nothing new, all of it together. */
const areas = [
  { label: "Operations", x: 280, y: 52, anchor: "middle", ly: -14 },
  { label: "Foundation", x: 429, y: 124, anchor: "start", lx: 16 },
  { label: "Communication", x: 465, y: 284, anchor: "start", lx: 16 },
  { label: "Knowledge", x: 362, y: 413, anchor: "start", lx: 10, ly: 22 },
  { label: "Tasks", x: 198, y: 413, anchor: "end", lx: -10, ly: 22 },
  { label: "Intelligence", x: 95, y: 284, anchor: "end", lx: -16 },
  { label: "Business Network", x: 132, y: 124, anchor: "end", lx: -16 },
] as const;

/**
 * Section 08 — Connected by design. The conclusion: every part of
 * the platform converges into one point, slower than everything
 * before it, ending in the brand statement and one clear next step.
 */
export function ConvergenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useConvergenceAnimation({ sectionRef, statementRef, ctaRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="conv-intro text-xs font-medium uppercase tracking-[0.16em] text-cyan">
            Connected by design
          </p>
          <h2 className="conv-intro mt-4 text-heading-lg font-bold text-white md:text-heading-xl">
            Built to work as one.
          </h2>
          <p className="conv-intro mt-5 max-w-xl text-body-lg text-white/70">
            Every Sharpnr product works independently. Together, information
            flows naturally across every team, every workflow and every
            organization — not through integrations, but by design.
          </p>
        </div>

        {/* Everything converges */}
        <div className="mx-auto mt-14 max-w-lg">
          <svg
            /* Padded left and right of the 0–560 drawing so "Communication",
               the widest label, fits inside the box instead of being clipped
               at the right edge. */
            viewBox="-20 0 600 470"
            role="img"
            aria-label="Operations, foundation, communication, knowledge, tasks, intelligence and the business network converging into the Sharpnr platform"
            className="h-auto w-full"
          >
            <g fill="none" stroke="#00b4d8" strokeOpacity="0.4" strokeWidth="1.1">
              {areas.map((a) => (
                <path
                  key={a.label}
                  className="conv-spoke"
                  d={`M${a.x} ${a.y} L280 240`}
                />
              ))}
            </g>

            {areas.map((a) => (
              <g key={a.label} className="conv-area">
                <circle cx={a.x} cy={a.y} r="7" fill="#00101f" stroke="rgba(144,224,239,0.55)" strokeWidth="1.3" />
                <text
                  x={a.x + ("lx" in a ? (a.lx as number) : 0)}
                  y={a.y + ("ly" in a ? (a.ly as number) : 4.5)}
                  textAnchor={a.anchor}
                  fontSize="13"
                  fontWeight="500"
                  fill="rgba(255,255,255,0.75)"
                >
                  {a.label}
                </text>
              </g>
            ))}

            {/* The platform. The mark is drawn in #ececec, so it sits on the
                canvas inside a cyan ring rather than on a white disc, where
                it was very nearly invisible. */}
            <g className="conv-core">
              <circle cx="280" cy="240" r="42" fill="#00101f" stroke="#00b4d8" strokeOpacity="0.45" strokeWidth="1.5" />
              <image href="/sharpnr-Icon.svg" x="254" y="214" width="52" height="52" />
            </g>
          </svg>
        </div>

        {/* The brand statement — calm, confident, memorable */}
        <div
          ref={statementRef}
          className="mx-auto mt-16 flex max-w-2xl flex-col items-center text-center"
        >
          <p className="text-heading-md font-bold text-white md:text-display-md">
            One Platform.
            <br />
            Every Business.
          </p>
          <p className="mt-6 text-title-md font-medium text-cyan">
            Connected Business Infrastructure.
          </p>
          <p className="mt-3 text-body-lg text-white/70">This is Sharpnr.</p>
        </div>

        {/* One clear next step */}
        <div
          ref={ctaRef}
          className="mx-auto mt-20 flex max-w-xl flex-col items-center border-t border-white/10 pt-14 text-center"
        >
          <h3 className="text-heading-sm font-bold text-white">
            Ready to explore the ecosystem?
          </h3>
          <p className="mt-3 text-base text-white/70">
            Discover the products that power the platform, or create your free
            account and experience it for yourself.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaLink tone="navy" variant="primary" to="/products" arrow>
              Explore Products
            </CtaLink>
            <CtaLink
              tone="navy"
              variant="secondary"
              href={config.authAppUrl + "/signup"}
            >
              Create Free Account
            </CtaLink>
          </div>
          <p className="mt-6 text-sm text-white/50">
            Free during Early Access • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
