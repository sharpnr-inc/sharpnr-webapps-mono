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
 *
 * ── It answers the pointer ──
 * The entrance played once and the figure was then inert; design.md §8 is
 * explicit that an entrance is not aliveness. Pointing at *either*
 * organization now quietens both sets of internal blocks — the internals
 * are not the subject — and lights the crossing edge, the verification
 * point and the far organization's boundary, with a charge running the
 * link in the direction the pointer implies. Lighting only the box under
 * the cursor would have proved nothing; the relationship is the subject,
 * so the relationship is what responds.
 *
 * The hover rules live in `src/index.css` under "Four passive figures".
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

/* The crossing edge, as a path in both directions. Which one carries the
   charge depends on which organization is being pointed at — a supplier
   relationship runs both ways, and a single left-to-right pulse would say
   otherwise. `fill="none"` on the root means a stroke-only rect cannot be
   pointed at, so each organization carries a transparent plate sized to
   its own boundary. */
const LINK_FWD = "M120 72 L402 72";
const LINK_BACK = "M402 72 L120 72";

export function NetworkDiagram() {
  return (
    <svg
      data-network
      viewBox="0 0 522 160"
      className="h-auto w-full"
      fill="none"
      role="img"
      aria-label="Two separate organizations joined by one connection crossing both boundaries through a single verification point"
    >
      {/* Your organization */}
      <g className="network-org" data-org="you">
        <rect
          className="network-bound"
          x={16}
          y={22}
          width={104}
          height={100}
          rx={4}
          {...boundary}
        />
        {left.map((b) => (
          <rect key={b.y + "-" + b.x} className="network-inner" {...b} {...edge} />
        ))}
        <text
          className="network-org-name"
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
        <rect
          className="network-hit"
          x={16}
          y={14}
          width={104}
          height={138}
          fill="transparent"
        />
      </g>

      {/* The relationship — one edge, drawn left to right, crossing both
          boundaries through a single verification point. */}
      <path className="network-link" d={LINK_FWD} {...edge} />
      {/* Two charges, one per direction. Parked at opacity 0; only a hover
          runs them, so nothing here loops on its own. */}
      <path
        className="network-pulse"
        data-dir="fwd"
        d={LINK_FWD}
        stroke={ACCENT}
        strokeOpacity={0}
        strokeWidth={2}
      />
      <path
        className="network-pulse"
        data-dir="back"
        d={LINK_BACK}
        stroke={ACCENT}
        strokeOpacity={0}
        strokeWidth={2}
      />
      <g className="network-seal">
        <rect
          className="network-seal-box"
          x={247}
          y={59}
          width={28}
          height={26}
          rx={3}
          fill="#00101f"
          {...boundary}
        />
        <path className="network-seal-mark" d="M254 72 L259 77 L268 66" {...boundary} />
        <text
          className="network-seal-name"
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
      <g className="network-org" data-org="supplier">
        <rect
          className="network-bound"
          x={402}
          y={22}
          width={104}
          height={100}
          rx={4}
          {...boundary}
        />
        {right.map((b) => (
          <rect key={b.y + "-" + b.x} className="network-inner" {...b} {...edge} />
        ))}
        <text
          className="network-org-name"
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
        <rect
          className="network-hit"
          x={402}
          y={14}
          width={104}
          height={138}
          fill="transparent"
        />
      </g>

      {/* Ground line — both organizations stand on the same network. */}
      <line className="network-ground" x1={16} y1={122} x2={506} y2={122} {...faint} />
    </svg>
  );
}
