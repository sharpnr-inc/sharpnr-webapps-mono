/*
 * Industries — the sector motif behind each section.
 *
 * A very faint architectural line drawing that says what kind of place
 * this industry happens in: a floor plan for hospitality, a ward corridor
 * for healthcare, a shelf run for retail, a production line for
 * manufacturing. It is atmosphere, not information — nothing here is ever
 * the only place a fact appears.
 *
 * The constraints matter more than the idea, and every one of them comes
 * from design.md §2:
 *
 *   Strokes on transparent. Never a background plate. No section on this
 *   site paints its own background; a solid fill over the root's ink wash
 *   flattens it and breaks the continuity that makes the site feel like
 *   one object rather than a stack of panels.
 *
 *   Felt, not read. The wrapper holds it at the opacity the hero field
 *   uses. If a motif competes with the flow diagram in front of it, it is
 *   too strong — the diagram is the content, this is the room it is in.
 *
 *   One accent, one weight, no glow, no gradient. Same blueprint language
 *   as every other drawing on the page.
 *
 * Each is built from a repeat rather than drawn as a picture: a corridor
 * with rooms off it, a rack of units, a colonnade of bays. Repetition is
 * what architectural drawing actually looks like at a distance, and it is
 * also what survives being scaled to the height of a section.
 *
 * All eight share one 600×360 stage so their line weights match, and every
 * one is `aria-hidden` — the industry name beside it is real text and
 * carries the meaning on its own.
 */

const ACCENT = "#00b4d8";

/** Shared stage. Nothing may be drawn outside it. */
const VIEW = { w: 600, h: 360 } as const;

const ink = { stroke: ACCENT, strokeWidth: 1, fill: "none" } as const;

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Hospitality — a floor plan: rooms off a corridor. */
const Hospitality = () => (
  <>
    <line x1={20} y1={170} x2={580} y2={170} {...ink} />
    <line x1={20} y1={196} x2={580} y2={196} {...ink} />
    <line x1={20} y1={54} x2={580} y2={54} {...ink} />
    <line x1={20} y1={312} x2={580} y2={312} {...ink} />
    {range(9).map((i) => (
      <line
        key={`u${i}`}
        x1={20 + i * 70}
        y1={54}
        x2={20 + i * 70}
        y2={170}
        {...ink}
      />
    ))}
    {range(9).map((i) => (
      <line
        key={`d${i}`}
        x1={20 + i * 70}
        y1={196}
        x2={20 + i * 70}
        y2={312}
        {...ink}
      />
    ))}
    {range(8).map((i) => (
      <line
        key={`t${i}`}
        x1={44 + i * 70}
        y1={160}
        x2={64 + i * 70}
        y2={160}
        {...ink}
      />
    ))}
  </>
);

/** Healthcare — a ward corridor with bays either side. */
const Healthcare = () => (
  <>
    <line x1={10} y1={180} x2={590} y2={180} {...ink} />
    {range(6).map((i) => (
      <g key={i}>
        <rect x={22 + i * 96} y={78} width={76} height={82} {...ink} />
        <line
          x1={34 + i * 96}
          y1={140}
          x2={86 + i * 96}
          y2={140}
          {...ink}
        />
        <rect x={22 + i * 96} y={200} width={76} height={82} {...ink} />
        <line
          x1={34 + i * 96}
          y1={220}
          x2={86 + i * 96}
          y2={220}
          {...ink}
        />
      </g>
    ))}
  </>
);

/** Technology & Enterprise — racks of units. */
const Technology = () => (
  <>
    {range(4).map((i) => (
      <g key={i}>
        <rect x={36 + i * 140} y={50} width={104} height={264} {...ink} />
        {range(7).map((r) => (
          <line
            key={r}
            x1={36 + i * 140}
            y1={84 + r * 34}
            x2={140 + i * 140}
            y2={84 + r * 34}
            {...ink}
          />
        ))}
        {range(7).map((r) => (
          <line
            key={`u${r}`}
            x1={48 + i * 140}
            y1={70 + r * 34}
            x2={72 + i * 140}
            y2={70 + r * 34}
            {...ink}
          />
        ))}
      </g>
    ))}
  </>
);

/** Digital Commerce — pick runs and the routes between them. */
const Commerce = () => (
  <>
    {[96, 180, 264].map((y) => (
      <g key={y}>
        <line x1={20} y1={y} x2={580} y2={y} {...ink} />
        {range(10).map((i) => (
          <rect
            key={i}
            x={30 + i * 56}
            y={y - 22}
            width={36}
            height={22}
            {...ink}
          />
        ))}
      </g>
    ))}
    <line x1={300} y1={60} x2={300} y2={300} {...ink} />
    <line x1={140} y1={300} x2={460} y2={300} {...ink} />
  </>
);

/** Education — a colonnade of bays on a datum. */
const Education = () => (
  <>
    <path d="M40 96 L300 40 L560 96" {...ink} />
    <line x1={30} y1={110} x2={570} y2={110} {...ink} />
    <line x1={30} y1={124} x2={570} y2={124} {...ink} />
    {range(9).map((i) => (
      <g key={i}>
        <line
          x1={54 + i * 62}
          y1={124}
          x2={54 + i * 62}
          y2={286}
          {...ink}
        />
        <line
          x1={46 + i * 62}
          y1={286}
          x2={62 + i * 62}
          y2={286}
          {...ink}
        />
      </g>
    ))}
    <line x1={30} y1={300} x2={570} y2={300} {...ink} />
  </>
);

/** Professional Services — sheets on a desk, ruled. */
const Professional = () => (
  <>
    {range(3).map((i) => (
      <g key={i}>
        <rect x={50 + i * 168} y={50 + i * 22} width={172} height={240} {...ink} />
        {range(7).map((r) => (
          <line
            key={r}
            x1={70 + i * 168}
            y1={92 + i * 22 + r * 28}
            x2={202 + i * 168}
            y2={92 + i * 22 + r * 28}
            {...ink}
          />
        ))}
      </g>
    ))}
  </>
);

/** Manufacturing — one line, and the stations along it. */
const Manufacturing = () => (
  <>
    <line x1={10} y1={214} x2={590} y2={214} {...ink} />
    <line x1={10} y1={226} x2={590} y2={226} {...ink} />
    {range(5).map((i) => (
      <g key={i}>
        <rect x={40 + i * 112} y={128} width={80} height={86} {...ink} />
        <line
          x1={56 + i * 112}
          y1={158}
          x2={104 + i * 112}
          y2={158}
          {...ink}
        />
        <line
          x1={80 + i * 112}
          y1={226}
          x2={80 + i * 112}
          y2={286}
          {...ink}
        />
      </g>
    ))}
    {range(15).map((i) => (
      <line
        key={`h${i}`}
        x1={20 + i * 40}
        y1={286}
        x2={36 + i * 40}
        y2={300}
        {...ink}
      />
    ))}
  </>
);

/** Retail — parallel shelf runs. */
const Retail = () => (
  <>
    {[80, 140, 200, 260, 320].map((y) => (
      <g key={y}>
        <line x1={30} y1={y} x2={570} y2={y} {...ink} />
        {range(10).map((i) => (
          <line
            key={i}
            x1={54 + i * 58}
            y1={y - 26}
            x2={54 + i * 58}
            y2={y}
            {...ink}
          />
        ))}
      </g>
    ))}
  </>
);

const MOTIF: Record<string, () => React.ReactNode> = {
  hospitality: Hospitality,
  healthcare: Healthcare,
  technology: Technology,
  commerce: Commerce,
  education: Education,
  professional: Professional,
  manufacturing: Manufacturing,
  retail: Retail,
};

/**
 * The motif, positioned by its caller.
 *
 * `preserveAspectRatio` is left at its default so the drawing is never
 * stretched — a motif squashed to a section's proportions stops looking
 * like a plan and starts looking like a texture. The caller gives it a
 * width and lets the height follow.
 */
export function IndustryMotif({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const Motif = MOTIF[id];
  if (!Motif) return null;
  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <Motif />
    </svg>
  );
}
