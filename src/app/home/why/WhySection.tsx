import { useRef } from "react";
import { Layers3, Fingerprint, Blocks, TrendingUp } from "lucide-react";
import { Words } from "@/app/home/shared/Words";
import { onSpotlightMove } from "@/app/home/shared/spotlight";
import { useWhyAnimation } from "./animations/useWhyAnimation";

/*
 * What we believe.
 *
 * Four principles, each a minimal editorial badge — an outlined emblem, a
 * name, one sentence of conviction. No filled block, no product-feature
 * icon: this is architecture, stated plainly.
 *
 * Text-left, visual-right.
 */
const PRINCIPLES = [
  {
    name: "Designed Together",
    belief: "Software should be built together, not connected afterwards.",
    icon: Layers3,
  },
  {
    name: "One Foundation",
    belief: "Who you are should mean the same thing everywhere.",
    icon: Fingerprint,
  },
  {
    name: "Independent Capabilities",
    belief: "Take only what you need. Nothing should need rebuilding later.",
    icon: Blocks,
  },
  {
    name: "Built To Scale",
    belief: "Growing should not change how your people work.",
    icon: TrendingUp,
  },
];

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useWhyAnimation({ sectionRef, headingRef, copyRef, gridRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The argument */}
        <div className="order-1 lg:pr-6">
          <h2
            ref={headingRef}
            className="hp-scene-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Designed as one," />
            </span>
            <span className="block text-twilight">
              <Words text="Not stitched together." />
            </span>
          </h2>
          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Built as one platform from day one. Growing shouldn't mean growing complicated.
          </p>
        </div>

        {/* The demonstration — visual-right on desktop */}
        <div
          ref={gridRef}
          className="order-2 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.name}
              onMouseMove={onSpotlightMove}
              className="hp-principle-card hp-spotlight p-6"
            >
              <span className="hp-principle-badge">
                <principle.icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="hp-principle-name mt-4 text-base font-semibold tracking-tight text-white">
                {principle.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">
                {principle.belief}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
