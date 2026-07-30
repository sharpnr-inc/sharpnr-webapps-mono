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
 *   the rail — eight industries whose *own* shape is all different and
 *   whose foundation is one unbroken line, with the one that exists today
 *   drawn at full weight and the seven being designed drawn back;
 *
 *   the group — six divisions, each still its own enclosure, joined to one
 *   shared core by right-angled runs rather than by being absorbed into it.
 *
 * Both keep the class hooks the existing GSAP hooks animate
 * (`ind-hero-*`, `multi-*`), and every drawn connector stays a <path> so
 * DrawSVGPlugin can still measure it.
 */
import { INDUSTRY_GLYPH } from "./glyph-registry";
import { IndustryGlyph } from "./glyphs";
import { INDUSTRIES, STATUS_SHORT } from "./roadmap";
import { StatusChip } from "./StatusChip";

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

/* ── The hero rail ────────────────────────────────────────────────────
   One 112.5-unit column per industry, 40 units of margin each side. Every
   number below is a row in that grid; nothing is positioned by eye. */
const PITCH = 112.5;
const FIRST = 40 + PITCH / 2;
const RAIL = {
  glyphTop: 6,
  nameY: 68,
  lineH: 14,
  statusY: 102,
  stemTop: 112,
  y: 136,
  tick: 8,
  kickerY: 172,
} as const;

const railLabel = INDUSTRIES.map((i) => i.name).join(", ");

/**
 * Industries hero — different above, identical below.
 *
 * Two claims in one figure, which is why it has been moved into the hero:
 * it *is* the page's argument, and it was previously sitting below the
 * fold where nobody reached it.
 *
 *   different above  each industry is drawn as itself, not as the same
 *                    rectangle with a different caption.
 *   identical below  the rail is ONE line across the whole width and is
 *                    never broken under a column, because the claim is
 *                    that the foundation is the same thing for all of
 *                    them rather than eight that happen to line up.
 *
 * The third thing it says is the honest one. Hospitality is drawn at full
 * weight and carries the accent; the seven being designed are drawn back,
 * and each column states its own status in type. A visitor who reads
 * nothing else on the page still leaves knowing which one exists.
 */
export function IndustryRailDiagram() {
  return (
    <svg
      viewBox="0 0 980 190"
      role="img"
      aria-label={`${railLabel} — each a different operation, all standing on one shared Sharpnr platform. Hospitality is available today; the rest are in design.`}
      className="h-auto w-full"
      fill="none"
    >
      {/* Stems — every industry drops to the same rail. */}
      <g>
        {INDUSTRIES.map((ind, i) => {
          const cx = FIRST + i * PITCH;
          return (
            <path
              key={`l-${ind.id}`}
              className="ind-hero-line"
              d={`M${cx} ${RAIL.stemTop} L${cx} ${RAIL.y}`}
              {...faint}
            />
          );
        })}
      </g>

      {INDUSTRIES.map((ind, i) => {
        const cx = FIRST + i * PITCH;
        const Glyph = INDUSTRY_GLYPH[ind.id];
        const live = ind.status === "available";
        return (
          <g key={ind.id} className="ind-hero-node">
            {/* The glyph is drawn at 1:1 into this stage, never scaled, so
                its line weight matches the rail's rather than being
                thinned or thickened by a transform. */}
            <g
              transform={`translate(${cx - 32} ${RAIL.glyphTop})`}
              opacity={live ? 1 : 0.55}
            >
              {Glyph ? <Glyph /> : null}
            </g>

            {ind.lines.map((line, li) => (
              <text
                key={line}
                x={cx}
                y={RAIL.nameY + li * RAIL.lineH}
                textAnchor="middle"
                {...LABEL}
                fill={live ? "#ffffff" : LABEL.fill}
                fillOpacity={live ? 0.92 : 0.6}
              >
                {line}
              </text>
            ))}

            <text
              x={cx}
              y={RAIL.statusY}
              textAnchor="middle"
              fill={live ? ACCENT : "#5c87b5"}
              fillOpacity={live ? 0.95 : 0.75}
              fontSize={9}
              fontFamily="var(--font-mono)"
              letterSpacing="0.14em"
            >
              {STATUS_SHORT[ind.status]}
            </text>
          </g>
        );
      })}

      {/* One rail. Unbroken, full width, identical under every column. */}
      <g className="ind-hero-platform">
        <line x1={40} y1={RAIL.y} x2={940} y2={RAIL.y} {...base} />
        {INDUSTRIES.map((ind, i) => {
          const cx = FIRST + i * PITCH;
          return (
            <line
              key={`t-${ind.id}`}
              x1={cx}
              y1={RAIL.y}
              x2={cx}
              y2={RAIL.y + RAIL.tick}
              {...edge}
            />
          );
        })}
        <text
          x={490}
          y={RAIL.kickerY}
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

/**
 * The same eight, stacked — below md.
 *
 * A 980-unit drawing at 375px is illegible rather than small, and the
 * industry names are the page's most important search surface, so on a
 * phone they are laid out as an ordinary list instead of being shrunk or
 * dropped. Same three facts per row as a column of the rail: glyph, name,
 * status.
 */
export function IndustryRoadmapList({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-x-6 gap-y-3 sm:grid-cols-2 ${className}`}>
      {INDUSTRIES.map((ind) => (
        <li
          key={ind.id}
          className="flex items-center gap-3 border-t border-sky/12 pt-3"
        >
          <IndustryGlyph
            id={ind.id}
            className={`h-6 w-9 shrink-0 ${
              ind.status === "available" ? "" : "opacity-55"
            }`}
          />
          <span
            className={`flex-1 text-sm font-medium ${
              ind.status === "available" ? "text-white" : "text-mute"
            }`}
          >
            {ind.name}
          </span>
          <StatusChip status={ind.status} />
        </li>
      ))}
    </ul>
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
