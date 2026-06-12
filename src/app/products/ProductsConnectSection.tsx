import { useRef } from "react";
import { Blocks, Network, Store } from "lucide-react";
import { useProductsConnectAnimation } from "./animations/useProductsConnectAnimation";

const steps = [
  {
    icon: Blocks,
    num: "01",
    title: "Adopt one app",
    blurb:
      "Every application runs completely on its own — start with accounting, hospitality, or HR and nothing else.",
  },
  {
    icon: Network,
    num: "02",
    title: "Connect the core",
    blurb:
      "Add services as you grow. Orders become journal entries, rosters drive payroll — data flows without exports.",
  },
  {
    icon: Store,
    num: "03",
    title: "Trade org to org",
    blurb:
      "Join Sharp-Marketplace and transact with verified organizations — procurement that settles into your books.",
  },
] as const;

export function ProductsConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useProductsConnectAnimation({ sectionRef, headingRef, stepsRef, lineRef });

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-border bg-surface/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            The ecosystem effect
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            Powerful alone. Compounding together.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Each application earns its place on its own — and every one you
            add makes the others more valuable.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connector spine (desktop) */}
          <div className="absolute left-[8%] right-[8%] top-6 hidden h-px bg-border md:block" />
          <div
            ref={lineRef}
            className="absolute left-[8%] right-[8%] top-6 hidden h-px bg-accent-strong md:block"
          />

          <div ref={stepsRef} className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center md:px-6">
                <div className="relative mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-background">
                  <step.icon className="size-5 text-primary" strokeWidth={1.7} />
                </div>
                <p className="mt-5 font-mono text-[11px] font-medium tracking-[0.22em] text-accent-strong">
                  {step.num}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-text-dark">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
                  {step.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
