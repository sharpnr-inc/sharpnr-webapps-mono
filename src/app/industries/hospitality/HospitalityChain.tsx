/*
 * Hospitality — "one guest action, seven systems responding".
 *
 * A row of product chips said twelve names and nothing about how they
 * relate. This says the relationship: the guest journey recedes along the
 * top, one order enters at the Point of Sale, and the cascade underneath
 * lights in causal order without anyone re-entering anything.
 *
 * Two renderings, one geometry (`./chain`):
 *
 *   the wide drawing   md and up. Blueprint linework, orthogonal runs,
 *                      labels as real selectable <text>.
 *   the stacked list   below md. The same nodes as semantic HTML, because
 *                      a 900-unit drawing at 375px is illegible rather
 *                      than small, and a horizontally scrolling figure
 *                      strands its right-hand half off screen.
 *
 * Both carry the same `hosp-node` / `data-node` hooks, so one GSAP
 * timeline drives whichever one is actually laid out.
 *
 * Only the travelling charge glows. Every static trace is a flat hairline —
 * lighting the whole drawing is what makes a diagram look generated.
 *
 * ── It answers the pointer ──
 * The cascade already showed a value changing — the stock count genuinely
 * decrements — but it played once and was then a picture. Pointing at any
 * system now isolates *what that system's response depends on*: the runs
 * that carried the order to it and every system upstream, back to the
 * guest. The dependency set comes from CHAIN_EDGES (`DEPENDS` in
 * `./chain`), so it can never disagree with the drawing.
 *
 * The state is React's rather than a `:has()` rule because the answer is
 * derived from a graph — a CSS version would mean eight hand-written
 * selector lists that silently rot the first time an edge changes. The
 * visual states themselves are still CSS, in the same vocabulary the
 * Industries topologies use.
 *
 * Every property the hover touches is one GSAP does *not* write inline:
 * stroke / stroke-width / fill on the boxes, stroke-opacity on the runs,
 * fill-opacity on the labels. GSAP owns `opacity` on `.hosp-node`,
 * `stroke-opacity` on `.hosp-node-box` and the dash on `.hosp-edge`, and
 * an inline style beats a stylesheet (design.md §11, trap 1).
 */
import { useState } from "react";
import {
  BAND,
  BAND_KICKER,
  CHAIN_EDGES,
  CHAIN_NODES,
  DEPENDS,
  ECOSYSTEM,
  GUEST_EDGE,
  IVA_LINE,
  JOURNEY,
  JOURNEY_X,
  STOCK_FROM,
  WIDE,
  ecoSpot,
  edgePath,
  tiers,
} from "./chain";

const ACCENT = "#00b4d8";

/** `undefined` while nothing is being pointed at, so the figure carries no
 *  state attributes at all in its resting condition. */
type Rel = "on" | "off" | undefined;

const trace = {
  stroke: ACCENT,
  strokeOpacity: 0.3,
  strokeWidth: 1,
  fill: "none",
} as const;

/** One node of the wide drawing. */
function WideNode({
  id,
  rel,
  onEnter,
  onLeave,
}: {
  id: string;
  rel: Rel;
  onEnter: (id: string) => void;
  onLeave: () => void;
}) {
  const n = CHAIN_NODES.find((x) => x.id === id);
  const p = WIDE.pos[id];
  if (!n) return null;
  const x = p.cx - p.w / 2;
  const isIva = id === "iva";
  return (
    <g
      className="hosp-node"
      data-node={id}
      data-rel={rel}
      onPointerEnter={() => onEnter(id)}
      onPointerLeave={onLeave}
    >
      <rect
        className="hosp-node-box"
        x={x}
        y={p.top}
        width={p.w}
        height={WIDE.nodeH}
        stroke={ACCENT}
        strokeOpacity={0.35}
        strokeWidth={1.1}
        fill="none"
      />
      <text
        className="hosp-node-name"
        x={p.cx}
        y={p.top + (n.note || isIva || id === "inventory" ? 19 : 27)}
        textAnchor="middle"
        fill="#ffffff"
        fillOpacity={0.82}
        fontSize={13}
        fontWeight={600}
      >
        {n.label}
      </text>

      {/* Inventory says it with a number, because a value that changes is
          more convincing than one more highlight. */}
      {id === "inventory" ? (
        <text
          className="hosp-node-note"
          x={p.cx}
          y={p.top + 34}
          textAnchor="middle"
          fill={ACCENT}
          fillOpacity={0.75}
          fontSize={11}
          fontFamily="var(--font-mono)"
        >
          <tspan className="hosp-stock">{STOCK_FROM}</tspan>
          <tspan> in stock</tspan>
        </text>
      ) : n.note ? (
        <text
          className="hosp-node-note"
          x={p.cx}
          y={p.top + 34}
          textAnchor="middle"
          fill={ACCENT}
          fillOpacity={0.7}
          fontSize={11}
          fontFamily="var(--font-mono)"
        >
          {n.note}
        </text>
      ) : null}

      {/* IVA's answer hangs off the trunk as an annotation rather than
          sitting centred under the box, because the trunk runs straight
          through that centre line on its way to the band. */}
      {isIva && (
        <text
          className="hosp-iva-line"
          x={p.cx + 14}
          y={BAND.labelY}
          fill="#90e0ef"
          fillOpacity={0.8}
          fontSize={12}
        >
          {IVA_LINE}
        </text>
      )}

      {/* Every shape in the node is stroke-only, so there is no interior
          for the pointer to find. The plate is the hit area. */}
      <rect
        className="hosp-node-hit"
        x={x}
        y={p.top}
        width={p.w}
        height={WIDE.nodeH}
        fill="transparent"
      />
    </g>
  );
}

/** The wide drawing — md and up. */
function WideFigure() {
  const [active, setActive] = useState<string | null>(null);
  const dep = active ? DEPENDS[active] : null;

  const nodeRel = (id: string): Rel =>
    dep ? (dep.nodes.includes(id) ? "on" : "off") : undefined;
  const edgeRel = (key: string): Rel =>
    dep ? (dep.edges.includes(key) ? "on" : "off") : undefined;

  return (
    <svg
      data-hosp-chain
      data-focus={active ?? undefined}
      viewBox={`0 0 ${WIDE.w} ${WIDE.h}`}
      className="h-auto w-full"
      role="img"
      aria-label="One guest order placed at the Point of Sale reaches the Kitchen Display and Workforce, decreases Inventory, posts to Accounting, updates the guest's record in CRM, refreshes Live Insights and reaches IVA — each system responding without anyone re-entering the order."
      fill="none"
    >
      <defs>
        {/* The only glow in the figure, and it belongs to the charge alone. */}
        <filter id="hospCharge" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── The guest journey, condensed. It recedes as the systems come
             forward: the point of the figure is what happens behind it. ── */}
      <g className="hosp-journey">
        <text
          x={0}
          y={WIDE.journeyY - 18}
          fill={ACCENT}
          fillOpacity={0.55}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.28em"
        >
          GUEST JOURNEY
        </text>
        <line
          x1={0}
          y1={WIDE.journeyY - 8}
          x2={WIDE.w}
          y2={WIDE.journeyY - 8}
          {...trace}
        />
        {JOURNEY.map((stage, i) => (
          <g key={stage}>
            <text
              x={JOURNEY_X[i]}
              y={WIDE.journeyY + 14}
              textAnchor="middle"
              fill="#ffffff"
              fillOpacity={0.8}
              fontSize={14}
              fontWeight={600}
            >
              {stage}
            </text>
            {i < JOURNEY.length - 1 && (
              <line
                x1={JOURNEY_X[i] + 48}
                y1={WIDE.journeyY + 9}
                x2={JOURNEY_X[i + 1] - 48}
                y2={WIDE.journeyY + 9}
                {...trace}
              />
            )}
          </g>
        ))}
      </g>

      {/* ── The handoff ── */}
      <g className="hosp-handoff">
        {/* The guest's own run into the Point of Sale. It carries an edge
            key so the pointer can treat it as what the POS depends on —
            otherwise the origin of the chain would look like a dead
            hover. */}
        <path
          className="hosp-edge"
          data-edge={GUEST_EDGE}
          data-rel={edgeRel(GUEST_EDGE)}
          d={`M${WIDE.w / 2} ${WIDE.handoffTop} L${WIDE.w / 2} ${WIDE.handoffBottom}`}
          {...trace}
        />
        <text
          x={WIDE.w / 2}
          y={WIDE.handoffLabelY}
          textAnchor="middle"
          fill={ACCENT}
          fillOpacity={0.6}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.28em"
        >
          BEHIND EVERY GUEST MOMENT
        </text>
      </g>

      {/* ── The cascade ── */}
      <g>
        {CHAIN_EDGES.map(([from, to]) => (
          <path
            key={`${from}-${to}`}
            className="hosp-edge"
            data-edge={`${from}-${to}`}
            data-rel={edgeRel(`${from}-${to}`)}
            d={edgePath(from, to)}
            {...trace}
          />
        ))}
      </g>

      {CHAIN_NODES.map((n) => (
        <WideNode
          key={n.id}
          id={n.id}
          rel={nodeRel(n.id)}
          onEnter={setActive}
          onLeave={() => setActive(null)}
        />
      ))}

      {/* ── The ecosystem it all stands on ──
             The trunk down from IVA, then one line the full width of the
             drawing with all eight products sitting on it. The line is
             drawn last by the timeline: it is the closing statement, not
             part of the scaffolding. ── */}
      <g className="hosp-band">
        <path
          className="hosp-edge"
          d={`M${WIDE.pos.iva.cx} ${BAND.trunkTop} L${WIDE.pos.iva.cx} ${BAND.lineY}`}
          {...trace}
        />
        <text
          x={0}
          y={BAND.lineY - 12}
          fill={ACCENT}
          fillOpacity={0.55}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.28em"
        >
          {BAND_KICKER}
        </text>
        <path
          className="hosp-band-line"
          d={`M0 ${BAND.lineY} L${WIDE.w} ${BAND.lineY}`}
          stroke={ACCENT}
          strokeOpacity={0.4}
          strokeWidth={1.1}
          fill="none"
        />
        <line
          x1={0}
          y1={BAND.bottomY}
          x2={WIDE.w}
          y2={BAND.bottomY}
          {...trace}
          strokeOpacity={0.14}
        />
        {ECOSYSTEM.map((p, i) => {
          const s = ecoSpot(i);
          return (
            <g key={p.id} className="hosp-eco" data-eco={p.id}>
              <line
                className="hosp-eco-tick"
                x1={s.x}
                y1={BAND.lineY}
                x2={s.x}
                y2={BAND.lineY + s.tick}
                stroke={ACCENT}
                strokeOpacity={0.3}
                strokeWidth={1}
              />
              {/* Products are unboxed mono; the boxed sans above is a
                  capability. Two different kinds of thing, told apart by
                  their type rather than by a second colour. */}
              <text
                className="hosp-eco-name"
                x={s.x}
                y={s.y}
                textAnchor="middle"
                fill="#ffffff"
                fillOpacity={0.62}
                fontSize={11}
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* The signal. Parked off-stage until the timeline moves it. */}
      <circle
        className="hosp-charge"
        r={4}
        cx={WIDE.w / 2}
        cy={WIDE.handoffTop}
        fill={ACCENT}
        opacity={0}
        filter="url(#hospCharge)"
      />
    </svg>
  );
}

/**
 * The stacked rendering — below md.
 *
 * Real DOM text rather than a shrunken drawing, so the labels stay legible
 * and indexable. It carries the same `data-node` hooks, so the timeline
 * lights it identically.
 */
function StackedFigure() {
  return (
    <div className="mx-auto max-w-sm">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-cyan/55">
        Guest journey
      </p>
      <ol className="hosp-journey mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-sky/15 pb-4">
        {JOURNEY.map((stage, i) => (
          <li key={stage} className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white/80">{stage}</span>
            {i < JOURNEY.length - 1 && (
              <span className="h-px w-3 bg-cyan/35" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.28em] text-cyan/60">
        Behind every guest moment
      </p>

      <ol className="mt-4 space-y-2">
        {tiers().map((tier, ti) => (
          <li key={ti}>
            {ti > 0 && (
              <span
                className="mx-auto mb-2 block h-3 w-px bg-cyan/25"
                aria-hidden="true"
              />
            )}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {tier.map((n) => (
                <div
                  key={n.id}
                  className="hosp-node rounded-lg border border-sky/15 px-3 py-2.5 text-center"
                  data-node={n.id}
                >
                  <p className="text-sm font-semibold text-white/85">
                    {n.label}
                  </p>
                  {n.id === "inventory" ? (
                    <p className="hosp-node-note mt-0.5 font-mono text-[0.6875rem] text-cyan/75">
                      <span className="hosp-stock">{STOCK_FROM}</span> in stock
                    </p>
                  ) : n.note ? (
                    <p className="hosp-node-note mt-0.5 font-mono text-[0.6875rem] text-cyan/70">
                      {n.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <p className="hosp-iva-line mt-3 text-center text-sm text-sky/80">
        {IVA_LINE}
      </p>

      {/* The same band, stacked. One rule across the top of it does the
          same work the full-width line does in the drawing. */}
      <div className="mt-8">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-cyan/55">
          The Sharp ecosystem
        </p>
        <div className="hosp-band-line mt-3 h-px w-full bg-cyan/40" />
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
          {ECOSYSTEM.map((p) => (
            <li key={p.id} className="hosp-eco" data-eco={p.id}>
              <span className="hosp-eco-name font-mono text-[0.6875rem] tracking-[0.04em] text-white/60">
                {p.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HospitalityChain() {
  return (
    <>
      <div className="hidden md:block">
        <WideFigure />
      </div>
      <div className="md:hidden">
        <StackedFigure />
      </div>
    </>
  );
}
