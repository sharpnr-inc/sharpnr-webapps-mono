import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMarketplaceAnimation } from "./animations/useMarketplaceAnimation";

const HUB = { x: 270, y: 190 };
const orgs = [
  { x: 80, y: 70, label: "ORG A" },
  { x: 460, y: 90, label: "ORG B" },
  { x: 90, y: 310, label: "ORG C" },
  { x: 450, y: 300, label: "ORG D" },
] as const;

export function MarketplaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<SVGGElement>(null);
  const linesRef = useRef<SVGGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useMarketplaceAnimation({ sectionRef, copyRef, hubRef, linesRef, nodesRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <div ref={copyRef}>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            Sharp-Marketplace · O2O
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            No organization is an island.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
            Sharp-Marketplace connects every organization on Sharpnr into a
            verified B2B network. Discover suppliers, send RFQs, trade goods
            and services — and watch purchase orders and invoices flow
            straight into your books.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              "Verified suppliers and service providers — org-to-org only",
              "Quotations sent from Sharp-Marketing, negotiated over Cables",
              "Purchase orders and invoices created directly from transactions",
              "No commissions, no charges, no catalog management",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-strong" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Learn More
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── O2O network diagram ──────────────────────────────── */}
        <div className="w-full">
          <svg
            viewBox="0 0 540 380"
            className="h-auto w-full"
            role="img"
            aria-label="Diagram of organizations trading through the Sharp-Marketplace network"
          >
            <g ref={linesRef}>
              {orgs.map((org) => (
                <line
                  key={org.label}
                  x1={HUB.x}
                  y1={HUB.y}
                  x2={org.x}
                  y2={org.y}
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                  strokeDasharray="6 6"
                  strokeOpacity={0.7}
                />
              ))}
            </g>

            <g ref={nodesRef}>
              {orgs.map((org) => (
                <g key={org.label}>
                  <circle
                    cx={org.x}
                    cy={org.y}
                    r={26}
                    fill="var(--color-surface)"
                    stroke="var(--color-border)"
                    strokeWidth={1.5}
                  />
                  <circle cx={org.x} cy={org.y} r={5} fill="var(--color-primary)" />
                  <text
                    x={org.x}
                    y={org.y + 46}
                    textAnchor="middle"
                    fill="var(--color-text-muted)"
                    fontFamily="var(--font-mono)"
                    fontSize={11}
                    letterSpacing={1.5}
                  >
                    {org.label}
                  </text>
                </g>
              ))}
            </g>

            <g ref={hubRef}>
              <circle
                cx={HUB.x}
                cy={HUB.y}
                r={56}
                fill="var(--color-ink)"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />
              <circle
                cx={HUB.x}
                cy={HUB.y}
                r={66}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1}
                strokeOpacity={0.25}
                strokeDasharray="3 6"
              />
              <text
                x={HUB.x}
                y={HUB.y - 4}
                textAnchor="middle"
                fill="var(--color-text-light)"
                fontFamily="var(--font-mono)"
                fontSize={12}
                letterSpacing={1}
              >
                SHARP
              </text>
              <text
                x={HUB.x}
                y={HUB.y + 12}
                textAnchor="middle"
                fill="var(--color-accent-glow)"
                fontFamily="var(--font-mono)"
                fontSize={12}
                letterSpacing={1}
              >
                MARKETPLACE
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
