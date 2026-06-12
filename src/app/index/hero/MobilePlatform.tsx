import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useMobilePlatformAnimation } from "./animations/useMobilePlatformAnimation";

const layers = [
  {
    num: "L1",
    name: "Business Operations",
    blurb: "Industry apps your customers touch",
    chips: ["Sharp-Hospitality", "Lifco", "Custom Apps"],
  },
  {
    num: "L3",
    name: "Core Services",
    blurb: "The shared business engine",
    chips: ["Accounting", "Sharp-HR", "CRM", "Cables", "Silo"],
  },
] as const;

/**
 * Simplified flat 2D version of the platform diagram for mobile —
 * three layers: Business Ops → Core Services → Marketplace.
 */
export function MobilePlatform() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useMobilePlatformAnimation({ containerRef, listRef });

  return (
    <div ref={containerRef} className="w-full">
      <div ref={listRef} className="flex flex-col items-center gap-0">
        {layers.map((layer) => (
          <div key={layer.num} className="w-full">
            <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-base font-semibold text-text-dark">
                  {layer.name}
                </p>
                <span className="font-mono text-[11px] tracking-widest text-accent-strong">
                  {layer.num}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-text-muted">{layer.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {layer.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] text-text-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center py-1.5">
              <ArrowDown className="size-4 text-accent-strong" />
            </div>
          </div>
        ))}

        {/* Marketplace foundation — dark anchor card */}
        <div className="w-full rounded-xl border border-ink-border bg-ink p-4 shadow-md">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-base font-semibold text-text-light">
              Sharp-Marketplace
            </p>
            <span className="font-mono text-[11px] tracking-widest text-accent-glow">
              L4
            </span>
          </div>
          <p className="mt-0.5 text-xs text-ink-muted">
            The org-to-org network — trade goods, services, and data with
            other organizations
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-glow" />
            <span className="h-px flex-1 border-t border-dashed border-ink-border" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Org A · Org B · Org C
            </span>
            <span className="h-px flex-1 border-t border-dashed border-ink-border" />
            <span className="size-1.5 rounded-full bg-accent-glow" />
          </div>
        </div>
      </div>
    </div>
  );
}
