import { useRef } from "react";
import { BookOpenCheck, Building2, GitBranch } from "lucide-react";
import { useIndustriesSegmentsAnimation } from "./animations/useIndustriesSegmentsAnimation";

const segments = [
  "Hotels",
  "Restaurants",
  "Cafés",
  "Bars",
  "Night Clubs",
  "Resorts",
  "Hospitals",
  "Clinics",
  "Diagnostic Centers",
  "Pharmacies",
  "Nursing Centers",
  "Retail Stores",
  "Mixed Businesses",
];

const capabilities = [
  {
    icon: BookOpenCheck,
    title: "Books your way",
    blurb:
      "Independent accounting books per legal entity, or consolidated financial reporting across the whole organization.",
  },
  {
    icon: Building2,
    title: "Every structure",
    blurb:
      "Multi-tenant, multi-company, and multi-branch architecture — one platform regardless of how your organization is shaped.",
  },
  {
    icon: GitBranch,
    title: "Mixed by default",
    blurb:
      "Run hospitals, hotels, restaurants, and retail stores side by side — each with its own apps, all under one control layer.",
  },
] as const;

export function IndustriesSegmentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useIndustriesSegmentsAnimation({ sectionRef, headingRef, cloudRef, cardsRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-glow">
            Sectors we serve
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-light sm:text-4xl xl:text-5xl">
            Many sectors. One operating fabric.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            From a single café to a group that spans hospitals and resorts —
            the same multi-tenant, multi-company, multi-branch architecture
            carries them all, and keeps expanding into new sectors.
          </p>
        </div>

        <div
          ref={cloudRef}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          {segments.map((segment) => (
            <span
              key={segment}
              className="rounded-full border border-ink-border bg-ink-soft/60 px-4 py-2 font-mono text-xs tracking-wide text-ink-muted transition-colors duration-200 hover:border-accent/50 hover:text-text-light"
            >
              {segment}
            </span>
          ))}
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-4 md:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="rounded-2xl border border-ink-border bg-ink-soft/60 p-7"
            >
              <capability.icon
                className="size-6 text-accent-glow"
                strokeWidth={1.6}
              />
              <h3 className="mt-4 font-display text-lg font-semibold text-text-light">
                {capability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {capability.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
