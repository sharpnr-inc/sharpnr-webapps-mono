/*
 * The argument the rest of the page never actually makes: why any of this
 * belongs together.
 *
 * Nine capabilities on one rail, every one of them routed into a single
 * slab — and the slab is one object, divided rather than assembled, because
 * that is the claim. Buying nine pieces of business software gives you nine
 * foundations; this gives you one, and the four things printed on it are
 * the four things that stop being your problem.
 *
 * Blueprint language, unchanged from Scene 06's skeletons: hairline
 * strokes, one accent, no fill that carries meaning, no glow, no gradient.
 * The GSAP entrance is driven from the section; everything here is static
 * markup with hooks on it (`.pf-mod`, `.pf-trace`, `.pf-slab`, `.pf-cell`).
 */
const ACCENT = "#00b4d8";

const edge = { stroke: ACCENT, strokeOpacity: 0.55, strokeWidth: 1.1 } as const;
const faint = { stroke: ACCENT, strokeOpacity: 0.28, strokeWidth: 1 } as const;
const base = { stroke: ACCENT, strokeOpacity: 0.9, strokeWidth: 1.6 } as const;

/* Nine modules, one per capability, in the order the page introduced them.
   Unlabelled: nine names at this size would be a legend, and the diagram
   has to work as a shape before it works as a list. */
const COLS = 9;
const MOD_W = 56;
const GAP = 9;
const LEFT = 28;
const BUS_Y = 92;
const SLAB_TOP = 124;
const SLAB_H = 74;
const RIGHT = LEFT + COLS * MOD_W + (COLS - 1) * GAP;

const FOUNDATION = ["Identity", "Permissions", "Data", "Intelligence"];
const CELL_W = (RIGHT - LEFT) / FOUNDATION.length;

export function FoundationDiagram() {
  const mods = Array.from({ length: COLS }, (_, i) => LEFT + i * (MOD_W + GAP));

  return (
    <svg
      viewBox={`0 0 ${RIGHT + LEFT} 232`}
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      <text
        x={LEFT}
        y={16}
        fill={ACCENT}
        fillOpacity={0.5}
        fontSize={8}
        fontFamily="var(--font-mono)"
        letterSpacing="0.24em"
      >
        EVERY CAPABILITY
      </text>

      {mods.map((x) => (
        <g key={x} className="pf-mod">
          <rect x={x} y={28} width={MOD_W} height={26} {...edge} />
          <path
            className="pf-trace"
            d={`M${x + MOD_W / 2} 54 L${x + MOD_W / 2} ${BUS_Y}`}
            {...faint}
          />
          <rect
            x={x + MOD_W / 2 - 2}
            y={BUS_Y - 2}
            width={4}
            height={4}
            {...edge}
          />
        </g>
      ))}

      {/* The bus. One continuous run — never drawn as segments, because
          the point is that it was one piece from the start. */}
      <path className="pf-trace" d={`M${LEFT} ${BUS_Y} L${RIGHT} ${BUS_Y}`} {...base} />
      <path
        className="pf-trace"
        d={`M${(LEFT + RIGHT) / 2} ${BUS_Y} L${(LEFT + RIGHT) / 2} ${SLAB_TOP}`}
        {...base}
      />

      {/* The slab: one object, divided. Not four boxes placed next to each
          other — four cells cut out of the same piece. */}
      <g className="pf-slab">
        <rect
          x={LEFT}
          y={SLAB_TOP}
          width={RIGHT - LEFT}
          height={SLAB_H}
          {...base}
        />
        {FOUNDATION.slice(1).map((label, i) => (
          <line
            key={label}
            x1={LEFT + CELL_W * (i + 1)}
            y1={SLAB_TOP}
            x2={LEFT + CELL_W * (i + 1)}
            y2={SLAB_TOP + SLAB_H}
            {...faint}
          />
        ))}
      </g>

      {FOUNDATION.map((label, i) => (
        <text
          key={label}
          className="pf-cell"
          x={LEFT + CELL_W * i + CELL_W / 2}
          y={SLAB_TOP + SLAB_H / 2 + 3}
          fill={ACCENT}
          fillOpacity={0.75}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.18em"
          textAnchor="middle"
        >
          {label.toUpperCase()}
        </text>
      ))}

      <text
        x={LEFT}
        y={SLAB_TOP + SLAB_H + 18}
        fill={ACCENT}
        fillOpacity={0.5}
        fontSize={8}
        fontFamily="var(--font-mono)"
        letterSpacing="0.24em"
      >
        ONE FOUNDATION
      </text>
    </svg>
  );
}
