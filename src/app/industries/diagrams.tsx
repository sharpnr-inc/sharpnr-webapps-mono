/*
 * Industries — the two page diagrams.
 *
 * Same blueprint language as the homepage principle tiles (`src/app/home/
 * why/skeletons.tsx`): strokes only, one accent, no gradient, no glow, no
 * filled shape that carries meaning. Both replace earlier drawings that
 * were made of filled circles and a solid navy slab — those read as a
 * marketing graphic on a white page, and on the dark canvas they read as
 * holes punched in it.
 *
 * Each has to prove its heading with the text removed:
 *
 *   the rail — eight businesses whose *own* structure is all different and
 *   whose foundation is one unbroken line;
 *
 *   the group — six divisions, each still its own enclosure, joined to one
 *   shared core by right-angled runs rather than by being absorbed into it.
 *
 * Both keep the class hooks the existing GSAP hooks animate
 * (`ind-hero-*`, `multi-*`), and every drawn connector stays a <path> so
 * DrawSVGPlugin can still measure it.
 */

const ACCENT = "#00b4d8";

const edge = { stroke: ACCENT, strokeOpacity: 0.55, strokeWidth: 1.2 } as const;
const faint = { stroke: ACCENT, strokeOpacity: 0.3, strokeWidth: 1 } as const;
const base = { stroke: ACCENT, strokeOpacity: 0.9, strokeWidth: 1.8 } as const;

const LABEL = {
  fill: "#90e0ef",
  fillOpacity: 0.72,
  fontSize: 12,
  fontWeight: 500,
} as const;

/*
 * Eight businesses. `parts` is the number of internal divisions drawn
 * inside each module — a café is not a factory, and the diagram says so
 * before a single label is read. Widths vary for the same reason.
 */
const BUSINESSES = [
  { label: "Hotel", w: 96, parts: 4 },
  { label: "Restaurant", w: 88, parts: 3 },
  { label: "Café", w: 64, parts: 2 },
  { label: "Hospital", w: 100, parts: 5 },
  { label: "Retail store", w: 84, parts: 3 },
  { label: "University", w: 92, parts: 4 },
  { label: "Factory", w: 88, parts: 4 },
  { label: "Office", w: 68, parts: 2 },
] as const;

const PITCH = 112.5;
const FIRST = 40 + PITCH / 2;

/**
 * Industries hero — different above, identical below.
 *
 * The rail is drawn as ONE line across the whole width and is never broken
 * under a module, because the claim is that the foundation is the same
 * thing for all of them rather than eight foundations that happen to line
 * up. Only the modules on top of it differ.
 */
export function IndustryRailDiagram() {
  return (
    <svg
      viewBox="0 0 980 232"
      role="img"
      aria-label="Hotels, restaurants, cafés, hospitals, stores, universities, factories and offices — each a different operation, all standing on one shared Sharpnr platform"
      className="h-auto w-full"
      fill="none"
    >
      {/* Stems — every business drops to the same rail. */}
      <g>
        {BUSINESSES.map((b, i) => {
          const cx = FIRST + i * PITCH;
          return (
            <path
              key={`l-${b.label}`}
              className="ind-hero-line"
              d={`M${cx} 128 L${cx} 172`}
              {...faint}
            />
          );
        })}
      </g>

      {BUSINESSES.map((b, i) => {
        const cx = FIRST + i * PITCH;
        const x = cx - b.w / 2;
        const step = b.w / b.parts;
        return (
          <g key={b.label} className="ind-hero-node">
            <text x={cx} y={54} textAnchor="middle" {...LABEL}>
              {b.label}
            </text>
            <rect x={x} y={72} width={b.w} height={56} {...edge} />
            {/* Its own internal structure — this is what differs. */}
            {Array.from({ length: b.parts - 1 }).map((_, k) => (
              <line
                key={k}
                x1={x + step * (k + 1)}
                y1={72}
                x2={x + step * (k + 1)}
                y2={128}
                {...faint}
              />
            ))}
            <line x1={x} y1={110} x2={x + b.w} y2={110} {...faint} />
          </g>
        );
      })}

      {/* One rail. Unbroken, full width, identical under every module. */}
      <g className="ind-hero-platform">
        <line x1={40} y1={172} x2={940} y2={172} {...base} />
        {BUSINESSES.map((b, i) => {
          const cx = FIRST + i * PITCH;
          return (
            <line
              key={`t-${b.label}`}
              x1={cx - 9}
              y1={180}
              x2={cx + 9}
              y2={180}
              {...edge}
            />
          );
        })}
        <text
          x={490}
          y={210}
          textAnchor="middle"
          fill={ACCENT}
          fillOpacity={0.6}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.28em"
        >
          ONE CONNECTED PLATFORM
        </text>
      </g>
    </svg>
  );
}

/*
 * A diversified group. Three divisions each side of one core, connected by
 * right-angled runs — the routing is deliberately orthogonal rather than
 * radial: a spoke wheel says "satellites of a hub", and the argument here
 * is that each business is a whole enclosure in its own right that happens
 * to be wired to a shared core.
 */
const DIVISIONS = [
  { name: "Hospitality", x: 20, y: 44, side: "l" },
  { name: "Education", x: 20, y: 202, side: "l" },
  { name: "Manufacturing", x: 20, y: 360, side: "l" },
  { name: "Healthcare", x: 410, y: 44, side: "r" },
  { name: "Retail", x: 410, y: 202, side: "r" },
  { name: "Software", x: 410, y: 360, side: "r" },
] as const;

const DIV_W = 130;
const DIV_H = 48;
const CORE = { x: 224, y: 192, w: 112, h: 96 };

/** L-shaped run from a division's inner edge to the core's edge. */
function runPath(d: (typeof DIVISIONS)[number]) {
  const cy = d.y + DIV_H / 2;
  const coreMidY = CORE.y + CORE.h / 2;
  if (d.side === "l") {
    const from = d.x + DIV_W;
    const turn = 186;
    return `M${from} ${cy} L${turn} ${cy} L${turn} ${coreMidY} L${CORE.x} ${coreMidY}`;
  }
  const from = d.x;
  const turn = 374;
  const coreRight = CORE.x + CORE.w;
  return `M${from} ${cy} L${turn} ${cy} L${turn} ${coreMidY} L${coreRight} ${coreMidY}`;
}

/**
 * Multi-industry — every division still its own enclosure.
 *
 * The core is an outline, not a filled disc: a solid mass would say the
 * businesses feed something that owns them. What is actually shared is a
 * foundation, so it is drawn as a frame the runs terminate on.
 */
export function MultiIndustryDiagram() {
  return (
    <svg
      viewBox="0 0 560 432"
      role="img"
      aria-label="Six business divisions — hospitality, education, manufacturing, healthcare, retail and software — each connected to one shared Sharpnr foundation"
      className="h-auto w-full max-w-md"
      fill="none"
    >
      <g>
        {DIVISIONS.map((d) => (
          <path
            key={`s-${d.name}`}
            className="multi-spoke"
            d={runPath(d)}
            {...faint}
          />
        ))}
      </g>

      {DIVISIONS.map((d) => (
        <g key={d.name} className="multi-node">
          <rect x={d.x} y={d.y} width={DIV_W} height={DIV_H} {...edge} />
          {/* A hairline floor inside each one — every division is a whole
              business, not a box with a name in it. */}
          <line
            x1={d.x + 10}
            y1={d.y + DIV_H - 11}
            x2={d.x + DIV_W - 10}
            y2={d.y + DIV_H - 11}
            {...faint}
          />
          <text
            x={d.x + DIV_W / 2}
            y={d.y + 24}
            textAnchor="middle"
            {...LABEL}
          >
            {d.name}
          </text>
        </g>
      ))}

      <g className="multi-core">
        <rect
          x={CORE.x}
          y={CORE.y}
          width={CORE.w}
          height={CORE.h}
          {...base}
        />
        <rect
          x={CORE.x + 7}
          y={CORE.y + 7}
          width={CORE.w - 14}
          height={CORE.h - 14}
          {...faint}
        />
        <text
          x={280}
          y={234}
          textAnchor="middle"
          fill="#caf0f8"
          fillOpacity={0.9}
          fontSize={12}
          fontWeight={600}
        >
          Shared
        </text>
        <text
          x={280}
          y={250}
          textAnchor="middle"
          fill="#caf0f8"
          fillOpacity={0.9}
          fontSize={12}
          fontWeight={600}
        >
          foundation
        </text>
      </g>
    </svg>
  );
}
