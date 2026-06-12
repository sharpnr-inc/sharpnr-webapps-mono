import { useRef } from "react";
import { useTickerAnimation } from "./animations/useTickerAnimation";

const apps = [
  "Orchestrator",
  "Sharp-Accounting",
  "Sharp-HR",
  "Sharp-Marketing",
  "Cables",
  "Silo",
  "Folio",
  "Cortex",
  "SharpIAM",
  "Sharp-Hospitality",
  "Lifco",
  "Sharp-Marketplace",
];

export function TickerSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useTickerAnimation({ containerRef, trackRef });

  return (
    <section
      ref={containerRef}
      aria-label="Sharpnr applications"
      className="overflow-hidden border-y border-border bg-surface/70 py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center"
          >
            {apps.map((app) => (
              <span key={app} className="flex items-center">
                <span className="px-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-muted">
                  {app}
                </span>
                <span className="size-1 rotate-45 bg-accent-strong/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
