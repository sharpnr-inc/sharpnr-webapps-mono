import { useRef, useState } from "react";
import { box, iso, type Pt } from "./iso";
import { useIsometricAnimation } from "./animations/useIsometricAnimation";

/* ── Scene constants ──────────────────────────────────────────────
   Main org tower sits left of centre on the marketplace foundation,
   a smaller partner org sits right. z values are platform top faces. */
const TOWER = { cx: -2.6, cy: 2.6 };
const ORG2 = { cx: 4.4, cy: -4.4 };
const Z = { core: 120, control: 250, biz: 380 };
const PLATE_T = 12;

type LayerKey = "biz" | "control" | "core" | "foundation";

const LAYER_INFO: Record<LayerKey, { name: string; blurb: string }> = {
  biz: {
    name: "Business Operation Layer",
    blurb:
      "Industry-specific apps your customers touch — Sharp-Hospitality, Lifco, and custom operations.",
  },
  control: {
    name: "Organization Control Layer",
    blurb:
      "Orchestrator provisions, configures, and governs every service from one command center.",
  },
  core: {
    name: "Sharpnr Core Services",
    blurb:
      "Accounting, HR, CRM, Cables, and Silo — the shared business engine behind every app.",
  },
  foundation: {
    name: "B2B Platform Layer",
    blurb:
      "Sharp-Marketplace connects organizations to trade goods, services, and data — org to org.",
  },
};

const DEFAULT_CAPTION =
  "The Sharpnr stack, org to org — hover any layer to explore.";

/* ── Geometry primitives ────────────────────────────────────────── */

interface PlateProps {
  cx: number;
  cy: number;
  size: number;
  zTop: number;
  dark?: boolean;
}

function Plate({ cx, cy, size, zTop, dark }: PlateProps) {
  const f = box(cx, cy, size, size, zTop - PLATE_T, PLATE_T);
  if (dark) {
    return (
      <g>
        <polygon points={f.left} fill="var(--color-ink-deep)" />
        <polygon points={f.right} fill="var(--color-ink-soft)" />
        <polygon
          points={f.top}
          fill="var(--color-ink)"
          stroke="var(--color-accent)"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
      </g>
    );
  }
  return (
    <g>
      <polygon points={f.left} fill="var(--color-iso-left)" />
      <polygon points={f.right} fill="var(--color-iso-right)" />
      <polygon
        points={f.top}
        fill="var(--color-iso-top)"
        stroke="var(--color-primary)"
        strokeOpacity={0.3}
        strokeWidth={1}
      />
    </g>
  );
}

interface BlockProps {
  cx: number;
  cy: number;
  z: number;
  size?: number;
  h?: number;
  label?: string;
  variant?: "light" | "primary" | "accent";
}

function Block({
  cx,
  cy,
  z,
  size = 2.2,
  h = 30,
  label,
  variant = "light",
}: BlockProps) {
  const f = box(cx, cy, size, size, z, h);
  const top = iso(cx, cy, z + h);
  const fills = {
    light: {
      top: "var(--color-iso-top)",
      left: "var(--color-iso-left)",
      right: "var(--color-iso-right)",
      stroke: "var(--color-primary)",
      text: "var(--color-primary)",
    },
    primary: {
      top: "var(--color-primary-hover)",
      left: "var(--color-primary)",
      right: "var(--color-ink-deep)",
      stroke: "var(--color-primary)",
      text: "var(--color-text-light)",
    },
    accent: {
      top: "var(--color-accent-light)",
      left: "var(--color-iso-left)",
      right: "var(--color-iso-right)",
      stroke: "var(--color-accent-strong)",
      text: "var(--color-accent-strong)",
    },
  }[variant];

  return (
    <g>
      <polygon points={f.left} fill={fills.left} />
      <polygon points={f.right} fill={fills.right} />
      <polygon
        points={f.top}
        fill={fills.top}
        stroke={fills.stroke}
        strokeOpacity={0.35}
        strokeWidth={1}
      />
      {label && (
        <text
          x={top.x}
          y={top.y + 4}
          textAnchor="middle"
          fill={fills.text}
          fontFamily="var(--font-mono)"
          fontSize={12}
          fontWeight={500}
          letterSpacing={0.3}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ── Foundation grid lines (marketplace surface) ────────────────── */

function FoundationGrid() {
  const lines: { a: Pt; b: Pt }[] = [];
  for (let i = -5; i <= 5; i += 2) {
    lines.push({ a: iso(i, -7, 0), b: iso(i, 7, 0) });
    lines.push({ a: iso(-7, i, 0), b: iso(7, i, 0) });
  }
  return (
    <g>
      {lines.map((l, idx) => (
        <line
          key={idx}
          x1={l.a.x}
          y1={l.a.y}
          x2={l.b.x}
          y2={l.b.y}
          stroke="var(--color-accent)"
          strokeOpacity={0.14}
          strokeWidth={1}
        />
      ))}
    </g>
  );
}

/* ── Side layer labels with leader lines ────────────────────────── */

const sideLabels = [
  { num: "L1", text: "BUSINESS OPERATIONS", corner: iso(TOWER.cx - 3, TOWER.cy + 3, Z.biz) },
  { num: "L2", text: "ORCHESTRATOR CONTROL", corner: iso(TOWER.cx - 2.8, TOWER.cy + 2.8, Z.control) },
  { num: "L3", text: "CORE SERVICES", corner: iso(TOWER.cx - 3.3, TOWER.cy + 3.3, Z.core) },
  { num: "L4", text: "SHARP-MARKETPLACE", corner: iso(-7, 7, 0) },
];

/* ── Beams: vertical guides connecting the exploded floors ──────── */

const beamCorners = [
  { x: TOWER.cx - 2.8, y: TOWER.cy + 2.8 }, // left
  { x: TOWER.cx + 2.8, y: TOWER.cy - 2.8 }, // right
  { x: TOWER.cx + 2.8, y: TOWER.cy + 2.8 }, // front
];
const beamSegments = beamCorners.flatMap((c) => {
  const segs = [
    { z0: 0, z1: Z.core - PLATE_T },
    { z0: Z.core, z1: Z.control - PLATE_T },
    { z0: Z.control, z1: Z.biz - PLATE_T },
  ];
  return segs.map((s) => ({
    a: iso(c.x, c.y, s.z0),
    b: iso(c.x, c.y, s.z1),
  }));
});

/* Pulse tracks: full-height runs along each beam corner */
const pulseTracks = beamCorners.map((c) => ({
  x: iso(c.x, c.y, 0).x,
  y0: iso(c.x, c.y, 0).y,
  y1: iso(c.x, c.y, Z.biz - PLATE_T).y,
}));

/* ── Marketplace flow route between the two orgs ────────────────── */

const flowMain = [
  iso(TOWER.cx, TOWER.cy, 0),
  iso(ORG2.cx, TOWER.cy, 0),
  iso(ORG2.cx, ORG2.cy, 0),
];
const flowStubA = [iso(TOWER.cx, TOWER.cy, 0), iso(-7, TOWER.cy, 0)];
const flowStubB = [iso(ORG2.cx, ORG2.cy, 0), iso(7, ORG2.cy, 0)];

const pathD = (pts: Pt[]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

/* ── Component ──────────────────────────────────────────────────── */

export function IsometricPlatform() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Parallax wrappers (outer) and layer groups (inner — entrance/float)
  const pFoundationRef = useRef<SVGGElement>(null);
  const pCoreRef = useRef<SVGGElement>(null);
  const pControlRef = useRef<SVGGElement>(null);
  const pBizRef = useRef<SVGGElement>(null);
  const pOrg2Ref = useRef<SVGGElement>(null);

  const foundationRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const controlRef = useRef<SVGGElement>(null);
  const bizRef = useRef<SVGGElement>(null);
  const org2Ref = useRef<SVGGElement>(null);

  const corePlateRef = useRef<SVGGElement>(null);
  const coreBlocksRef = useRef<SVGGElement>(null);
  const controlPlateRef = useRef<SVGGElement>(null);
  const controlBlocksRef = useRef<SVGGElement>(null);
  const bizPlateRef = useRef<SVGGElement>(null);
  const bizBlocksRef = useRef<SVGGElement>(null);

  const beamsRef = useRef<SVGGElement>(null);
  const labelsRef = useRef<SVGGElement>(null);
  const flowRef = useRef<SVGGElement>(null);
  const flowPathRef = useRef<SVGPathElement>(null);
  const pulsesRef = useRef<SVGGElement>(null);
  const flowPulseRef = useRef<SVGCircleElement>(null);
  const beaconRingRef = useRef<SVGCircleElement>(null);

  const [hovered, setHovered] = useState<LayerKey | null>(null);

  useIsometricAnimation({
    containerRef,
    svgRef,
    parallax: { pFoundationRef, pCoreRef, pControlRef, pBizRef, pOrg2Ref },
    layers: { foundationRef, coreRef, controlRef, bizRef, org2Ref },
    pieces: {
      corePlateRef,
      coreBlocksRef,
      controlPlateRef,
      controlBlocksRef,
      bizPlateRef,
      bizBlocksRef,
    },
    beamsRef,
    labelsRef,
    flowRef,
    flowPathRef,
    pulsesRef,
    flowPulseRef,
    beaconRingRef,
  });

  const layerClass = (key: LayerKey) =>
    `transition-opacity duration-300 ${
      hovered && hovered !== key ? "opacity-40" : "opacity-100"
    }`;

  const beacon = iso(TOWER.cx, TOWER.cy, Z.control + 34);
  const caption = hovered ? LAYER_INFO[hovered] : null;

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        ref={svgRef}
        viewBox="-580 -520 940 750"
        className="h-auto w-full select-none"
        role="img"
        aria-label="Isometric diagram of the Sharpnr platform — business operation apps, Orchestrator control, core services, and the Sharp-Marketplace connecting organizations"
      >
        <defs>
          <filter id="iso-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="iso-shadow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse
          cx={0}
          cy={170}
          rx={330}
          ry={42}
          fill="var(--color-primary)"
          opacity={0.09}
          filter="url(#iso-shadow)"
        />

        {/* ── Foundation: Sharp-Marketplace (L4) ─────────────── */}
        <g ref={pFoundationRef}>
          <g
            ref={foundationRef}
            className={layerClass("foundation")}
            onMouseEnter={() => setHovered("foundation")}
            onMouseLeave={() => setHovered(null)}
          >
            <Plate cx={0} cy={0} size={14} zTop={0} dark />
            <FoundationGrid />
            <text
              x={0}
              y={88}
              textAnchor="middle"
              fill="var(--color-accent-glow)"
              fontFamily="var(--font-mono)"
              fontSize={13}
              letterSpacing={2.5}
            >
              O2O NETWORK
            </text>

            {/* Org-to-org flow routes */}
            <g ref={flowRef}>
              <path
                ref={flowPathRef}
                d={pathD(flowMain)}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeDasharray="7 7"
                filter="url(#iso-glow)"
              />
              <path
                d={pathD(flowStubA)}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                strokeDasharray="4 8"
                opacity={0.4}
              />
              <path
                d={pathD(flowStubB)}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                strokeDasharray="4 8"
                opacity={0.4}
              />
              <circle
                ref={flowPulseRef}
                r={3.5}
                fill="var(--color-accent-glow)"
                filter="url(#iso-glow)"
                opacity={0}
              />
            </g>
          </g>
        </g>

        {/* ── Beams between floors ────────────────────────────── */}
        <g ref={beamsRef}>
          {beamSegments.map((seg, i) => (
            <line
              key={i}
              x1={seg.a.x}
              y1={seg.a.y}
              x2={seg.b.x}
              y2={seg.b.y}
              stroke="var(--color-accent-strong)"
              strokeOpacity={0.45}
              strokeWidth={1.2}
            />
          ))}
        </g>

        {/* Data pulses riding the beams */}
        <g ref={pulsesRef}>
          {pulseTracks.map((t, i) => (
            <circle
              key={i}
              cx={t.x}
              cy={t.y0}
              r={3}
              fill="var(--color-accent-glow)"
              filter="url(#iso-glow)"
              opacity={0}
              data-y0={t.y0}
              data-y1={t.y1}
            />
          ))}
        </g>

        {/* ── L3: Core Services ───────────────────────────────── */}
        <g ref={pCoreRef}>
          <g
            ref={coreRef}
            className={layerClass("core")}
            onMouseEnter={() => setHovered("core")}
            onMouseLeave={() => setHovered(null)}
          >
            <g ref={corePlateRef}>
              <Plate cx={TOWER.cx} cy={TOWER.cy} size={6.6} zTop={Z.core} />
            </g>
            <g ref={coreBlocksRef}>
              <Block cx={TOWER.cx - 1.7} cy={TOWER.cy - 1.7} z={Z.core} label="Cables" />
              <Block cx={TOWER.cx + 1.7} cy={TOWER.cy - 1.7} z={Z.core} label="Silo" />
              <Block cx={TOWER.cx - 1.7} cy={TOWER.cy + 1.7} z={Z.core} label="Accounting" />
              <Block cx={TOWER.cx + 1.7} cy={TOWER.cy + 1.7} z={Z.core} label="Sharp-HR" />
            </g>
          </g>
        </g>

        {/* ── L2: Orchestrator ────────────────────────────────── */}
        <g ref={pControlRef}>
          <g
            ref={controlRef}
            className={layerClass("control")}
            onMouseEnter={() => setHovered("control")}
            onMouseLeave={() => setHovered(null)}
          >
            <g ref={controlPlateRef}>
              <Plate cx={TOWER.cx} cy={TOWER.cy} size={5.6} zTop={Z.control} />
            </g>
            <g ref={controlBlocksRef}>
              <Block
                cx={TOWER.cx}
                cy={TOWER.cy}
                z={Z.control}
                size={3}
                h={34}
                label="Orchestrator"
                variant="primary"
              />
              <circle
                cx={beacon.x}
                cy={beacon.y - 14}
                r={3}
                fill="var(--color-accent-glow)"
                filter="url(#iso-glow)"
              />
              <circle
                ref={beaconRingRef}
                cx={beacon.x}
                cy={beacon.y - 14}
                r={3}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                opacity={0}
              />
            </g>
          </g>
        </g>

        {/* ── L1: Business Operations ─────────────────────────── */}
        <g ref={pBizRef}>
          <g
            ref={bizRef}
            className={layerClass("biz")}
            onMouseEnter={() => setHovered("biz")}
            onMouseLeave={() => setHovered(null)}
          >
            <g ref={bizPlateRef}>
              <Plate cx={TOWER.cx} cy={TOWER.cy} size={6} zTop={Z.biz} />
            </g>
            <g ref={bizBlocksRef}>
              <Block cx={TOWER.cx - 1.6} cy={TOWER.cy - 1.6} z={Z.biz} label="Custom Apps" />
              <Block cx={TOWER.cx + 1.6} cy={TOWER.cy - 1.6} z={Z.biz} label="Lifco" />
              <Block
                cx={TOWER.cx - 1.6}
                cy={TOWER.cy + 1.6}
                z={Z.biz}
                label="Hospitality"
                variant="accent"
              />
              <text
                x={iso(TOWER.cx, TOWER.cy, 0).x}
                y={-Z.biz - 92}
                textAnchor="middle"
                fill="var(--color-text-muted)"
                fontFamily="var(--font-mono)"
                fontSize={13}
                letterSpacing={2}
              >
                ORG A · YOUR ORGANIZATION
              </text>
            </g>
          </g>
        </g>

        {/* ── Partner organization (simplified tower) ─────────── */}
        <g ref={pOrg2Ref}>
          <g ref={org2Ref}>
            <Plate cx={ORG2.cx} cy={ORG2.cy} size={4} zTop={110} />
            <Block cx={ORG2.cx - 1} cy={ORG2.cy + 1} z={110} size={1.6} h={22} />
            <Block cx={ORG2.cx + 1} cy={ORG2.cy - 1} z={110} size={1.6} h={22} />
            <Plate cx={ORG2.cx} cy={ORG2.cy} size={3.6} zTop={210} />
            <Block cx={ORG2.cx} cy={ORG2.cy} z={210} size={1.8} h={24} variant="primary" />
            {[
              { z0: 0, z1: 110 - PLATE_T },
              { z0: 110, z1: 210 - PLATE_T },
            ].map((s, i) => {
              const c = { x: ORG2.cx + 1.8, y: ORG2.cy + 1.8 };
              const a = iso(c.x, c.y, s.z0);
              const b = iso(c.x, c.y, s.z1);
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--color-accent-strong)"
                  strokeOpacity={0.4}
                  strokeWidth={1.2}
                />
              );
            })}
            <text
              x={iso(ORG2.cx, ORG2.cy, 0).x}
              y={-300}
              textAnchor="middle"
              fill="var(--color-text-faint)"
              fontFamily="var(--font-mono)"
              fontSize={13}
              letterSpacing={2}
            >
              ORG B · PARTNER
            </text>
          </g>
        </g>

        {/* ── Side layer labels ────────────────────────────────── */}
        <g ref={labelsRef}>
          {sideLabels.map((l) => (
            <g key={l.num}>
              <line
                x1={l.corner.x - 12}
                y1={l.corner.y}
                x2={l.corner.x - 64}
                y2={l.corner.y}
                stroke="var(--color-text-muted)"
                strokeOpacity={0.5}
                strokeWidth={1}
                strokeDasharray="2 4"
              />
              <text
                x={l.corner.x - 74}
                y={l.corner.y + 4}
                textAnchor="end"
                fontFamily="var(--font-mono)"
                fontSize={13}
                letterSpacing={1.5}
              >
                <tspan fill="var(--color-accent-strong)">{l.num}</tspan>
                <tspan fill="var(--color-text-muted)"> · {l.text}</tspan>
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Hover caption */}
      <div className="mx-auto mt-2 max-w-xl rounded-lg border border-border bg-surface/80 px-4 py-3 text-center backdrop-blur-sm">
        {caption ? (
          <p className="text-sm leading-relaxed text-text-muted">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-accent-strong">
              {caption.name}
            </span>
            <span className="mt-0.5 block">{caption.blurb}</span>
          </p>
        ) : (
          <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
            {DEFAULT_CAPTION}
          </p>
        )}
      </div>
    </div>
  );
}
