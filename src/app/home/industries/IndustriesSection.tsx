import { useRef, useState } from "react";
import {
  ConciergeBell,
  Store,
  Stethoscope,
  Briefcase,
  Factory,
  GraduationCap,
  Truck,
} from "lucide-react";
import { Words } from "@/app/home/shared/Words";
import { useIndustriesAnimation } from "./animations/useIndustriesAnimation";

/*
 * Adaptability.
 *
 * One abstract shape on the left, one list of industry sectors on the
 * right. Choosing a sector — by hover, focus or tap — morphs the shape's
 * silhouette and swaps its icon; the sentence never has to say "we support
 * hospitality, retail, healthcare…" because the visitor can feel it
 * happening.
 *
 * Visual-left, argument-right.
 */
const INDUSTRIES = [
  { label: "Hospitality", icon: ConciergeBell },
  { label: "Retail", icon: Store },
  { label: "Healthcare", icon: Stethoscope },
  { label: "Professional Services", icon: Briefcase },
  { label: "Manufacturing", icon: Factory },
  { label: "Education", icon: GraduationCap },
  { label: "Logistics", icon: Truck },
] as const;

/** A deterministic 8-point blob per industry — same point count throughout
 * so GSAP can tween cleanly from one silhouette to the next. */
function blobPolygon(seed: number): string {
  const points = 8;
  const coords: string[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const jitter = ((seed * 7 + i * 13) % 11) - 5;
    const r = 42 + jitter;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    coords.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }
  return `polygon(${coords.join(", ")})`;
}

const INDUSTRY_SHAPES = INDUSTRIES.map((_, i) => blobPolygon(i));

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIndustriesAnimation({
    sectionRef,
    headingRef,
    copyRef,
    shapeRef,
    iconRef,
    shape: INDUSTRY_SHAPES[active],
    activeIndex: active,
  });

  const Active = INDUSTRIES[active];

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The demonstration — visual-left on desktop */}
        <div className="order-2 w-full lg:order-1" aria-hidden="true">
          <div
            ref={shapeRef}
            style={{ clipPath: INDUSTRY_SHAPES[0] }}
            className="hp-morph-shape relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center"
          >
            <div ref={iconRef} className="flex flex-col items-center gap-4">
              <Active.icon className="size-12 text-sky" strokeWidth={1.5} />
              <span className="text-sm font-semibold tracking-tight text-white/80">
                {Active.label}
              </span>
            </div>
          </div>
        </div>

        {/* The argument — first in the markup, right column on desktop */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <h2
            ref={headingRef}
            className="hp-hero-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Built around your business." />
            </span>
            <span className="block text-twilight">
              <Words text="Not the other way around." />
            </span>
          </h2>
          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            The work looks nothing alike from one place to the next.
            Underneath, it stands on the same ground.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-x-8 sm:w-fit sm:grid-cols-2">
            {INDUSTRIES.map((industry, i) => (
              <li key={industry.label}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="hp-industry-item"
                >
                  {industry.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
