import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useDevice } from "@/hooks/useDevice";
import { useFlowAnimation } from "./animations/useFlowAnimation";

/* ── Pipeline geometry (viewBox units) ──────────────────────────── */

const NODE_Y = 78;
const NODE_H = 104;
const LINE_Y = NODE_Y + NODE_H / 2;

const nodes = {
  hospitality: { x: 30, w: 250 },
  accounting: { x: 385, w: 250 },
  statements: { x: 740, w: 230 },
};

const segA = {
  from: nodes.hospitality.x + nodes.hospitality.w,
  to: nodes.accounting.x,
};
const segB = {
  from: nodes.accounting.x + nodes.accounting.w,
  to: nodes.statements.x,
};

const mobileSteps = [
  { name: "Sharp-Hospitality", detail: "An order closes at the POS" },
  { name: "Sharp-Accounting", detail: "The journal entry records itself" },
  { name: "Financial Statements", detail: "P&L and balance sheet stay current" },
] as const;

export function FlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const linksRef = useRef<SVGGElement>(null);
  const chipARef = useRef<SVGGElement>(null);
  const chipBRef = useRef<SVGGElement>(null);
  const ping1Ref = useRef<SVGCircleElement>(null);
  const ping2Ref = useRef<SVGCircleElement>(null);

  const { isMobile } = useDevice();

  useFlowAnimation({
    sectionRef,
    headingRef,
    nodesRef,
    linksRef,
    chipARef,
    chipBRef,
    ping1Ref,
    ping2Ref,
    segA: { from: segA.from - 46, to: segA.to - 46 },
    segB: { from: segB.from - 46, to: segB.to - 46 },
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-surface/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-strong">
            Connected out of the box
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-dark sm:text-4xl xl:text-5xl">
            A sale becomes a ledger entry. Automatically.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            When Sharp-Hospitality closes an order, Sharp-Accounting records
            it — no manual ledger work, no end-of-day exports. The same flow
            powers purchases, payroll, and marketplace transactions.
          </p>
        </div>

        {/* ── Desktop: animated pipeline ───────────────────────── */}
        {!isMobile && (
          <svg
            viewBox="0 0 1000 260"
            className="mx-auto mt-14 h-auto w-full max-w-5xl"
            role="img"
            aria-label="Animated flow showing an order in Sharp-Hospitality becoming a journal entry in Sharp-Accounting and updating financial statements"
          >
            {/* Connecting links */}
            <g ref={linksRef}>
              <line
                x1={segA.from}
                y1={LINE_Y}
                x2={segA.to}
                y2={LINE_Y}
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeDasharray="5 5"
                strokeOpacity={0.7}
              />
              <line
                x1={segB.from}
                y1={LINE_Y}
                x2={segB.to}
                y2={LINE_Y}
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeDasharray="5 5"
                strokeOpacity={0.7}
              />
            </g>

            {/* Nodes */}
            <g ref={nodesRef}>
              {/* Sharp-Hospitality */}
              <g>
                <rect
                  x={nodes.hospitality.x}
                  y={NODE_Y}
                  width={nodes.hospitality.w}
                  height={NODE_H}
                  rx={16}
                  fill="var(--color-surface)"
                  stroke="var(--color-border)"
                  strokeWidth={1.5}
                />
                <rect
                  x={nodes.hospitality.x + 22}
                  y={NODE_Y + 26}
                  width={26}
                  height={26}
                  rx={7}
                  fill="var(--color-primary-light)"
                />
                <text
                  x={nodes.hospitality.x + 62}
                  y={NODE_Y + 44}
                  fontFamily="var(--font-display)"
                  fontSize={17}
                  fontWeight={600}
                  fill="var(--color-text-dark)"
                >
                  Sharp-Hospitality
                </text>
                <text
                  x={nodes.hospitality.x + 22}
                  y={NODE_Y + 80}
                  fontFamily="var(--font-mono)"
                  fontSize={11}
                  letterSpacing={1.2}
                  fill="var(--color-text-muted)"
                >
                  POS · TABLES · KDS · ROOMS
                </text>
              </g>

              {/* Sharp-Accounting */}
              <g>
                <rect
                  x={nodes.accounting.x}
                  y={NODE_Y}
                  width={nodes.accounting.w}
                  height={NODE_H}
                  rx={16}
                  fill="var(--color-surface)"
                  stroke="var(--color-accent-strong)"
                  strokeOpacity={0.45}
                  strokeWidth={1.5}
                />
                <rect
                  x={nodes.accounting.x + 22}
                  y={NODE_Y + 26}
                  width={26}
                  height={26}
                  rx={7}
                  fill="var(--color-accent-light)"
                />
                <text
                  x={nodes.accounting.x + 62}
                  y={NODE_Y + 44}
                  fontFamily="var(--font-display)"
                  fontSize={17}
                  fontWeight={600}
                  fill="var(--color-text-dark)"
                >
                  Sharp-Accounting
                </text>
                <text
                  x={nodes.accounting.x + 22}
                  y={NODE_Y + 80}
                  fontFamily="var(--font-mono)"
                  fontSize={11}
                  letterSpacing={1.2}
                  fill="var(--color-text-muted)"
                >
                  GENERAL LEDGER · AP · AR
                </text>
                <circle
                  ref={ping1Ref}
                  cx={nodes.accounting.x}
                  cy={LINE_Y}
                  r={4}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  opacity={0}
                />
              </g>

              {/* Financial statements */}
              <g>
                <rect
                  x={nodes.statements.x}
                  y={NODE_Y}
                  width={nodes.statements.w}
                  height={NODE_H}
                  rx={16}
                  fill="var(--color-ink)"
                  stroke="var(--color-ink-border)"
                  strokeWidth={1.5}
                />
                <text
                  x={nodes.statements.x + 22}
                  y={NODE_Y + 38}
                  fontFamily="var(--font-display)"
                  fontSize={16}
                  fontWeight={600}
                  fill="var(--color-text-light)"
                >
                  Financial Statements
                </text>
                {[0, 1, 2].map((i) => (
                  <rect
                    key={i}
                    x={nodes.statements.x + 22}
                    y={NODE_Y + 54 + i * 13}
                    width={[150, 110, 130][i]}
                    height={5}
                    rx={2.5}
                    fill="var(--color-accent)"
                    fillOpacity={0.35 - i * 0.08}
                  />
                ))}
                <circle
                  ref={ping2Ref}
                  cx={nodes.statements.x}
                  cy={LINE_Y}
                  r={4}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  opacity={0}
                />
              </g>
            </g>

            {/* Travelling documents */}
            <g ref={chipARef} opacity={0}>
              <rect
                x={0}
                y={LINE_Y - 14}
                width={92}
                height={28}
                rx={8}
                fill="var(--color-primary)"
              />
              <text
                x={46}
                y={LINE_Y + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={11}
                letterSpacing={1.5}
                fill="var(--color-text-light)"
              >
                ORDER
              </text>
            </g>
            <g ref={chipBRef} opacity={0}>
              <rect
                x={0}
                y={LINE_Y - 14}
                width={92}
                height={28}
                rx={8}
                fill="var(--color-accent-strong)"
              />
              <text
                x={46}
                y={LINE_Y + 4}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={11}
                letterSpacing={1.5}
                fill="var(--color-text-light)"
              >
                ENTRY
              </text>
            </g>
          </svg>
        )}

        {/* ── Mobile: stacked flow ─────────────────────────────── */}
        {isMobile && (
          <div className="mt-12 flex flex-col items-center">
            {mobileSteps.map((step, i) => (
              <div key={step.name} className="w-full max-w-sm">
                <div
                  className={`rounded-xl border p-4 ${
                    i === 2
                      ? "border-ink-border bg-ink"
                      : "border-border bg-surface"
                  }`}
                >
                  <p
                    className={`font-display text-base font-semibold ${
                      i === 2 ? "text-text-light" : "text-text-dark"
                    }`}
                  >
                    {step.name}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      i === 2 ? "text-ink-muted" : "text-text-muted"
                    }`}
                  >
                    {step.detail}
                  </p>
                </div>
                {i < mobileSteps.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <ArrowDown className="size-4 text-accent-strong" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
