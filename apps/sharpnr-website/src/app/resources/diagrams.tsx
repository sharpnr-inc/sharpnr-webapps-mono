/*
 * Resources — one small diagram per editorial series.
 *
 * The series cards claimed to be covers and drew nothing, so six cards read
 * as six paragraphs. These are covers in the site's own language: blueprint
 * linework from `src/app/home/why/skeletons.tsx`, strokes only, one accent,
 * no gradient and no glow — and each one has to say what the series is with
 * its name removed.
 *
 *   Inside Sharpnr      a module cut open, its internals showing
 *   Field Notes         observations recorded at irregular intervals
 *   Blueprints          a reusable frame carrying its own dimensions
 *   Perspectives        one subject, sighted from several directions
 *   Engineering Journal stacked layers and the load path through them
 *   Design Notebook     a form with the construction lines that made it
 *
 * All six share a 220×90 stage so a 1px line is 1px on every card. Hover
 * only; nothing here is scroll-linked, so there is no GSAP to collide with
 * the section's entrance tween.
 */
import { motion } from "motion/react";

const ACCENT = "#00b4d8";

const Stage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex h-20 w-full items-center justify-center"
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

const edge = { stroke: ACCENT, strokeOpacity: 0.55, strokeWidth: 1.1 } as const;
const faint = { stroke: ACCENT, strokeOpacity: 0.28, strokeWidth: 1 } as const;
const base = { stroke: ACCENT, strokeOpacity: 0.9, strokeWidth: 1.6 } as const;

/** Inside Sharpnr — the product opened up rather than described. */
export const InsideDiagram = () => (
  <Stage>
    <rect x={16} y={18} width={188} height={54} {...base} />
    {/* The cut. Everything right of it is interior. */}
    <line x1={112} y1={18} x2={112} y2={72} {...edge} />
    {[0, 1, 2, 3].map((i) => (
      <line
        key={i}
        x1={106}
        y1={24 + i * 14}
        x2={112}
        y2={30 + i * 14}
        {...faint}
      />
    ))}
    {[0, 1, 2].map((i) => (
      <motion.rect
        key={i}
        x={124}
        y={26 + i * 15}
        width={68}
        height={11}
        {...edge}
        variants={{
          initial: { x: 0, opacity: 0.5 },
          animate: {
            x: 8,
            opacity: 1,
            transition: { duration: 0.28, delay: i * 0.05 },
          },
        }}
      />
    ))}
  </Stage>
);

/** Field Notes — recorded where the work happens, at no fixed interval. */
export const FieldNotesDiagram = () => {
  const marks = [22, 41, 74, 92, 101, 138, 168, 191];
  const heights = [26, 14, 34, 19, 30, 12, 24, 38];
  return (
    <Stage>
      <line x1={12} y1={70} x2={208} y2={70} {...base} />
      {marks.map((x, i) => (
        <motion.g
          key={x}
          variants={{
            initial: { y: 4, opacity: 0.45 },
            animate: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.26, delay: i * 0.03 },
            },
          }}
        >
          <line x1={x} y1={70} x2={x} y2={70 - heights[i]} {...faint} />
          <rect
            x={x - 4}
            y={70 - heights[i] - 7}
            width={8}
            height={7}
            {...edge}
          />
        </motion.g>
      ))}
    </Stage>
  );
};

/** Blueprints — a frame you can reuse, with its measurements on it. */
export const BlueprintsDiagram = () => (
  <Stage>
    <rect x={44} y={14} width={132} height={44} {...base} />
    {[88, 132].map((x) => (
      <line key={x} x1={x} y1={14} x2={x} y2={58} {...faint} />
    ))}
    <line x1={44} y1={36} x2={176} y2={36} {...faint} />
    {/* Registration ticks — it is a template, so it has to land somewhere. */}
    {[
      [44, 14],
      [176, 14],
      [44, 58],
      [176, 58],
    ].map(([x, y], i) => (
      <motion.g
        key={i}
        variants={{
          initial: { opacity: 0.3 },
          animate: { opacity: 1, transition: { duration: 0.24, delay: i * 0.04 } },
        }}
      >
        <line x1={x - 6} y1={y} x2={x + 6} y2={y} {...edge} />
        <line x1={x} y1={y - 6} x2={x} y2={y + 6} {...edge} />
      </motion.g>
    ))}
    {/* The dimension it is drawn to. */}
    <line x1={44} y1={74} x2={176} y2={74} {...edge} />
    <line x1={44} y1={68} x2={44} y2={80} {...faint} />
    <line x1={176} y1={68} x2={176} y2={80} {...faint} />
  </Stage>
);

/** Perspectives — one subject, sighted from several directions. */
export const PerspectivesDiagram = () => {
  const eyes = [
    { x: 14, y: 45, to: [94, 45] },
    { x: 60, y: 12, to: [102, 30] },
    { x: 60, y: 78, to: [102, 62] },
    { x: 206, y: 45, to: [134, 45] },
  ];
  return (
    <Stage>
      <rect x={94} y={30} width={40} height={32} {...base} />
      <line x1={94} y1={46} x2={134} y2={46} {...faint} />
      {eyes.map((e, i) => (
        <motion.g
          key={i}
          variants={{
            initial: { opacity: 0.4 },
            animate: {
              opacity: 1,
              transition: { duration: 0.26, delay: i * 0.06 },
            },
          }}
        >
          <line x1={e.x} y1={e.y} x2={e.to[0]} y2={e.to[1]} {...faint} />
          <line x1={e.x} y1={e.y - 6} x2={e.x} y2={e.y + 6} {...edge} />
        </motion.g>
      ))}
    </Stage>
  );
};

/** Engineering Journal — the layers, and what runs through them. */
export const EngineeringDiagram = () => {
  const rows = [14, 30, 46, 62];
  return (
    <Stage>
      {rows.map((y) => (
        <rect key={y} x={34} y={y} width={152} height={12} {...edge} />
      ))}
      <motion.line
        x1={110}
        y1={14}
        x2={110}
        y2={74}
        {...base}
        variants={{
          initial: { pathLength: 0.35, opacity: 0.5 },
          animate: { pathLength: 1, opacity: 1, transition: { duration: 0.4 } },
        }}
      />
      {rows.map((y) => (
        <circle
          key={y}
          cx={110}
          cy={y + 6}
          r={2.6}
          fill={ACCENT}
          fillOpacity={0.85}
        />
      ))}
    </Stage>
  );
};

/** Design Notebook — the form, and the construction that produced it. */
export const DesignDiagram = () => (
  <Stage>
    {/* Construction lines run past the form on every side. */}
    <motion.g
      variants={{
        initial: { opacity: 0.35 },
        animate: { opacity: 1, transition: { duration: 0.3 } },
      }}
    >
      <line x1={8} y1={26} x2={212} y2={26} {...faint} />
      <line x1={8} y1={64} x2={212} y2={64} {...faint} />
      <line x1={72} y1={6} x2={72} y2={84} {...faint} />
      <line x1={148} y1={6} x2={148} y2={84} {...faint} />
    </motion.g>
    <rect x={72} y={26} width={76} height={38} {...base} />
    {/* The spacing that was decided, marked. */}
    <line x1={30} y1={45} x2={66} y2={45} {...edge} />
    <line x1={30} y1={41} x2={30} y2={49} {...faint} />
    <line x1={66} y1={41} x2={66} y2={49} {...faint} />
    <line x1={154} y1={45} x2={190} y2={45} {...edge} />
    <line x1={154} y1={41} x2={154} y2={49} {...faint} />
    <line x1={190} y1={41} x2={190} y2={49} {...faint} />
  </Stage>
);
