import { useRef, useState } from "react";
import { useDevice } from "@/hooks/useDevice";
import { MobileNetwork } from "./MobileNetwork";
import { ORGS, HUB } from "./networkScene";
import {
  useNetworkAnimation,
  type HoveredNode,
} from "./animations/useNetworkAnimation";

const legend = [
  "Verified organizations only",
  "Discover partners and suppliers",
  "RFQs and quotations over Cables",
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
      {/* Texture — hairline grid only, no atmosphere glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Sharp-Marketplace · O2O
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-light sm:text-4xl xl:text-5xl">
            The network where organizations meet.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Sharpnr isn't a collection of accounts — it's a living network.
            Organizations discover each other, negotiate over Cables, and
            trade through Sharp-Marketplace, with every transaction settling
            straight into their books.
          </p>
        </div>

        {/* ── Desktop: live Three.js network ───────────────────── */}
        {!isMobile && (
          <div
            ref={hostRef}
            role="img"
            aria-label={`Network of organizations — ${ORGS.map((o) => o.industry).join(", ")} — wired together through ${HUB.name}`}
            className="relative mx-auto mt-8 h-[620px] w-full max-w-6xl"
          >
            {/* Annotation — quiet, factual, technical */}
            <div className="pointer-events-none absolute left-0 top-10 z-10 hidden w-60 border border-dashed border-accent/40 p-4 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                O2O Protocol
              </p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-muted">
                Organization-to-organization only. Every member is a verified
                business — trades settle straight into Sharp-Accounting, with
                no commissions and no charges.
              </p>
            </div>

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
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
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
              <span className="size-1.5 bg-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
