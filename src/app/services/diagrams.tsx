/*
 * Services — the four "better together" diagrams.
 *
 * Same language as the homepage principle tiles (`src/app/home/why/
 * skeletons.tsx`): blueprint linework, one accent, strokes only, no fill
 * that carries meaning, no gradient and no glow. Each one has to prove its
 * story with the sentence removed —
 *
 *   one moment of welcome provisioning six things at once;
 *   one relationship running through three systems and coming back;
 *   work moving conversation → knowledge → delivery with leadership tapped
 *     off the whole length of it;
 *   a supplier outside the organization joined across the boundary.
 *
 * Everything shares a 220×90 stage so a 1px line is 1px in every card, and
 * the same three stroke weights are used throughout. Hover only — nothing
 * here is scroll-linked, so there is no GSAP and nothing to fight the
 * section's entrance tween.
 */
import { motion } from "motion/react";

const ACCENT = "#00b4d8";

/** One stage, so line weights match across all four cards. */
const Stage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex h-24 w-full items-center justify-center"
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

/**
 * Growing your team — one moment of welcome, six things provisioned.
 *
 * A single entry block feeds one continuous bus, and every provision is a
 * tap off that bus rather than a separate wire back to the source: the
 * claim is that they all come from the same event, not that six systems
 * were each told separately.
 */
export const DiagramTeam = () => {
  const taps = [
    { x: 70, up: true },
    { x: 93, up: false },
    { x: 116, up: true },
    { x: 139, up: false },
    { x: 162, up: true },
    { x: 185, up: false },
  ];
  return (
    <Stage>
      {/* The moment of welcome — one block, once. */}
      <rect x={10} y={36} width={22} height={18} {...base} />
      <line x1={17} y1={45} x2={25} y2={45} {...faint} />

      {/* One bus. Everything below hangs off this single line. */}
      <line x1={32} y1={45} x2={204} y2={45} {...base} />

      {taps.map((t, i) => (
        <motion.g
          key={t.x}
          variants={{
            initial: { opacity: 0.35 },
            animate: {
              opacity: 1,
              transition: { duration: 0.24, delay: i * 0.05 },
            },
          }}
        >
          <line
            x1={t.x}
            y1={45}
            x2={t.x}
            y2={t.up ? 28 : 62}
            {...faint}
          />
          <rect
            x={t.x - 13}
            y={t.up ? 12 : 62}
            width={26}
            height={16}
            {...edge}
          />
        </motion.g>
      ))}
    </Stage>
  );
};

/**
 * Serving a customer — one relationship, three systems, and it comes back.
 *
 * The line runs straight *through* each system rather than stopping at it,
 * because the point is that it is one relationship rather than three
 * handovers. The return leg is what makes the next opportunity remembered.
 */
export const DiagramCustomer = () => (
  <Stage>
    {[30, 90, 150].map((x) => (
      <rect key={x} x={x} y={20} width={40} height={24} {...edge} />
    ))}

    {/* One line, entering left and passing through all three. */}
    <line x1={8} y1={32} x2={212} y2={32} {...base} />

    {/* The return leg — the relationship is kept, not closed. */}
    <motion.path
      d="M206 32 L206 72 L20 72 L20 32"
      {...faint}
      variants={{
        initial: { pathLength: 0.55, opacity: 0.45 },
        animate: { pathLength: 1, opacity: 1, transition: { duration: 0.45 } },
      }}
    />
    <circle cx={20} cy={32} r={3} fill={ACCENT} fillOpacity={0.8} />
  </Stage>
);

/**
 * Working together — conversation, knowledge, delivery, on one spine.
 *
 * The upper line is leadership: it is drawn as a single continuous run with
 * a tap at every stage rather than a report at the end, which is the whole
 * difference between "informed the whole way" and "told afterwards".
 */
export const DiagramCollaboration = () => {
  const stages = [22, 88, 154];
  return (
    <Stage>
      {/* Informed the whole way — one run, tapped at every stage. */}
      <line x1={22} y1={18} x2={198} y2={18} {...base} />
      {stages.map((x, i) => (
        <motion.line
          key={x}
          x1={x + 22}
          y1={18}
          x2={x + 22}
          y2={44}
          {...faint}
          variants={{
            initial: { opacity: 0.35 },
            animate: {
              opacity: 1,
              transition: { duration: 0.22, delay: i * 0.07 },
            },
          }}
        />
      ))}

      {stages.map((x, i) => (
        <g key={`s-${x}`}>
          <rect x={x} y={44} width={44} height={26} {...edge} />
          {i < stages.length - 1 && (
            <line x1={x + 44} y1={57} x2={x + 66} y2={57} {...base} />
          )}
        </g>
      ))}
    </Stage>
  );
};

/**
 * Working with partners — a relationship that starts outside the
 * organization and is carried across the boundary.
 *
 * The boundary is drawn because it is real: a supplier is not part of your
 * organization. The argument is that the connection crosses it once and
 * then everything downstream is internal and automatic.
 */
export const DiagramPartners = () => (
  <Stage>
    {/* Outside — the supplier. */}
    <rect x={12} y={30} width={52} height={26} {...edge} />

    {/* The organization boundary. */}
    <line x1={88} y1={8} x2={88} y2={82} {...faint} />

    {/* One crossing. */}
    <line x1={64} y1={43} x2={110} y2={43} {...base} />
    <motion.circle
      cx={88}
      cy={43}
      r={4}
      fill={ACCENT}
      fillOpacity={0.85}
      variants={{
        initial: { scale: 1 },
        animate: { scale: 1.35, transition: { duration: 0.28 } },
      }}
      style={{ transformOrigin: "88px 43px" }}
    />

    {/* Inside — purchase, finance, decision, on one internal base. */}
    {[104, 142, 180].map((x, i) => (
      <motion.rect
        key={x}
        x={x}
        y={30}
        width={28}
        height={26}
        {...edge}
        variants={{
          initial: { opacity: 0.4 },
          animate: {
            opacity: 1,
            transition: { duration: 0.24, delay: 0.1 + i * 0.07 },
          },
        }}
      />
    ))}
    <line x1={98} y1={68} x2={212} y2={68} {...base} />
    {[118, 156, 194].map((x) => (
      <line key={x} x1={x} y1={56} x2={x} y2={68} {...faint} />
    ))}
  </Stage>
);
