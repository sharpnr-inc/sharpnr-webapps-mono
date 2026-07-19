import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useDifferentAnimation } from "./animations/useDifferentAnimation";

/* One business event, told around a circle — none of these are
   separate activities. They are the same event, connected. */
const events = [
  { label: "Customer places an order", x: 280, y: 90, anchor: "middle", ly: -16 },
  { label: "Kitchen begins preparing", x: 429, y: 162, anchor: "start", lx: 18 },
  { label: "Inventory updates", x: 465, y: 322, anchor: "start", lx: 18 },
  { label: "Accounting records it", x: 362, y: 451, anchor: "start", lx: 12, ly: 22 },
  { label: "Manager gains visibility", x: 198, y: 451, anchor: "end", lx: -12, ly: 22 },
  { label: "Stock reaches reorder level", x: 95, y: 322, anchor: "end", lx: -18 },
  { label: "A supplier steps in", x: 132, y: 162, anchor: "end", lx: -18 },
] as const;

/* Gentle arcs between consecutive events — every event creates the next. */
const arcs = [
  "M280 90 Q372 102 429 162",
  "M429 162 Q476 234 465 322",
  "M465 322 Q436 404 362 451",
  "M362 451 Q280 486 198 451",
  "M198 451 Q124 404 95 322",
  "M95 322 Q84 234 132 162",
  "M132 162 Q188 102 280 90",
] as const;

/**
 * Section 02 — What makes Sharpnr different. Visitors watch one
 * business come alive, then every connection converges into a single
 * point: the platform. Only then is the philosophy named.
 */
export function DifferentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useDifferentAnimation({ sectionRef, introRef, revealRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Why Sharpnr exists"
            heading={
              <>
                Your business is already connected.
                <br />
                Your software should be too.
              </>
            }
            lede="Businesses don't operate through isolated departments. They operate through connected events — every customer, employee, document and decision influences something else."
          />
        </div>

        {/* One business event, start to finish */}
        <div className="mx-auto mt-14 max-w-xl">
          <svg
            viewBox="0 0 560 560"
            role="img"
            aria-label="One business event flowing through kitchen, inventory, accounting, management and suppliers, converging into the Sharpnr platform"
            className="h-auto w-full"
          >
            {/* Event-to-event connections */}
            <g fill="none" stroke="#0077b6" strokeOpacity="0.4" strokeWidth="1.3">
              {arcs.map((d) => (
                <path key={d} className="diff-arc" d={d} />
              ))}
            </g>

            {/* Convergence — every connection flows back to one point */}
            <g fill="none" stroke="#00b4d8" strokeOpacity="0.5" strokeWidth="1.2">
              {events.map((e) => (
                <path
                  key={`spoke-${e.x}-${e.y}`}
                  className="diff-spoke"
                  d={`M${e.x} ${e.y} L280 280`}
                />
              ))}
            </g>

            {/* Events */}
            {events.map((e) => (
              <g key={e.label} className="diff-event">
                <circle cx={e.x} cy={e.y} r="9" fill="#ffffff" stroke="#0077b6" strokeWidth="1.5" />
                <circle cx={e.x} cy={e.y} r="3" fill="#0077b6" />
                <text
                  x={e.x + ("lx" in e ? (e.lx as number) : 0)}
                  y={e.y + ("ly" in e ? (e.ly as number) : 4.5)}
                  textAnchor={e.anchor}
                  fontSize="13"
                  fontWeight="500"
                  fill="#475569"
                >
                  {e.label}
                </text>
              </g>
            ))}

            {/* The platform — revealed only when everything comes together */}
            <g className="diff-core">
              <circle cx="280" cy="280" r="44" fill="#ffffff" stroke="#03045e" strokeOpacity="0.15" strokeWidth="1.5" />
              <image
                href="/sharpnr-Icon.svg"
                x="252"
                y="252"
                width="56"
                height="56"
              />
            </g>
          </svg>
        </div>

        {/* The philosophy — earned, not introduced */}
        <div
          ref={revealRef}
          className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center"
        >
          <p className="diff-reveal text-heading-md font-bold text-navy md:text-heading-lg">
            Connected Business Infrastructure
          </p>
          <p className="diff-reveal mt-3 text-body-lg text-slate-600">
            A platform where every business event stays connected.
          </p>
          <p className="diff-reveal mt-8 text-title-md font-semibold text-slate-900">
            This is Sharpnr.
          </p>
        </div>
      </div>
    </section>
  );
}
