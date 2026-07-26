import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { CapabilityModule } from "@/app/home/shared/CapabilityModule";
import { useCapabilitiesAnimation } from "./animations/useCapabilitiesAnimation";

/*
 * The infrastructure, shown plainly.
 *
 * Seven real products, card-free: a hairline frame, an index mark, a name,
 * one sentence. Not a diagram of the platform; the platform itself, named.
 * A compact asymmetrical masonry on the right instead of a full-width grid,
 * so the breadth reads as a glance, not a list to study.
 *
 * Text-left, visual-right.
 */
const PRODUCTS = [
  {
    title: "Sharp-Accounting",
    description: "Double-entry accounting with automatic journal entries from every business app.",
    featured: true,
  },
  {
    title: "Sharp-HR",
    description: "Employees, payroll, attendance and recruitment, all from one place.",
  },
  {
    title: "Sharp-CRM",
    description: "Leads, campaigns and long-term customer relationships, organized in one view.",
  },
  {
    title: "Cables",
    description: "Chat, calls and conferencing — connected to the work that caused them.",
    featured: true,
  },
  {
    title: "Silo",
    description: "Object storage and a data warehouse, built for the whole business.",
  },
  {
    title: "Folio",
    description: "Docs, sheets and presentations, with real-time collaboration built in.",
  },
  {
    title: "Sharp-Marketplace",
    description: "Buy and sell with other businesses on the network — zero commission.",
  },
];

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useCapabilitiesAnimation({ sectionRef, headingRef, copyRef, gridRef });

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
            className="hp-hero-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Everything your business needs." />
            </span>
            <span className="block text-twilight">
              <Words text="Nothing it doesn't." />
            </span>
          </h2>
          <p ref={copyRef} className="hp-hero-copy mt-6 max-w-xl text-mute">
            Build your business on one connected foundation. Start with one
            capability and expand whenever you&rsquo;re ready.
          </p>
        </div>

        {/* The demonstration — visual-right on desktop */}
        <div className="order-2 w-full">
          <div ref={gridRef} className="hp-masonry mx-auto w-full max-w-md">
            {PRODUCTS.map((product, i) => (
              <CapabilityModule key={product.title} index={i} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
