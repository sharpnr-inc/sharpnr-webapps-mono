import { useRef } from "react";
import {
  Blocks,
  BookOpenCheck,
  Building2,
  Lock,
  Wallet,
  Workflow,
} from "lucide-react";
import { useFeaturesAnimation } from "./animations/useFeaturesAnimation";

const features = [
  {
    icon: BookOpenCheck,
    title: "Multi-entity accounting",
    description:
      "Independent books for every legal entity, or consolidated financial reporting across the whole organization — your structure, your choice.",
  },
  {
    icon: Blocks,
    title: "Modular by design",
    description:
      "Every Business Operation App runs completely on its own. Adopt a single service today and grow into the ecosystem at your own pace.",
  },
  {
    icon: Building2,
    title: "Multi-company, multi-industry",
    description:
      "Hospitals, hotels, restaurants, retail — manage mixed businesses, multiple companies, and multiple branches from a single platform.",
  },
  {
    icon: Workflow,
    title: "Connected out of the box",
    description:
      "A sale in Sharp-Hospitality becomes a journal entry in Sharp-Accounting automatically. Every app speaks to every other app.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    description:
      "Role-based access control and audit logs across every service, governed centrally through Cortex and Orchestrator.",
  },
  {
    icon: Wallet,
    title: "Pay only for what you use",
    description:
      "Subscribe to the applications and services your organization actually needs — and everything is free during early access.",
  },
] as const;

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useFeaturesAnimation({ sectionRef, headingRef, gridRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            Built for scale
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            An ecosystem that grows with you.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            From a single restaurant to a multi-country enterprise — the same
            platform, the same architecture, no migration cliff.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-background p-7 transition-colors duration-300 hover:bg-surface"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary-light">
                <feature.icon
                  className="size-5 text-primary"
                  strokeWidth={1.7}
                />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-text-dark">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
