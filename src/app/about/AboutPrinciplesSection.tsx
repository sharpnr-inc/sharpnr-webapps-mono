import { useRef } from "react";
import { Blocks, CircleDot, Network, Sprout } from "lucide-react";
import { useAboutPrinciplesAnimation } from "./animations/useAboutPrinciplesAnimation";

const principles = [
  {
    icon: Blocks,
    title: "Modular by design",
    blurb:
      "No organization should pay for software it doesn't use. Every app stands alone, and every app belongs to the whole.",
  },
  {
    icon: Network,
    title: "Connected by default",
    blurb:
      "Data should move without people carrying it. When apps share a platform, integration isn't a feature — it's a given.",
  },
  {
    icon: CircleDot,
    title: "Honest about today",
    blurb:
      "We are in alpha and we say so. No invented numbers, no imaginary customers — just the platform as it actually is.",
  },
  {
    icon: Sprout,
    title: "Ever-evolving",
    blurb:
      "The ecosystem is never finished. New apps, new industries, and new org-to-org connections ship as the platform grows.",
  },
] as const;

const ecosystem = [
  { name: "Sharp-Hospitality", layer: "Business Operations", status: "Early Access" },
  { name: "Orchestrator", layer: "Organization Control", status: "Early Access" },
  { name: "Sharp-Accounting", layer: "Core Services", status: "Early Access" },
  { name: "Sharp-HR", layer: "Core Services", status: "Early Access" },
  { name: "Sharp-Marketing", layer: "Core Services", status: "Early Access" },
  { name: "Cables", layer: "Core Services", status: "Early Access" },
  { name: "Silo", layer: "Core Services", status: "Early Access" },
  { name: "Folio", layer: "Core Services", status: "Early Access" },
  { name: "Cortex", layer: "Core Services", status: "Early Access" },
  { name: "SharpIAM", layer: "Core Services", status: "Early Access" },
  { name: "Sharp-Marketplace", layer: "B2B Platform", status: "Early Access" },
  { name: "Lifco", layer: "Business Operations", status: "Coming Soon" },
  { name: "Sharp-Retail", layer: "Business Operations", status: "On the Roadmap" },
  { name: "Manufacturing", layer: "Business Operations", status: "On the Roadmap" },
] as const;

export function AboutPrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useAboutPrinciplesAnimation({ sectionRef, headingRef, gridRef, statusRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-surface/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            What we believe
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            Principles before products.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Four convictions shape every application we ship.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-border bg-background p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary-light">
                <principle.icon
                  className="size-5 text-primary"
                  strokeWidth={1.7}
                />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-text-dark">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {principle.blurb}
              </p>
            </div>
          ))}
        </div>

        {/* ── Ecosystem status board ────────────────────────────── */}
        <div className="mx-auto mt-20 max-w-3xl">
          <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-faint">
            The ecosystem today
          </p>
          <div
            ref={statusRef}
            className="mt-6 overflow-hidden rounded-2xl border border-border bg-background"
          >
            {ecosystem.map((app) => (
              <div
                key={app.name}
                className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 last:border-b-0"
              >
                <div className="flex min-w-0 items-baseline gap-3">
                  <span className="truncate font-display text-sm font-semibold text-text-dark">
                    {app.name}
                  </span>
                  <span className="hidden font-mono text-[10px] uppercase tracking-widest text-text-faint sm:inline">
                    {app.layer}
                  </span>
                </div>
                <span
                  className={`flex shrink-0 items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-widest ${
                    app.status === "Early Access"
                      ? "text-accent-strong"
                      : "text-text-faint"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      app.status === "Early Access"
                        ? "bg-accent-strong"
                        : "bg-border"
                    }`}
                  />
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
