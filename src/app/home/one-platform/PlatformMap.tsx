/*
 * Scene 03 — one platform, drawn in SVG.
 *
 * Narrative and architecture in one figure. The architecture is the three
 * bands: applications, the platform slab they run on, the foundation it
 * stands on. The narrative is what the slab is holding — the same customer
 * Scene 02 showed five systems disagreeing about, here recorded once.
 *
 * That pairing is why the scene exists. A diagram alone says "the parts are
 * connected", which is a claim about software. The record inside it says
 * "your customer exists once", which is a claim about the visitor's
 * business — and it answers the question Scene 02 asked.
 *
 * This replaced two 3D attempts, CSS-3D and then WebGL. Both were a board
 * seen from above, and both read as a render sitting on the page rather
 * than part of it. Flat SVG is resolution-independent, weighs nothing,
 * keeps the labels as real selectable text, and is built from the same
 * hairlines as every other scene — which is what makes it belong.
 */
import {
  FOUNDATION,
  FOUNDATION_W,
  MODULES,
  MODULE_W,
  RECORD,
  SLAB,
  TRUNKS,
  VIEW,
  Y,
  dropPath,
  trunkPath,
  FOOT_SPINE,
} from "./mapGeometry";

/** Band rules run the full width — a section line, not a border. */
const Rule = ({ y }: { y: number }) => (
  <line className="hp-map-band" x1={0} x2={VIEW.w} y1={y} y2={y} />
);

export function PlatformMap() {
  return (
    <svg
      className="hp-map"
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      role="img"
      aria-label="Six applications — CRM, Operations, Marketplace, Accounting, People and Communication — running on one Sharpnr platform that holds a single shared customer record, standing on one foundation of identity, permissions, storage, events, automation and intelligence."
    >
      <defs>
        {/* The only glow in the scene, and it belongs to the charges alone.
            Lighting every static trace is what makes a diagram look
            generated; a signal in motion is the one thing that earns it. */}
        <filter id="mapGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Band: applications ── */}
      <text className="hp-map-band-label" x={0} y={Y.headA}>
        Applications
      </text>

      <g className="hp-map-traces" fill="none">
        {MODULES.map((m) => (
          <path
            key={m.label}
            className="hp-map-trace"
            data-label={m.label}
            d={dropPath(m)}
          />
        ))}
        {TRUNKS.map((x, i) => (
          <path
            key={x}
            className={`hp-map-trace is-trunk${i === 1 ? " is-main" : ""}`}
            d={trunkPath(x)}
          />
        ))}
        <path className="hp-map-trace is-trunk" d={FOOT_SPINE} />
      </g>

      {/* No rule between applications and the slab — the slab's own top
          edge already divides them, and a second line was clutter. */}

      <g className="hp-map-modules">
        {MODULES.map((m) => {
          const y = m.row === 0 ? Y.rowA : Y.rowB;
          return (
            <g key={m.label} className="hp-map-module" data-label={m.label}>
              <rect
                x={m.cx - MODULE_W / 2}
                y={y}
                width={MODULE_W}
                height={Y.moduleH}
                rx="2"
              />
              <text className="is-name" x={m.cx} y={y + 21}>
                {m.label}
              </text>
              <text
                className="is-sub"
                x={m.cx}
                y={y + 37}
                /* Varied per module so the row reads as set by hand. */
                style={{ opacity: m.tint }}
              >
                {m.sub}
              </text>
            </g>
          );
        })}
      </g>

      {/* ── Band: the platform ──
          A slab running edge to edge. As a rounded box the size of a module
          it read as another application in the stack. */}
      <g className="hp-map-slab">
        <rect x={0} y={SLAB.y} width={VIEW.w} height={SLAB.h} />
        <line
          className="hp-map-slab-edge"
          x1={0}
          x2={VIEW.w}
          y1={SLAB.y}
          y2={SLAB.y}
        />
        <line
          className="hp-map-slab-edge"
          x1={0}
          x2={VIEW.w}
          y1={SLAB.y + SLAB.h}
          y2={SLAB.y + SLAB.h}
        />
        <text className="hp-map-slab-name" x={22} y={SLAB.y + 24}>
          {RECORD.slab}
        </text>

        {/* The one record, as a system-of-record entry */}
        <g className="hp-map-record">
          <text className="is-kind" x={22} y={SLAB.y + 46}>
            {RECORD.kind}
          </text>
          <text className="is-name" x={22} y={SLAB.y + 68}>
            {RECORD.name}
          </text>
          {RECORD.fields.map(([k, v], i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 22 + col * 268;
            const y = SLAB.y + 90 + row * 18;
            return (
              <g key={k}>
                <text className="is-key" x={x} y={y}>
                  {k}
                </text>
                <text className="is-val" x={x + 64} y={y}>
                  {v}
                </text>
              </g>
            );
          })}
        </g>
      </g>

      {/* ── Band: the foundation ── */}
      <Rule y={Y.ruleB} />
      <text className="hp-map-band-label" x={0} y={Y.headB}>
        Foundation
      </text>

      <g className="hp-map-foundation">
        {FOUNDATION.map((f) => {
          const y = f.row === 0 ? Y.fRowA : Y.fRowB;
          return (
            <g key={f.label}>
              <rect
                x={f.cx - FOUNDATION_W / 2}
                y={y}
                width={FOUNDATION_W}
                height={Y.foundationH}
                rx="2"
              />
              <text x={f.cx} y={y + Y.foundationH / 2 + 4}>
                {f.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* ── Charges ── */}
      <g className="hp-map-charges" filter="url(#mapGlow)">
        {MODULES.map((m) => (
          <circle
            key={m.label}
            className="hp-map-charge"
            r="3.5"
            cx={m.cx}
            cy={(m.row === 0 ? Y.rowA : Y.rowB) + Y.moduleH}
          />
        ))}
      </g>
    </svg>
  );
}
