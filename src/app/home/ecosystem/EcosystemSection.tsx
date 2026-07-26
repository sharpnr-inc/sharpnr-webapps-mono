import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { useEcosystemAnimation } from "./animations/useEcosystemAnimation";

/*
 * What happens after something happens.
 *
 * Pure typography, no lines, no network graph: five capabilities set at
 * editorial scale, scattered rather than gridded. The moment the section is
 * seen, a highlight sweeps through them in turn — each one turning active
 * turquoise, then settling — showing an event reaching every part of the
 * business without a single diagram.
 *
 * Visual-left, argument-right.
 */
interface Capability {
  label: string;
  size: string;
  top: string;
  left?: string;
  right?: string;
}

const CAPABILITIES: Capability[] = [
  { label: "Operations", size: "text-3xl md:text-4xl", top: "2%", left: "0%" },
  { label: "Communication", size: "text-xl md:text-2xl", top: "24%", right: "2%" },
  { label: "Inventory", size: "text-2xl md:text-3xl", top: "48%", left: "8%" },
  { label: "Finance", size: "text-4xl md:text-5xl", top: "66%", right: "0%" },
  { label: "Insights", size: "text-xl md:text-2xl", top: "90%", left: "20%" },
];

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEcosystemAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative flex hp-flex-section min-h-svh items-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* The demonstration — visual-left on desktop */}
        <div
          ref={fieldRef}
          className="order-2 relative aspect-4/5 w-full max-w-md lg:order-1"
          aria-hidden="true"
        >
          {CAPABILITIES.map((cap) => (
            <span
              key={cap.label}
              data-label={cap.label}
              style={{ top: cap.top, left: cap.left, right: cap.right }}
              className={`hp-ecosystem-word absolute whitespace-nowrap font-extrabold tracking-tight ${cap.size}`}
            >
              {cap.label}
            </span>
          ))}
        </div>

        {/* The argument — first in the markup, right column on desktop */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <h2
            ref={headingRef}
            className="hp-hero-title font-extrabold text-white"
          >
            <Words text="Everything works together." />
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Every action inside Sharpnr naturally reaches the people,
            workflows and systems that need it. No switching, no syncing, no
            duplicated work.
          </p>
        </div>
      </div>
    </section>
  );
}
