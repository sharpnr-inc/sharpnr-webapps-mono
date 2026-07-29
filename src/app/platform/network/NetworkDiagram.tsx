/*
 * Section 07 — "Business doesn't stop at your organization", drawn.
 *
 * Two organizations, each a closed boundary with its own internal
 * operations, and one edge that crosses between them through a
 * verification point. The two boundaries stay separate — that is the
 * premise, not a flaw: these are different companies. What the drawing
 * argues is that the connection is a first-class part of the structure
 * rather than something bolted between two systems.
 *
 * This replaced two plain outlined circles, which were decoration: they
 * carried a label and nothing else, and with the labels removed they
 * said nothing at all.
 *
 * Blueprint linework, one accent, no gradients, no glow. The crossing
 * edge is the only element the section animates (DrawSVG, left to
 * right) — the relationship forming is the whole point.
 */
const ACCENT = "#00b4d8";

const edge = { stroke: ACCENT, strokeOpacity: 0.5, strokeWidth: 1.1 } as const;
const faint = { stroke: ACCENT, strokeOpacity: 0.24, strokeWidth: 1 } as const;
const boundary = {
  stroke: ACCENT,
  strokeOpacity: 0.75,
  strokeWidth: 1.4,
} as const;

/* Different internal arrangements, because they are different
   businesses — mirrored boxes would suggest one company twice. */
const left = [
  { x: 34, y: 40, width: 46, height: 16 },
  { x: 34, y: 64, width: 28, height: 16 },
  { x: 70, y: 64, width: 32, height: 16 },
  { x: 34, y: 88, width: 68, height: 16 },
];
const right = [
  { x: 418, y: 40, width: 30, height: 16 },
  { x: 456, y: 40, width: 32, height: 16 },
  { x: 418, y: 64, width: 70, height: 16 },
  { x: 418, y: 88, width: 44, height: 16 },
];

export function NetworkDiagram() {
  return (
    <svg
      viewBox="0 0 522 160"
      className="h-auto w-full"
      fill="none"
      role="img"
      aria-label="Two separate organizations joined by one verified connection crossing both boundaries"
    >
      {/* Your organization */}
      <g className="network-org">
        <rect x={16} y={22} width={104} height={100} rx={4} {...boundary} />
        {left.map((b) => (
          <rect key={b.y + "-" + b.x} {...b} {...edge} />
        ))}
        <text
          x={68}
          y={144}
          textAnchor="middle"
          fill={ACCENT}
          fillOpacity={0.6}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.14em"
        >
          YOUR ORG
        </text>
      </g>

      {/* The relationship — one edge, drawn left to right, crossing both
          boundaries through a single verification point. */}
      <line className="network-link" x1={120} y1={72} x2={402} y2={72} {...edge} />
      <g className="network-seal">
        <rect
          x={247}
          y={59}
          width={28}
          height={26}
          rx={3}
          fill="#00101f"
          {...boundary}
        />
        <path d="M254 72 L259 77 L268 66" {...boundary} />
        <text
          x={261}
          y={101}
          textAnchor="middle"
          fill={ACCENT}
          fillOpacity={0.6}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.14em"
        >
          VERIFIED
        </text>
      </g>

      {/* Verified supplier */}
      <g className="network-org">
        <rect x={402} y={22} width={104} height={100} rx={4} {...boundary} />
        {right.map((b) => (
          <rect key={b.y + "-" + b.x} {...b} {...edge} />
        ))}
        <text
          x={454}
          y={144}
          textAnchor="middle"
          fill={ACCENT}
          fillOpacity={0.6}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.14em"
        >
          SUPPLIER
        </text>
      </g>

      {/* Ground line — both organizations stand on the same network. */}
      <line x1={16} y1={122} x2={506} y2={122} {...faint} />
    </svg>
  );
}
