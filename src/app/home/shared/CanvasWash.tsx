/*
 * The navy ink wash behind the whole homepage.
 *
 * Generated rather than photographed: soft radial pools get their edges torn
 * up by fractal noise through feDisplacementMap, which is what produces the
 * bloom-and-bleed of watercolour on paper. Doing it this way costs no image
 * download, stays sharp at any density, needs no stock licence, and is tinted
 * from the palette rather than sampled off someone else's artwork.
 *
 * Deliberately far quieter than a watercolour print would be. Texture behind
 * body copy is the fastest way to make a page unreadable, and the Visual
 * Language rule is that the background stays quiet and never competes with
 * content — so this reads as depth in the paper, not as a picture.
 *
 * The viewBox is tall (100 × 500) because this spans the entire scroll
 * height, not one screen — the homepage runs roughly 1:5, so `slice` scales
 * it close to uniformly and the noise never streaks.
 *
 * Decorative — hidden from assistive technology.
 */

/** Pools of pigment, spread down the full page. Positions are deliberately
 *  irregular and off-grid; an even distribution reads as a gradient mesh
 *  rather than something poured. Roughly one dense pool and one lifted area
 *  per scene, so no two screens look alike on the way down. */
const POOLS = [
  { cx: 16, cy: 18, rx: 46, ry: 34, fill: "#0a2f6b", o: 0.38 },
  { cx: 82, cy: 42, rx: 42, ry: 30, fill: "#04123a", o: 0.3 },
  { cx: 44, cy: 74, rx: 38, ry: 26, fill: "#12558f", o: 0.08 },
  { cx: 90, cy: 118, rx: 44, ry: 36, fill: "#0b3a7d", o: 0.11 },
  { cx: 24, cy: 152, rx: 40, ry: 30, fill: "#020c26", o: 0.6 },
  { cx: 62, cy: 186, rx: 46, ry: 32, fill: "#0a2f6b", o: 0.42 },
  { cx: 10, cy: 224, rx: 38, ry: 28, fill: "#04143f", o: 0.55 },
  { cx: 78, cy: 252, rx: 34, ry: 24, fill: "#12558f", o: 0.18 },
  { cx: 40, cy: 288, rx: 48, ry: 34, fill: "#0a2f6b", o: 0.46 },
  { cx: 88, cy: 322, rx: 40, ry: 28, fill: "#020c26", o: 0.58 },
  { cx: 18, cy: 356, rx: 42, ry: 30, fill: "#0b3a7d", o: 0.36 },
  { cx: 66, cy: 392, rx: 38, ry: 26, fill: "#04123a", o: 0.5 },
  { cx: 30, cy: 424, rx: 34, ry: 24, fill: "#12558f", o: 0.15 },
  { cx: 84, cy: 458, rx: 44, ry: 32, fill: "#0a2f6b", o: 0.44 },
  { cx: 34, cy: 488, rx: 40, ry: 28, fill: "#020c26", o: 0.55 },
];

interface CanvasWashProps {
  /** Unique per instance — two SVGs on one page must not share filter ids,
   *  or the second one's references resolve against the first's defs. */
  id?: string;
  /** Extra classes; the caller owns where and how tall the sheet is. */
  className?: string;
}

export function CanvasWash({ id = "hpWash", className = "" }: CanvasWashProps) {
  const bleed = `${id}Bleed`;
  return (
    <>
    <svg
      className={`hp-wash ${className}`}
      viewBox="0 0 100 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* The bleed. Turbulence drives a displacement map, so the pools'
            edges wander the way pigment does into damp paper instead of
            staying as ellipses. The blur afterwards softens what the
            displacement leaves ragged. */}
        <filter
          id={bleed}
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.028"
            numOctaves="4"
            seed="17"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.55" />
        </filter>

      </defs>

      <g filter={`url(#${bleed})`}>
        {POOLS.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill={p.fill}
            opacity={p.o}
          />
        ))}
      </g>

    </svg>
      {/* Paper grain, at 1:1 pixels. Inside the SVG it was scaled with
          everything else and its noise came out ~14x too coarse — soft
          blobs rather than grain, which is what made the background read
          as blurry with nothing on top of it. */}
      <div className={`hp-wash-grain ${className}`} aria-hidden="true" />
    </>
  );
}
