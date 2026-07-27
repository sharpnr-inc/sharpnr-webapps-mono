import { useRef } from "react";
import { ShoppingCart, LifeBuoy, IndianRupee, CalendarClock, LineChart } from "lucide-react";
import { IconChip } from "@/app/home/shared/IconChip";
import { Words } from "@/app/home/shared/Words";
import { useEcosystemAnimation } from "./animations/useEcosystemAnimation";

/*
 * What happens after something happens.
 *
 * Five capability chips, scattered rather than gridded. The moment the
 * section is seen, a highlight sweeps through them in turn — each one
 * turning active turquoise, then settling bright — showing an event
 * reaching every part of the business without a single connecting line.
 *
 * Visual-left, argument-right.
 */
interface Capability {
  label: string;
  icon: typeof ShoppingCart;
  top: string;
  left?: string;
  right?: string;
}

const CAPABILITIES: Capability[] = [
  { label: "Orders", icon: ShoppingCart, top: "2%", left: "0%" },
  { label: "Support", icon: LifeBuoy, top: "22%", right: "4%" },
  { label: "Billing", icon: IndianRupee, top: "44%", left: "10%" },
  { label: "Scheduling", icon: CalendarClock, top: "66%", right: "0%" },
  { label: "Analytics", icon: LineChart, top: "88%", left: "20%" },
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
            <div
              key={cap.label}
              data-label={cap.label}
              style={{ top: cap.top, left: cap.left, right: cap.right }}
              className="hp-block absolute w-[62%]"
            >
              <IconChip icon={cap.icon} label={cap.label} className="px-4 py-3.5" />
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
              <Words text="Everything reaches," />
            </span>
            <span className="block text-twilight">
              <Words text="What needs it." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            One action reaches everyone who needed to know. Nobody was asked.
          </p>
        </div>
      </div>
    </section>
  );
}
