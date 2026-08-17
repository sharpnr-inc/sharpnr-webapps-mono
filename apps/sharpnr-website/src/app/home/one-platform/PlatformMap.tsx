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
  OBJECTS,
  OBJECT_W,
  SLAB,
  SLAB_LABEL,
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
      /* Describes what is drawn, accurately. It previously said the
         platform "holds a single shared customer record" — the same error
         the picture made. The platform holds the business objects an
         organization shares; each application writes the ones it owns. */
      aria-label="CRM, Operations, Marketplace, Accounting, People and Communication running on one Sharpnr platform. The platform is a shared system of record holding the customers, orders, invoices, employees, products and bookings the business runs on, with each application writing the objects it owns. Underneath it are the platform services every application uses: identity, permissions, storage, events, automation and intelligence."
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
            <g
              key={m.label}
              className="hp-map-module"
              data-label={m.label}
              /* Read by the hover rules: pointing at an application lights
                 the record it writes, which is the interaction claude.md
                 always specified and the single-record slab could not
                 actually express. */
              data-writes={m.writes}
            >
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
        <text className="hp-map-slab-name" x={22} y={SLAB.y + 26}>
          {SLAB_LABEL}
        </text>

        {/* The business objects the platform holds.

            One row of six, not a 3×2 grid: the bands above and below are
            both 3×2, and a third would have made the figure one shape
            repeated three times. The band carrying the argument should not
            look like the bands either side of it. */}
        <g className="hp-map-objects">
          {OBJECTS.map((o) => (
            <g key={o.id} className="hp-map-object" data-object={o.id}>
              <rect
                x={o.cx - OBJECT_W / 2}
                y={Y.objRow}
                width={OBJECT_W}
                height={Y.objectH}
                rx="2"
              />
              <text x={o.cx} y={Y.objRow + Y.objectH / 2 + 4}>
                {o.label}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* ── Band: platform services ──
          Named "Platform services", not "Foundation". The slab above is now
          the *business* foundation, and two bands both called foundation in
          one figure is a diagram arguing with itself. */}
      <Rule y={Y.ruleB} />
      <text className="hp-map-band-label" x={0} y={Y.headB}>
        Platform services
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
