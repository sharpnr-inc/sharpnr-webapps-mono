/*
 * Scene 06 — the diagram inside each principle.
 *
 * Blueprint linework, one accent, no fills that matter and no glow. Each
 * one has to prove its headline with the text removed: three parts becoming
 * one base, many blocks on a single slab, modules that can be taken away,
 * one foundation carrying a business of any size.
 *
 * These replaced abstract placeholder shapes — drifting rows, a bar chart —
 * that decorated the cards without arguing anything. A bar chart in
 * particular said "analytics", which is not what "built to scale" means.
 *
 * Everything is SVG on a shared 220×90 stage so line weights match across
 * all four cards. The hover choreography is unchanged: `motion` variants
 * driven by the tile's `whileHover`, nothing on scroll.
 */
import { motion } from "motion/react";

const ACCENT = "#00b4d8";

/** One stage, so a 1px line is 1px in every card. */
const Stage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex h-full min-h-24 w-full flex-1 items-center justify-center p-2"
  >
    <svg
      viewBox="0 0 220 90"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  </motion.div>
);

/* Shared linework. Strokes only — a filled block would read as UI. */
const edge = {
  stroke: ACCENT,
  strokeOpacity: 0.55,
  strokeWidth: 1.1,
} as const;
const faint = {
  stroke: ACCENT,
  strokeOpacity: 0.28,
  strokeWidth: 1,
} as const;
const base = {
  stroke: ACCENT,
  strokeOpacity: 0.9,
  strokeWidth: 1.6,
} as const;

/**
 * Designed together — three parts and one base that were made as one piece.
 *
 * On hover the modules draw together and their stems shorten, so the
 * assembly closes up rather than being wired up: the distinction the
 * principle is making.
 */
export const SkeletonDesigned = () => {
  const cols = [
    { x: 26, dx: 14 },
    { x: 88, dx: 0 },
    { x: 150, dx: -14 },
  ];
  return (
    <Stage>
      {cols.map((c, i) => (
        <motion.g
          key={i}
          variants={{
            initial: { x: 0 },
            animate: { x: c.dx, transition: { duration: 0.32 } },
          }}
        >
          <rect x={c.x} y={16} width={44} height={20} {...edge} />
          <line x1={c.x + 22} y1={36} x2={c.x + 22} y2={62} {...faint} />
        </motion.g>
      ))}
      {/* One continuous base. It is never drawn as segments, because the
          claim is that it was one piece from the start. */}
      <line x1={20} y1={62} x2={200} y2={62} {...base} />
    </Stage>
  );
};

/**
 * One foundation — everything resting on a single slab.
 *
 * The blocks sit *on* the slab's top edge rather than floating above it;
 * on hover they settle the last pixel onto it.
 */
export const SkeletonFoundation = () => {
  const blocks = [
    { x: 24, w: 34 },
    { x: 66, w: 46 },
    { x: 120, w: 28 },
    { x: 156, w: 40 },
  ];
  return (
    <Stage>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={22}
          width={b.w}
          height={30}
          {...edge}
          variants={{
            initial: { y: -3 },
            animate: { y: 0, transition: { duration: 0.28, delay: i * 0.04 } },
          }}
        />
      ))}
      {/* The slab: one object, wider than everything it carries. */}
      <rect x={16} y={54} width={188} height={16} {...base} />
      <line x1={16} y1={70} x2={204} y2={70} {...faint} />
    </Stage>
  );
};

/**
 * Independent capabilities — modules that stand alone.
 *
 * Deliberately no connectors between them: a line from one to another would
 * say they depend on each other, which is the opposite of the claim. They
 * share only a baseline. On hover two lift clear, proving the rest hold.
 */
export const SkeletonIndependent = () => {
  const xs = [22, 62, 102, 142, 182];
  return (
    <Stage>
      {xs.map((x, i) => (
        <motion.rect
          key={x}
          x={x - 14}
          y={20}
          width={28}
          height={34}
          {...edge}
          variants={{
            initial: { y: 0, opacity: 1 },
            animate:
              i === 1 || i === 3
                ? { y: -10, opacity: 0.25, transition: { duration: 0.3 } }
                : { y: 0, opacity: 1 },
          }}
        />
      ))}
      <line x1={16} y1={62} x2={204} y2={62} {...faint} />
    </Stage>
  );
};

/**
 * Built to scale — the same architecture at three sizes.
 *
 * Scale is shown by repeating the unit, not by a rising line: a bar chart
 * would claim measurement, and the principle is about structure. The
 * foundation runs unbroken under all three, identical at every size, which
 * is the actual point.
 */
export const SkeletonScale = () => {
  const groups = [
    { label: "S", x: 24, count: 1 },
    { label: "M", x: 86, count: 2 },
    { label: "L", x: 148, count: 4 },
  ];
  return (
    <Stage>
      {groups.map((g, gi) => (
        <g key={g.label}>
          {Array.from({ length: g.count }).map((_, i) => (
            <motion.rect
              key={i}
              x={g.x + (i % 2) * 24}
              y={i < 2 ? 30 : 12}
              width={18}
              height={16}
              {...edge}
              variants={{
                initial: { opacity: i === 0 ? 1 : 0.25 },
                animate: {
                  opacity: 1,
                  transition: { duration: 0.28, delay: gi * 0.06 + i * 0.05 },
                },
              }}
            />
          ))}
          <text
            x={g.x + (g.count > 1 ? 21 : 9)}
            y={76}
            fill={ACCENT}
            fillOpacity={0.5}
            fontSize={8}
            fontFamily="var(--font-mono)"
            letterSpacing="0.2em"
            textAnchor="middle"
          >
            {g.label}
          </text>
        </g>
      ))}
      {/* Identical at every size — the same slab carries all three. */}
      <line x1={16} y1={58} x2={204} y2={58} {...base} />
    </Stage>
  );
};
