import { useRef, useState } from "react";
import { useDevice } from "@/hooks/useDevice";
import { MobileNetwork } from "./MobileNetwork";
import { ORGS, HUB } from "./networkScene";
import {
  useNetworkAnimation,
  type HoveredNode,
} from "./animations/useNetworkAnimation";

const legend = [
  "Verified suppliers and service providers",
  "RFQs and quotations negotiated over Cables",
  "Purchase orders and invoices from transactions",
  "No commissions, no charges",
];

export function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<HoveredNode>(null);
  const { isMobile } = useDevice();

  useNetworkAnimation({
    sectionRef,
    headingRef,
    hostRef,
    tooltipRef,
    mobileRef,
    legendRef,
    isMobile,
    onHover: setHovered,
  });

  const hoveredOrg = typeof hovered === "number" ? ORGS[hovered] : null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-deep py-24 md:py-32"
    >
      {/* Texture + atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-glow">
            Sharp-Marketplace · O2O
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-light sm:text-4xl xl:text-5xl">
            One network. Every organization.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Organizations on Sharpnr don't just run their operations — they
            connect, trade, and transact with each other, with
            Sharp-Marketplace live at the center.
          </p>
        </div>

        {/* ── Desktop: live Three.js network ───────────────────── */}
        {!isMobile && (
          <div
            ref={hostRef}
            role="img"
            aria-label={`3D network of organizations — ${ORGS.map((o) => o.industry).join(", ")} — all connected through ${HUB.name}`}
            className="relative mx-auto mt-6 h-[560px] w-full max-w-6xl"
          >
            {/* Hover tooltip — positioned by the animation hook */}
            <div
              ref={tooltipRef}
              className={`pointer-events-none absolute left-0 top-0 z-10 w-64 rounded-xl border border-ink-border bg-ink/95 p-4 shadow-xl backdrop-blur-sm transition-opacity duration-200 ${
                hovered !== null ? "opacity-100" : "opacity-0"
              }`}
            >
              {hovered === "hub" ? (
                <>
                  <p className="font-display text-sm font-bold text-text-light">
                    {HUB.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-glow">
                    {HUB.sub}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                    The hub every organization connects through — trade goods,
                    services, and data with the whole network.
                  </p>
                </>
              ) : hoveredOrg ? (
                <>
                  <p className="font-display text-sm font-bold text-text-light">
                    {hoveredOrg.name} · {hoveredOrg.industry}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {hoveredOrg.apps.map((app) => (
                      <span
                        key={app}
                        className="rounded-md border border-ink-border bg-ink-soft px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                    Trades org-to-org through {HUB.name}.
                  </p>
                </>
              ) : null}
            </div>
          </div>
        )}

        {/* ── Mobile: static illustration ──────────────────────── */}
        {isMobile && <MobileNetwork ref={mobileRef} />}

        {/* Legend */}
        <div
          ref={legendRef}
          className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {legend.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted"
            >
              <span className="size-1.5 rounded-full bg-accent-glow" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
