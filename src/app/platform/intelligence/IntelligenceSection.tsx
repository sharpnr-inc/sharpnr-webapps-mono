import { useRef } from "react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { useIntelligenceAnimation } from "./animations/useIntelligenceAnimation";

/* Everyday activity flowing into connected knowledge. */
const eventDots = [
  { label: "An order is placed", y: 60 },
  { label: "An employee checks in", y: 120 },
  { label: "A document is created", y: 180 },
  { label: "A task is completed", y: 240 },
  { label: "A customer leaves feedback", y: 300 },
] as const;

/* The knowledge cluster — events become connected understanding. */
const clusterNodes = [
  { x: 430, y: 120 },
  { x: 494, y: 170 },
  { x: 420, y: 216 },
  { x: 482, y: 262 },
  { x: 438, y: 296 },
] as const;

/**
 * Section 06 — Every business event becomes intelligence.
 * Knowledge is built, not generated: activity flows in, patterns
 * connect, and a useful recommendation quietly surfaces.
 */
export function IntelligenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useIntelligenceAnimation({ sectionRef, introRef, productsRef });

  return (
    <section ref={sectionRef} className="hp-section relative">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            tone="navy"
            align="center"
            eyebrow="Knowledge & intelligence"
            heading={
              <>
                Every action teaches the platform.
                <br />
                Every decision becomes smarter.
              </>
            }
            lede="Every order, conversation, approval, document and task contributes to a growing understanding of your business — one connected source of knowledge instead of scattered reports."
          />
        </div>

        {/* Activity → knowledge → recommendation */}
        <div className="mx-auto mt-14 max-w-3xl">
          <svg
            viewBox="0 0 620 360"
            role="img"
            aria-label="Business events flowing into connected knowledge, producing a practical recommendation"
            className="h-auto w-full"
          >
            {/* Events */}
            {eventDots.map((e) => (
              <g key={e.label} className="intel-event">
                <circle cx="24" cy={e.y} r="5" fill="#00b4d8" fillOpacity="0.8" />
                <text x="42" y={e.y + 4.5} fontSize="13" fill="#8a94a8">
                  {e.label}
                </text>
              </g>
            ))}

            {/* Flow into the knowledge foundation */}
            <g fill="none" stroke="#90e0ef" strokeOpacity="0.28" strokeWidth="1.2">
              {eventDots.map((e, i) => (
                <path
                  key={e.label}
                  className="intel-flow"
                  d={`M250 ${e.y} Q330 ${e.y + (180 - e.y) * 0.5} ${clusterNodes[i].x - 12} ${clusterNodes[i].y}`}
                />
              ))}
            </g>

            {/* Knowledge connects into patterns */}
            <g fill="none" stroke="#00b4d8" strokeOpacity="0.5" strokeWidth="1.2">
              <path className="intel-pattern" d="M430 120 L494 170 L420 216 L482 262 L438 296" />
              <path className="intel-pattern" d="M430 120 L420 216 L438 296" />
            </g>
            {clusterNodes.map((n) => (
              <circle
                key={`${n.x}-${n.y}`}
                className="intel-node"
                cx={n.x}
                cy={n.y}
                r="6"
                fill="#00101f"
                stroke="#00b4d8"
                strokeOpacity="0.7"
                strokeWidth="1.3"
              />
            ))}

            {/* A recommendation surfaces — quiet, practical */}
            <g className="intel-insight">
              <rect x="330" y="322" width="266" height="30" rx="3" fill="#0077b6" fillOpacity="0.16" stroke="#00b4d8" strokeOpacity="0.55" strokeWidth="1.2" />
              <text x="463" y="341" textAnchor="middle" fontSize="12" fontWeight="500" fill="#caf0f8">
                IVA: three items need reordering this week
              </text>
            </g>
          </svg>
        </div>

        {/* Silo and IVA */}
        <div ref={productsRef} className="mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-title-lg font-semibold text-white">Silo</h3>
            <p className="mt-1 text-sm font-medium text-sky/80">
              The business knowledge foundation.
            </p>
            <p className="prose-width mt-2 text-base leading-relaxed text-mute">
              Every business event is securely organized and made available
              across the platform, so every product works from the same source
              of truth. Silo isn't where information sits — it's how your
              organization remembers.
            </p>
          </div>
          <div>
            <h3 className="text-title-lg font-semibold text-white">IVA</h3>
            <p className="mt-1 text-sm font-medium text-sky/80">
              Your intelligent business assistant.
            </p>
            <p className="prose-width mt-2 text-base leading-relaxed text-mute">
              IVA understands what's happening across your organization. It
              helps teams discover insights, answer business questions,
              receive recommendations and automate routine work — supporting
              decisions, never replacing them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
