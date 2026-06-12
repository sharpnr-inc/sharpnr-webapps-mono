import { useRef } from "react";
import { useArchitectureAnimation } from "./animations/useArchitectureAnimation";

const layers = [
  {
    num: "01",
    name: "Business Operation Layer",
    description:
      "Industry-specific apps that face your customers — room reservations, table management, kitchen displays, patient records. Each one runs independently, or as part of the whole.",
    apps: ["Sharp-Hospitality", "Lifco (coming soon)", "Custom Apps"],
  },
  {
    num: "02",
    name: "Organization Control Layer",
    description:
      "Orchestrator is the command center. Enable or disable services per company, configure industry apps, control user access, and orchestrate workflows across every service.",
    apps: ["Orchestrator"],
  },
  {
    num: "03",
    name: "Sharpnr Core Services",
    description:
      "The shared business engine behind every operation — finance, people, customers, communication, data, and IT controls, connected out of the box.",
    apps: [
      "Sharp-Accounting",
      "Sharp-HR",
      "Sharp-Marketing",
      "Cables",
      "Silo",
      "Folio",
      "Cortex",
    ],
  },
  {
    num: "04",
    name: "B2B Platform Layer",
    description:
      "Organizations connect with organizations — trade goods and services, finalize deals, communicate over Cables, and share accounting data securely across the network.",
    apps: ["Sharp-Marketplace"],
  },
] as const;

export function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useArchitectureAnimation({ sectionRef, headingRef, listRef, lineRef });

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[2fr_3fr] lg:gap-20">
        {/* ── Sticky heading ──────────────────────────────────── */}
        <div ref={headingRef} className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            Platform Architecture
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            Four layers. One operating fabric.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
            Every layer is independent but connected. Adopt a single app or
            run the entire stack — the architecture grows with your
            organization.
          </p>
        </div>

        {/* ── Layer rows with scroll-drawn spine ──────────────── */}
        <div className="relative">
          <div className="absolute bottom-0 left-[5px] top-2 w-px bg-border" />
          <div
            ref={lineRef}
            className="absolute bottom-0 left-[5px] top-2 w-px bg-accent-strong"
          />
          <ol ref={listRef} className="flex flex-col gap-12">
            {layers.map((layer) => (
              <li key={layer.num} className="relative pl-10">
                <span className="absolute left-0 top-2 size-[11px] rounded-full border-2 border-accent-strong bg-background" />
                <span className="font-mono text-xs font-medium tracking-[0.2em] text-text-faint">
                  LAYER {layer.num}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-text-dark sm:text-2xl">
                  {layer.name}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-text-muted">
                  {layer.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {layer.apps.map((app) => (
                    <span
                      key={app}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-muted"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
