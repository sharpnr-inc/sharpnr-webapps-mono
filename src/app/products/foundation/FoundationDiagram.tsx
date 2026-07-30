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
 *
 * ── It answers the pointer ──
 * The two directions of the claim are the two hovers, and between them they
 * are the whole argument:
 *
 *   point at a capability   its own drop lights, and the run continues
 *                           through the shared bus and down into the slab —
 *                           this one thing stands on that one thing.
 *   point at a foundation   *every* capability's drop lights at once, and
 *   cell                    the other three cells quieten — all of them
 *                           rest on this.
 *
 * The second is the one that could not be said in copy without a sentence
 * the visitor would have to take on trust.
 *
 * The rules live in `src/index.css` under "Four passive figures", and are
 * written entirely in stroke-opacity / stroke-width / fill — never
 * `opacity`, which the section's GSAP entrance owns on `.pf-mod`,
 * `.pf-slab` and `.pf-cell` (design.md §11, trap 1).
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
      data-foundation
      viewBox={`0 0 ${RIGHT + LEFT} 232`}
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      {/* The three sets of words come off below `md`, where the drawing is
          scaled to fit a phone and 8px type would land at ~4px. The section
          prints the four names underneath instead, at a size a phone can
          actually read. */}
      <text
        className="max-md:hidden"
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

      {mods.map((x, i) => (
        <g key={x} className="pf-mod" data-mod={i}>
          <rect className="pf-mod-box" x={x} y={28} width={MOD_W} height={26} {...edge} />
          <path
            className="pf-trace pf-drop"
            d={`M${x + MOD_W / 2} 54 L${x + MOD_W / 2} ${BUS_Y}`}
            {...faint}
          />
          <rect
            className="pf-mod-pad"
            x={x + MOD_W / 2 - 2}
            y={BUS_Y - 2}
            width={4}
            height={4}
            {...edge}
          />
          {/* Stroke-only shapes cannot be pointed at — the plate is the
              module's hit area, sized to the box and its drop. */}
          <rect
            className="pf-hit"
            x={x}
            y={22}
            width={MOD_W}
            height={BUS_Y - 22}
            fill="transparent"
          />
        </g>
      ))}

      {/* The bus. One continuous run — never drawn as segments, because
          the point is that it was one piece from the start. */}
      <path
        className="pf-trace pf-bus"
        d={`M${LEFT} ${BUS_Y} L${RIGHT} ${BUS_Y}`}
        {...base}
      />
      <path
        className="pf-trace pf-riser"
        d={`M${(LEFT + RIGHT) / 2} ${BUS_Y} L${(LEFT + RIGHT) / 2} ${SLAB_TOP}`}
        {...base}
      />

      {/* The slab: one object, divided. Not four boxes placed next to each
          other — four cells cut out of the same piece. */}
      <g className="pf-slab">
        <rect
          className="pf-slab-box"
          x={LEFT}
          y={SLAB_TOP}
          width={RIGHT - LEFT}
          height={SLAB_H}
          {...base}
        />
        {FOUNDATION.slice(1).map((label, i) => (
          <line
            key={label}
            className="pf-slab-div"
            x1={LEFT + CELL_W * (i + 1)}
            y1={SLAB_TOP}
            x2={LEFT + CELL_W * (i + 1)}
            y2={SLAB_TOP + SLAB_H}
            {...faint}
          />
        ))}
      </g>

      {FOUNDATION.map((label, i) => (
        <g
          key={label}
          className="pf-cellgroup"
          data-cell={label.toLowerCase()}
        >
          {/* The cell's hit area is the whole cut-out, not just its label,
              so the pointer target matches the thing being claimed. */}
          <rect
            className="pf-cell-plate"
            x={LEFT + CELL_W * i}
            y={SLAB_TOP}
            width={CELL_W}
            height={SLAB_H}
            fill="transparent"
          />
          <text
            className="pf-cell max-md:hidden"
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
        </g>
      ))}

      <text
        className="max-md:hidden"
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
