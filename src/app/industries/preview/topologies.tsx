/*
 * One shape per sector — not one shape with seven label sets.
 *
 * The first version of this page drew every industry as a left-to-right
 * chain of five equal boxes. Fed different arrays it produced seven
 * pictures that were the same picture, and worse, it was *wrong* about
 * most of them. A chain says "these steps happen once, in order, and then
 * they are finished". That is true of a guest order. It is not true of
 * care, which recurs against a record that never ends, and it is not true
 * of replenishment, which is a loop whose whole point is that it closes.
 * An illustration that only decorates is worse than none (design.md §6).
 *
 * So the topology is the argument, and it changes per sector. What does
 * NOT change is the vocabulary: the same hairline weights, the same single
 * #00b4d8 accent, the same 800-unit viewBox family, mono for machine text
 * and sans for names, orthogonal routing, no gradient and no glow on
 * anything that is standing still. Eight drawing styles would be a worse
 * failure than eight identical diagrams — vary the structure, never the
 * language.
 *
 * Each figure also declares `data-topology`, which is how the animation
 * picks the motion that belongs to that shape. A cycle completes around
 * its loop; a spine draws along its length and then grows its branches; a
 * chain runs a charge from one end to the other. If two sectors' timelines
 * could be swapped without anyone noticing, they are still the same
 * visual.
 */

export const ACCENT = "#00b4d8";

export const trace = {
  stroke: ACCENT,
  strokeOpacity: 0.3,
  strokeWidth: 1,
  fill: "none",
} as const;

export const rail = {
  stroke: ACCENT,
  strokeOpacity: 0.4,
  strokeWidth: 1.1,
  fill: "none",
} as const;

const NAME = {
  fill: "#ffffff",
  fillOpacity: 0.85,
  fontSize: 14,
  fontWeight: 600,
} as const;

const MONO = {
  fill: ACCENT,
  fillOpacity: 0.5,
  fontSize: 10,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.28em",
} as const;

export type Topology =
  | "chain"
  | "spine"
  | "cycle"
  | "reverse"
  | "converge"
  | "ascent"
  | "parallel"
  | "nested";

/** Which sector is drawn as what. Anything unlisted falls back to a chain. */
export const TOPOLOGY: Record<string, Topology> = {
  healthcare: "spine",
  retail: "cycle",
  commerce: "reverse",
  manufacturing: "converge",
  education: "ascent",
  professional: "parallel",
  technology: "nested",
};

export interface FigureProps {
  stages: readonly string[];
  chargeFilter: string;
}

/** The glow that belongs to the travelling signal, and to nothing else. */
export function ChargeFilter({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-160%" y="-160%" width="420%" height="420%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/* ── Chain ────────────────────────────────────────────────────────────
   Five stages, in order, on one unbroken spine. Honest where the work
   really does happen once and finish: an engagement, an order, a batch. */

const CHAIN = {
  w: 800,
  h: 140,
  top: 24,
  boxH: 46,
  boxW: 136,
  spineY: 96,
  cx: [80, 240, 400, 560, 720],
} as const;

export function ChainFigure({ stages, chargeFilter }: FigureProps) {
  const half = CHAIN.boxW / 2;
  return (
    <svg
      viewBox={`0 0 ${CHAIN.w} ${CHAIN.h}`}
      className="h-auto w-full"
      data-topology="chain"
      fill="none"
      aria-hidden="true"
    >
      <ChargeFilter id={chargeFilter} />
      <g>
        {stages.slice(0, -1).map((s, i) => (
          <path
            key={`e-${s}`}
            className="flow-edge"
            d={`M${CHAIN.cx[i] + half} 47 L${CHAIN.cx[i + 1] - half} 47`}
            {...trace}
          />
        ))}
        {stages.map((s, i) => (
          <path
            key={`d-${s}`}
            className="flow-edge"
            d={`M${CHAIN.cx[i]} ${CHAIN.top + CHAIN.boxH} L${CHAIN.cx[i]} ${CHAIN.spineY}`}
            {...trace}
          />
        ))}
      </g>

      {stages.map((stage, i) => (
        <g key={stage} className="flow-node">
          <rect
            className="flow-node-box"
            x={CHAIN.cx[i] - half}
            y={CHAIN.top}
            width={CHAIN.boxW}
            height={CHAIN.boxH}
            stroke={ACCENT}
            strokeOpacity={0.35}
            strokeWidth={1.1}
            fill="none"
          />
          <text x={CHAIN.cx[i]} y={47} textAnchor="middle" {...NAME}>
            {stage}
          </text>
          <text
            x={CHAIN.cx[i]}
            y={62}
            textAnchor="middle"
            {...MONO}
            letterSpacing="0.1em"
          >
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}

      <path
        className="flow-spine"
        d={`M12 ${CHAIN.spineY} L${CHAIN.w - 12} ${CHAIN.spineY}`}
        {...rail}
      />
      <circle
        className="flow-charge"
        r={3.5}
        cx={12}
        cy={CHAIN.spineY}
        fill={ACCENT}
        opacity={0}
        filter={`url(#${chargeFilter})`}
      />
    </svg>
  );
}

/* ── Spine ────────────────────────────────────────────────────────────
   Healthcare. Care is not a sequence that finishes — a chain ending at
   "Follow-up" says the patient is done, which is the opposite of what a
   health record is for. So the record is the long line, and every episode
   of care is an arch that leaves it and returns to it. The line is drawn
   first and outlives all five. */

const SPINE = {
  w: 800,
  h: 200,
  recordY: 168,
  archY: 126,
  boxY: 74,
  boxH: 38,
  boxW: 140,
  cx: [80, 240, 400, 560, 720],
} as const;

export function SpineFigure({ stages, chargeFilter }: FigureProps) {
  const half = SPINE.boxW / 2;
  return (
    <svg
      viewBox={`0 0 ${SPINE.w} ${SPINE.h}`}
      className="h-auto w-full"
      data-topology="spine"
      fill="none"
      aria-hidden="true"
    >
      <ChargeFilter id={chargeFilter} />

      {/* Every episode leaves the record and comes back to it. */}
      <g>
        {stages.map((s, i) => {
          const cx = SPINE.cx[i];
          return (
            <g key={`a-${s}`}>
              <path
                className="flow-edge"
                d={`M${cx - 58} ${SPINE.recordY} L${cx - 58} ${SPINE.archY} L${cx + 58} ${SPINE.archY} L${cx + 58} ${SPINE.recordY}`}
                {...trace}
              />
              <path
                className="flow-edge"
                d={`M${cx} ${SPINE.archY} L${cx} ${SPINE.boxY + SPINE.boxH}`}
                {...trace}
              />
            </g>
          );
        })}
      </g>

      {stages.map((stage, i) => (
        <g key={stage} className="flow-node">
          <rect
            className="flow-node-box"
            x={SPINE.cx[i] - half}
            y={SPINE.boxY}
            width={SPINE.boxW}
            height={SPINE.boxH}
            stroke={ACCENT}
            strokeOpacity={0.35}
            strokeWidth={1.1}
            fill="none"
          />
          <text
            x={SPINE.cx[i]}
            y={SPINE.boxY + 24}
            textAnchor="middle"
            {...NAME}
          >
            {stage}
          </text>
        </g>
      ))}

      {/* The record. One line, drawn before anything happens on it, and
          still running after the last episode returns. */}
      <path
        className="flow-spine"
        d={`M8 ${SPINE.recordY} L${SPINE.w - 8} ${SPINE.recordY}`}
        {...rail}
      />
      <text x={0} y={SPINE.recordY + 24} {...MONO}>
        ONE PATIENT RECORD
      </text>
      <text
        x={SPINE.w}
        y={SPINE.recordY + 24}
        textAnchor="end"
        {...MONO}
        fillOpacity={0.35}
      >
        AND IT KEEPS GOING
      </text>

      <circle
        className="flow-charge"
        r={3.5}
        cx={8}
        cy={SPINE.recordY}
        fill={ACCENT}
        opacity={0}
        filter={`url(#${chargeFilter})`}
      />
    </svg>
  );
}

/* ── Cycle ────────────────────────────────────────────────────────────
   Retail. Replenishment is a loop and the closing of it is the entire
   claim — a chain that ends at "Replenishment" says the shelf stays empty
   afterwards. Drawn as one closed orthogonal circuit rather than a ring,
   because every other run on this page is orthogonal and a curve here
   would be a second drawing language. */

export const CYCLE = {
  boxW: 132,
  boxH: 38,
  /** Node centres, evenly spread around the circuit. */
  nodes: [
    { x: 230, y: 44 },
    { x: 570, y: 44 },
    { x: 700, y: 130 },
    { x: 570, y: 216 },
    { x: 230, y: 216 },
  ],
  /** Box edge to box edge. The circuit is built from these, not laid on
   *  top of a rectangle. */
  runs: [
    "M296 44 L504 44",
    "M636 44 L700 44 L700 111",
    "M700 149 L700 216 L636 216",
    "M504 216 L296 216",
    "M164 216 L100 216 L100 44 L164 44",
  ],
  /** The invisible track the charge orbits. Every node centre sits on it,
   *  and it is closed, so an orbit has no first node and no last. */
  orbit: "M100 44 L700 44 L700 216 L100 216 Z",
  /** Illustrative only — a mechanism, not a product claim. The count
   *  exists so the figure can show a number *changing*, which is the one
   *  thing a highlight cannot say. */
  stockHigh: 184,
  stockLow: 179,
  bar: { x: 340, y: 146, w: 120, h: 8 },
} as const;

export function CycleFigure({ stages, chargeFilter }: FigureProps) {
  return (
    <svg
      viewBox="0 0 800 250"
      className="h-auto w-full"
      data-topology="cycle"
      fill="none"
      aria-hidden="true"
    >
      <ChargeFilter id={chargeFilter} />

      {/* The circuit, as runs between the boxes. Drawn this way rather than
          as one rect behind them because a rect with boxes sitting on it
          reads as a border with labels; runs that leave one box and arrive
          at the next read as a circuit. */}
      <g>
        {CYCLE.runs.map((d) => (
          <path key={d} className="flow-edge" d={d} {...trace} />
        ))}
      </g>

      {/* Which way round. Four marks are enough to establish rotation, and
          rotation is what a closed rectangle cannot state on its own. */}
      <g className="flow-chev">
        <path d="M394 38 L400 44 L394 50" {...trace} />
        <path d="M694 174 L700 180 L706 174" {...trace} />
        <path d="M406 210 L400 216 L406 222" {...trace} />
        <path d="M94 136 L100 130 L106 136" {...trace} />
      </g>

      {/* The track. Invisible: it exists for the charge to orbit. */}
      <path className="flow-orbit" d={CYCLE.orbit} stroke="none" fill="none" />

      {/* The signal is drawn BEFORE the nodes, so a canvas-filled box hides
          it while it is inside one. It therefore disappears into a node and
          comes out the other side rather than sliding across the label —
          which is both what a signal reaching a system looks like and the
          only way the labels stay readable. */}
      <circle
        className="flow-charge"
        r={3.5}
        cx={100}
        cy={44}
        fill={ACCENT}
        opacity={0}
        filter={`url(#${chargeFilter})`}
      />

      {stages.map((stage, i) => {
        const n = CYCLE.nodes[i];
        if (!n) return null;
        return (
          <g key={stage} className="flow-node">
            <rect
              className="flow-node-box"
              x={n.x - CYCLE.boxW / 2}
              y={n.y - CYCLE.boxH / 2}
              width={CYCLE.boxW}
              height={CYCLE.boxH}
              stroke={ACCENT}
              strokeOpacity={0.35}
              strokeWidth={1.1}
              /* Canvas-coloured so the charge disappears into a node and
                 comes out the other side, rather than crossing its label. */
              fill="#00101f"
            />
            <text x={n.x} y={n.y + 5} textAnchor="middle" {...NAME}>
              {stage}
            </text>
          </g>
        );
      })}

      {/* The count, where the caption used to be.
          "CONTINUOUS REPLENISHMENT" set in the middle of the frame was the
          drawing's job done in words, and it was the largest thing in it.
          A number that falls at the checkout and climbs back through
          replenishment proves the loop closes; a caption asserts it. */}
      <text
        className="flow-stock"
        x={400}
        y={116}
        textAnchor="middle"
        fill={ACCENT}
        fillOpacity={0.9}
        fontSize={34}
        fontFamily="var(--font-mono)"
      >
        {CYCLE.stockHigh}
      </text>
      <text
        x={400}
        y={134}
        textAnchor="middle"
        {...MONO}
        fillOpacity={0.45}
        fontSize={9}
      >
        IN STOCK
      </text>
      <rect
        x={CYCLE.bar.x}
        y={CYCLE.bar.y}
        width={CYCLE.bar.w}
        height={CYCLE.bar.h}
        stroke={ACCENT}
        strokeOpacity={0.25}
        strokeWidth={1}
        fill="none"
      />
      <rect
        className="flow-level"
        x={CYCLE.bar.x}
        y={CYCLE.bar.y}
        width={CYCLE.bar.w}
        height={CYCLE.bar.h}
        fill={ACCENT}
        fillOpacity={0.35}
      />
    </svg>
  );
}

/* ── Reverse ──────────────────────────────────────────────────────────
   Digital Commerce. Channels fan in to one fulfilment path, and a return
   path runs backwards underneath it against the flow. The reverse arrow
   is the whole of what separates commerce from manufacturing: goods that
   have left can come back, and the record has to survive the round trip.
   Stage five is placed on that return path rather than at the end of the
   forward one, because a return is not the last step of a delivery. */

const CHANNELS = ["STORE", "MARKETPLACE", "SOCIAL"] as const;

export function ReverseFigure({ stages, chargeFilter }: FigureProps) {
  const [listing, order, fulfilment, delivery, returns] = stages;
  const box = (x: number, y: number, w: number) => ({
    x,
    y,
    width: w,
    height: 38,
  });
  return (
    <svg
      viewBox="0 0 800 230"
      className="h-auto w-full"
      data-topology="reverse"
      fill="none"
      aria-hidden="true"
    >
      <ChargeFilter id={chargeFilter} />

      {/* Many channels, one path. The fan converges rather than branches —
          the arrows all point inward. */}
      <g>
        {CHANNELS.map((c, i) => (
          <path
            key={c}
            className="flow-edge"
            d={`M136 ${34 + i * 46} L200 ${34 + i * 46} L200 80 L240 80`}
            {...trace}
          />
        ))}
        <path className="flow-edge" d="M376 80 L416 80" {...trace} />
        <path className="flow-edge" d="M552 80 L592 80" {...trace} />
      </g>

      {CHANNELS.map((c, i) => (
        <g key={c} className="flow-node">
          <text
            x={0}
            y={38 + i * 46}
            {...MONO}
            fillOpacity={0.55}
            letterSpacing="0.18em"
          >
            {c}
          </text>
        </g>
      ))}

      {[
        { label: listing, x: 240, w: 136 },
        { label: order, x: 416, w: 136 },
        { label: fulfilment, x: 592, w: 150 },
      ].map((n) => (
        <g key={n.label} className="flow-node">
          <rect
            className="flow-node-box"
            {...box(n.x, 61, n.w)}
            stroke={ACCENT}
            strokeOpacity={0.35}
            strokeWidth={1.1}
            fill="none"
          />
          <text x={n.x + n.w / 2} y={85} textAnchor="middle" {...NAME}>
            {n.label}
          </text>
        </g>
      ))}

      {/* Delivery hangs below fulfilment, and the return path runs back
          under everything from right to left. */}
      <path className="flow-edge" d="M667 99 L667 140" {...trace} />
      <g className="flow-node">
        <rect
          className="flow-node-box"
          {...box(592, 140, 150)}
          stroke={ACCENT}
          strokeOpacity={0.35}
          strokeWidth={1.1}
          fill="none"
        />
        <text x={667} y={164} textAnchor="middle" {...NAME}>
          {delivery}
        </text>
      </g>

      <path
        className="flow-return"
        d="M592 159 L500 159 L500 196 L308 196 L308 118 L308 99"
        stroke={ACCENT}
        strokeOpacity={0.35}
        strokeWidth={1.1}
        fill="none"
      />
      <g className="flow-node">
        <rect
          className="flow-node-box"
          {...box(340, 177, 136)}
          stroke={ACCENT}
          strokeOpacity={0.35}
          strokeWidth={1.1}
          fill="#00101f"
        />
        <text x={408} y={201} textAnchor="middle" {...NAME}>
          {returns}
        </text>
      </g>
      <text x={800} y={216} textAnchor="end" {...MONO} fillOpacity={0.35}>
        AND BACK AGAIN
      </text>

      <circle
        className="flow-charge"
        r={3.5}
        cx={592}
        cy={159}
        fill={ACCENT}
        opacity={0}
        filter={`url(#${chargeFilter})`}
      />
    </svg>
  );
}

/* ── Converge ─────────────────────────────────────────────────────────
   Manufacturing. Many inputs meet at a bill of materials, become one
   thing, and that one thing then fans out to many orders. Fan-in, then
   fan-out — a line would say every batch has one input and one
   destination, which is the one thing manufacturing never is. */

export function ConvergeFigure({ stages, chargeFilter }: FigureProps) {
  const [material, production, quality, warehouse, dispatch] = stages;
  const inputs = [30, 76, 122, 168];
  const outputs = [52, 99, 146];
  return (
    <svg
      viewBox="0 0 800 210"
      className="h-auto w-full"
      data-topology="converge"
      fill="none"
      aria-hidden="true"
    >
      <ChargeFilter id={chargeFilter} />

      {/* In. */}
      <g>
        {inputs.map((y) => (
          <path
            key={y}
            className="flow-edge"
            d={`M92 ${y} L140 ${y} L140 99 L172 99`}
            {...trace}
          />
        ))}
        <path className="flow-edge" d="M308 99 L340 99" {...trace} />
        <path className="flow-edge" d="M476 99 L508 99" {...trace} />
        {outputs.map((y) => (
          <path
            key={y}
            className="flow-edge"
            d={`M644 99 L676 99 L676 ${y} L716 ${y}`}
            {...trace}
          />
        ))}
      </g>

      {inputs.map((y) => (
        <rect
          key={y}
          className="flow-node-box"
          x={40}
          y={y - 9}
          width={52}
          height={18}
          stroke={ACCENT}
          strokeOpacity={0.35}
          strokeWidth={1}
          fill="none"
        />
      ))}
      <g className="flow-node">
        <text x={0} y={16} {...MONO} fillOpacity={0.55}>
          {material.toUpperCase()}
        </text>
      </g>

      {[
        { label: production, x: 172 },
        { label: quality, x: 340 },
        { label: warehouse, x: 508 },
      ].map((n) => (
        <g key={n.label} className="flow-node">
          <rect
            className="flow-node-box"
            x={n.x}
            y={80}
            width={136}
            height={38}
            stroke={ACCENT}
            strokeOpacity={0.35}
            strokeWidth={1.1}
            fill="none"
          />
          <text x={n.x + 68} y={104} textAnchor="middle" {...NAME}>
            {n.label}
          </text>
        </g>
      ))}

      {outputs.map((y) => (
        <rect
          key={y}
          className="flow-node-box"
          x={716}
          y={y - 9}
          width={52}
          height={18}
          stroke={ACCENT}
          strokeOpacity={0.35}
          strokeWidth={1}
          fill="none"
        />
      ))}
      <g className="flow-node">
        <text x={800} y={16} textAnchor="end" {...MONO} fillOpacity={0.55}>
          {dispatch.toUpperCase()}
        </text>
      </g>

      <circle
        className="flow-charge"
        r={3.5}
        cx={140}
        cy={99}
        fill={ACCENT}
        opacity={0}
        filter={`url(#${chargeFilter})`}
      />
    </svg>
  );
}

/* ── Ascent ───────────────────────────────────────────────────────────
   Education.

   This replaced a calendar grid of staggered cohort bars, and the reason
   is worth keeping: Professional Services below is *also* horizontal bars
   spanning columns over a time axis with a rule underneath. The two
   subjects were different and the two drawings were not — you could have
   swapped their timelines and nobody would have noticed, which is the test
   claude.md sets for exactly this failure.

   Professional Services keeps the bars, because overlap genuinely is that
   industry's difficulty and a Gantt is the honest shape for it. Education
   needed the different one.

   So: a rise. A student does not move *along* an institution, they move
   *up* it — each stage leaves them at a level they cannot be returned
   from, and the whole structure exists to carry them one tread higher.
   Nothing else on this page ascends: the chain runs flat, the cycle
   closes, the spine drops, the tree converges, the containers nest. A
   staircase cannot be mistaken for any of them at a glance, which is the
   entire point.

   The cohort marks sitting on each tread are what stop it reading as a bar
   chart — a chart would claim measurement, and the claim here is
   structural (design.md §6). */

export function AscentFigure({ stages }: FigureProps) {
  const treadW = 800 / stages.length;
  const baseline = 190;
  const rise = 30;
  /** Top of tread `i`. Each step stands one rise above the last. */
  const treadY = (i: number) => baseline - 24 - i * rise;

  /* One continuous profile, drawn as a single path so it climbs in one
     movement rather than assembling from separate steps. */
  const profile = stages
    .map((_, i) => {
      const x0 = treadW * i;
      const y = treadY(i);
      return `${i === 0 ? `M${x0} ${baseline} L${x0} ${y}` : `L${x0} ${y}`} L${x0 + treadW} ${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 800 210"
      className="h-auto w-full"
      data-topology="ascent"
      fill="none"
      aria-hidden="true"
    >
      {/* The ground every intake starts from. */}
      <path className="flow-spine" d={`M0 ${baseline} L800 ${baseline}`} {...rail} />

      {/* The climb. */}
      <path className="flow-edge flow-ascent" d={profile} {...trace} />

      {stages.map((stage, i) => {
        const x = treadW * i;
        const y = treadY(i);
        return (
          <g key={stage} className="flow-node">
            {/* The riser, so each step reads as a level gained rather than
                as a bar that happens to sit higher. */}
            <path
              className="flow-riser"
              d={`M${x} ${baseline} L${x} ${y}`}
              stroke={ACCENT}
              strokeOpacity={0.14}
              strokeWidth={1}
            />
            <text
              x={x + treadW / 2}
              y={y - 12}
              textAnchor="middle"
              {...NAME}
              fontSize={12.5}
            >
              {stage}
            </text>
            {/* Cohort marks resting on the tread — the people the level is
                for. Three, four and five as the institution fills up. */}
            {Array.from({ length: Math.min(3 + i, 5) }, (_, k) => (
              <rect
                key={k}
                className="flow-cohort"
                x={x + treadW / 2 - (Math.min(3 + i, 5) * 11) / 2 + k * 11}
                y={y + 5}
                width={6}
                height={6}
                stroke={ACCENT}
                strokeOpacity={0.5}
                strokeWidth={1}
              />
            ))}
          </g>
        );
      })}

      <text x={0} y={206} {...MONO}>
        ONE LEVEL AT A TIME
      </text>
    </svg>
  );
}

/* ── Parallel ─────────────────────────────────────────────────────────
   Professional Services. The difficulty in that industry is not the
   sequence of an engagement — everyone knows it — it is that four of them
   are running at once over the same people. So: bars over a time axis,
   overlapping, all drawing on one resource pool underneath. Overlap is
   the argument, and a chain cannot show overlap at all. */

const ENGAGEMENTS: readonly [number, number][] = [
  [0, 2],
  [1, 4],
  [2, 3],
  [3, 4],
];

export function ParallelFigure({ stages }: FigureProps) {
  const axisX = 0;
  const colW = 800 / stages.length;
  return (
    <svg
      viewBox="0 0 800 210"
      className="h-auto w-full"
      data-topology="parallel"
      fill="none"
      aria-hidden="true"
    >
      {stages.map((stage, i) => (
        <g key={stage} className="flow-node">
          <text
            x={axisX + colW * i + colW / 2}
            y={16}
            textAnchor="middle"
            {...MONO}
            fillOpacity={0.55}
            letterSpacing="0.18em"
          >
            {stage.toUpperCase()}
          </text>
        </g>
      ))}
      <path className="flow-edge" d="M0 28 L800 28" {...trace} />

      {ENGAGEMENTS.map(([from, to], r) => {
        const y = 44 + r * 30;
        return (
          <g key={r} className="flow-node">
            <rect
              className="flow-node-box flow-bar"
              x={colW * from + 10}
              y={y}
              width={colW * (to - from + 1) - 20}
              height={20}
              stroke={ACCENT}
              strokeOpacity={0.35}
              strokeWidth={1.1}
              fill="none"
            />
            <path
              className="flow-edge"
              d={`M${colW * from + 24} ${y + 20} L${colW * from + 24} 172`}
              {...trace}
            />
          </g>
        );
      })}

      {/* Everything above stands on the same people. */}
      <path className="flow-spine" d="M0 172 L800 172" {...rail} />
      <text x={0} y={194} {...MONO}>
        ONE SHARED TEAM
      </text>
      <text x={800} y={194} textAnchor="end" {...MONO} fillOpacity={0.35}>
        ALL AT ONCE
      </text>
    </svg>
  );
}

/* ── Nested ───────────────────────────────────────────────────────────
   Technology & Enterprise. This one has no arrows on purpose. Nothing
   flows here — an enterprise is a containment: units inside a company,
   teams inside units, every one of them reaching the same identity layer.
   An arrow would have implied a sequence that does not exist. */

export function NestedFigure({ stages }: FigureProps) {
  const inner = stages.slice(0, 3);
  return (
    <svg
      viewBox="0 0 800 210"
      className="h-auto w-full"
      data-topology="nested"
      fill="none"
      aria-hidden="true"
    >
      <g className="flow-node">
        <rect
          className="flow-node-box"
          x={8}
          y={8}
          width={784}
          height={140}
          stroke={ACCENT}
          strokeOpacity={0.4}
          strokeWidth={1.2}
          fill="none"
        />
        <text x={24} y={30} {...MONO} fillOpacity={0.6}>
          ENTERPRISE
        </text>
      </g>

      {[0, 1].map((u) => (
        <g key={u} className="flow-node">
          <rect
            className="flow-node-box"
            x={32 + u * 388}
            y={44}
            width={356}
            height={88}
            stroke={ACCENT}
            strokeOpacity={0.32}
            strokeWidth={1.1}
            fill="none"
          />
          <text x={48 + u * 388} y={64} {...MONO} fillOpacity={0.45}>
            BUSINESS UNIT
          </text>
          {inner.map((label, i) => (
            <g key={label}>
              <rect
                className="flow-node-box"
                x={48 + u * 388 + i * 112}
                y={74}
                width={100}
                height={40}
                stroke={ACCENT}
                strokeOpacity={0.35}
                strokeWidth={1.1}
                fill="none"
              />
              <text
                x={98 + u * 388 + i * 112}
                y={98}
                textAnchor="middle"
                {...NAME}
                fontSize={12.5}
              >
                {label}
              </text>
            </g>
          ))}
        </g>
      ))}

      {/* Not a flow — a reach. Every enclosure touches the same layer. */}
      <g>
        {[98, 210, 322, 486, 598, 710].map((x) => (
          <path
            key={x}
            className="flow-edge"
            d={`M${x} 114 L${x} 168`}
            {...trace}
          />
        ))}
      </g>
      <path className="flow-spine" d="M8 168 L792 168" {...rail} />
      <text x={0} y={192} {...MONO}>
        ONE IDENTITY LAYER
      </text>
    </svg>
  );
}
