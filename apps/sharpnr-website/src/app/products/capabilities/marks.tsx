/*
 * One blueprint mark per capability.
 *
 * Same construction as the homepage's Scene 06 skeletons: thin linework,
 * one accent, no fill that carries meaning, no glow. Everything sits on a
 * shared 220×90 stage so a 1px line is 1px in every group, however wide the
 * column happens to be.
 *
 * Each mark has to argue its capability with the words removed — work
 * advancing through stations, a thread hanging off one spine, two sides of
 * a ledger balancing, a unit crossing between two organizations and landing
 * in the receiving books, separate errands converging into one place, a
 * document filing itself, one identity reaching every product.
 *
 * The capability docs are LOCKED and each carries a list of shapes it must
 * never become — no org charts under People, no folder trees under Storage,
 * no flowchart boxes under Automation, no charts anywhere. These marks are
 * abstractions of a business event, never a picture of an interface.
 *
 * There is no scroll behaviour here. Hover is driven entirely by `motion`
 * variants inherited from the group's `whileHover` — GSAP owns the scroll
 * entrance, and the two never touch the same element.
 */
import type { ReactNode } from "react";
import { motion } from "motion/react";

const ACCENT = "#00b4d8";

/* Strokes only, at three weights — identical to the homepage set so the two
   pages read as one hand. */
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

/** One stage for every mark, so line weights never drift between groups. */
const Stage = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 220 90"
    className="h-auto w-full max-w-55"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    aria-hidden="true"
  >
    {children}
  </svg>
);

/**
 * Operations — one piece of work travelling a rail, past stations that
 * light as it passes. Planning, execution and tracking are the same run,
 * not three systems.
 */
const OPS_STATIONS = [26, 68, 110, 152, 194];

export const MarkOperations = () => (
  <Stage>
    <line x1={16} y1={62} x2={204} y2={62} {...faint} />
    {OPS_STATIONS.map((x, i) => (
      <motion.line
        key={x}
        x1={x}
        y1={55}
        x2={x}
        y2={69}
        {...edge}
        variants={{
          initial: { strokeOpacity: 0.18 },
          animate: {
            strokeOpacity: 0.85,
            transition: { duration: 0.25, delay: i * 0.07 },
          },
        }}
      />
    ))}
    {/* The work item and its drop travel together — a stem left behind
        would read as a connection rather than as progress. */}
    <motion.g
      variants={{
        initial: { x: 0 },
        animate: { x: 168, transition: { duration: 0.55 } },
      }}
    >
      <rect x={15} y={22} width={22} height={16} {...edge} />
      <line x1={26} y1={38} x2={26} y2={55} {...faint} />
    </motion.g>
  </Stage>
);

/**
 * Communication — a thread. Every message hangs off one spine, which is
 * the work it belongs to; nothing floats free of it.
 */
const THREAD = [
  { y: 14, side: -1 },
  { y: 32, side: 1 },
  { y: 50, side: -1 },
  { y: 68, side: 1 },
];

export const MarkCommunication = () => (
  <Stage>
    <line x1={110} y1={10} x2={110} y2={81} {...faint} />
    {THREAD.map((m, i) => {
      const x = m.side < 0 ? 30 : 128;
      const stubTo = m.side < 0 ? 92 : 128;
      return (
        <motion.g
          key={m.y}
          variants={{
            initial: { x: m.side * 12, opacity: 0.4 },
            animate: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.32, delay: i * 0.06 },
            },
          }}
        >
          <rect x={x} y={m.y} width={62} height={13} {...edge} />
          <line
            x1={110}
            y1={m.y + 6.5}
            x2={stubTo}
            y2={m.y + 6.5}
            {...faint}
          />
        </motion.g>
      );
    })}
  </Stage>
);

/**
 * Finance — a beam on a fulcrum, sitting off level until it settles. Two
 * sides, one entry: the shape a balanced book actually makes.
 */
export const MarkFinance = () => (
  <Stage>
    <path d="M110 34 L99 74 L121 74 Z" {...base} />
    <line x1={84} y1={74} x2={136} y2={74} {...faint} />
    <motion.g
      style={{ transformOrigin: "110px 34px" }}
      variants={{
        initial: { rotate: -5 },
        animate: { rotate: 0, transition: { duration: 0.5 } },
      }}
    >
      <line x1={30} y1={34} x2={190} y2={34} {...base} />
      <line x1={46} y1={34} x2={46} y2={48} {...faint} />
      <line x1={174} y1={34} x2={174} y2={48} {...faint} />
      <rect x={24} y={48} width={44} height={16} {...edge} />
      <rect x={152} y={48} width={44} height={16} {...edge} />
    </motion.g>
  </Stage>
);

/**
 * Marketplace — one unit crosses between two organizations, and the record
 * of it appears in the receiving books. The trade and the bookkeeping are
 * the same event.
 */
const LEDGER_LINES = [34, 42, 50];

export const MarkMarketplace = () => (
  <Stage>
    <rect x={14} y={22} width={54} height={46} {...edge} />
    <rect x={152} y={22} width={54} height={46} {...edge} />
    <line x1={68} y1={45} x2={152} y2={45} {...faint} />
    <motion.rect
      x={74}
      y={39}
      width={16}
      height={12}
      {...base}
      variants={{
        initial: { x: 0, opacity: 1 },
        animate: { x: 62, opacity: 0, transition: { duration: 0.55 } },
      }}
    />
    {LEDGER_LINES.map((y, i) => (
      <motion.line
        key={y}
        x1={160}
        y1={y}
        x2={198}
        y2={y}
        {...faint}
        variants={{
          initial: { strokeOpacity: 0.06 },
          animate: {
            strokeOpacity: 0.55,
            transition: { duration: 0.25, delay: 0.4 + i * 0.08 },
          },
        }}
      />
    ))}
  </Stage>
);

/**
 * People — four errands an employee used to run in four places, converging
 * into one and continuing as a single line.
 *
 * Deliberately NOT a hierarchy of boxes: `04_People.md` forbids org charts,
 * and a tree would argue reporting structure anyway, which is not what this
 * capability is about. The claim is one connected employee experience, and
 * convergence is the shape of that claim.
 */
const ERRANDS = [16, 34, 56, 74];

export const MarkPeople = () => (
  <Stage>
    {ERRANDS.map((y, i) => (
      <motion.g
        key={y}
        variants={{
          initial: { x: -10, opacity: 0.35 },
          animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.34, delay: i * 0.07 },
          },
        }}
      >
        <rect x={14} y={y - 6} width={38} height={12} {...edge} />
        <path d={`M52 ${y} L96 ${y} L118 45`} {...faint} />
      </motion.g>
    ))}
    <motion.g
      variants={{
        initial: { opacity: 0.25 },
        animate: {
          opacity: 1,
          transition: { duration: 0.3, delay: 0.34 },
        },
      }}
    >
      <line x1={118} y1={45} x2={148} y2={45} {...base} />
      <rect x={148} y={31} width={58} height={28} {...base} />
    </motion.g>
  </Stage>
);

/**
 * Storage — a document filing itself onto the shelf it belongs to. The
 * point is the destination, not the container.
 */
const SHELVES = [12, 36, 60];

export const MarkStorage = () => (
  <Stage>
    {SHELVES.map((y, i) => (
      <motion.rect
        key={y}
        x={86}
        y={y}
        width={118}
        height={20}
        {...faint}
        variants={{
          initial: { strokeOpacity: 0.22 },
          animate:
            i === 1
              ? {
                  strokeOpacity: 0.85,
                  transition: { duration: 0.3, delay: 0.35 },
                }
              : { strokeOpacity: 0.22 },
        }}
      />
    ))}
    <motion.g
      variants={{
        initial: { x: 0 },
        animate: { x: 76, transition: { duration: 0.5 } },
      }}
    >
      <path d="M16 36 L32 36 L42 46 L42 56 L16 56 Z" {...edge} />
      <path d="M32 36 L32 46 L42 46" {...faint} />
    </motion.g>
  </Stage>
);

/**
 * Automation — an event reaching a rule, and the rule deciding. The routes
 * out of it are drawn from the start; only which one carries is decided.
 */
const BRANCHES = [22, 68];

export const MarkAutomation = () => (
  <Stage>
    <motion.rect
      x={12}
      y={36}
      width={34}
      height={18}
      {...edge}
      variants={{
        initial: { x: 0 },
        animate: { x: 8, transition: { duration: 0.3 } },
      }}
    />
    <line x1={46} y1={45} x2={96} y2={45} {...faint} />
    <motion.path
      d="M96 45 L110 33 L124 45 L110 57 Z"
      {...edge}
      variants={{
        initial: { strokeOpacity: 0.3 },
        animate: {
          strokeOpacity: 0.9,
          transition: { duration: 0.25, delay: 0.16 },
        },
      }}
    />
    <line x1={124} y1={45} x2={146} y2={45} {...faint} />
    <line x1={146} y1={22} x2={146} y2={68} {...faint} />
    {BRANCHES.map((y, i) => (
      <motion.g
        key={y}
        variants={{
          initial: { opacity: 0.3 },
          animate: {
            opacity: 1,
            transition: { duration: 0.25, delay: 0.3 + i * 0.1 },
          },
        }}
      >
        <line x1={146} y1={y} x2={164} y2={y} {...faint} />
        <rect x={164} y={y - 8} width={40} height={16} {...edge} />
      </motion.g>
    ))}
  </Stage>
);

/**
 * Intelligence — signals a business already produces, and the reading that
 * comes out of them. The rule is never drawn until the signals are there,
 * because the order is the argument.
 */
const SIGNALS = [
  { x: 22, top: 58 },
  { x: 44, top: 48 },
  { x: 66, top: 62 },
  { x: 88, top: 42 },
  { x: 110, top: 52 },
  { x: 132, top: 36 },
  { x: 154, top: 46 },
  { x: 176, top: 32 },
  { x: 198, top: 40 },
];

export const MarkIntelligence = () => (
  <Stage>
    <line x1={16} y1={78} x2={204} y2={78} {...faint} />
    {SIGNALS.map((s, i) => (
      <motion.line
        key={s.x}
        x1={s.x}
        y1={78}
        x2={s.x}
        y2={s.top}
        {...edge}
        variants={{
          initial: { strokeOpacity: 0.28 },
          animate: {
            strokeOpacity: 0.7,
            transition: { duration: 0.2, delay: i * 0.04 },
          },
        }}
      />
    ))}
    <motion.line
      x1={22}
      y1={60}
      x2={198}
      y2={30}
      {...base}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.4, delay: 0.42 } },
      }}
    />
  </Stage>
);

/**
 * Developer Platform — one secured identity reaching every connected
 * experience. The node is drawn once and never repeated, because that is
 * the whole claim.
 */
const ENDPOINTS = [8, 30, 52, 74];

export const MarkDeveloper = () => (
  <Stage>
    <rect x={14} y={34} width={44} height={22} {...base} />
    <line x1={58} y1={45} x2={104} y2={45} {...faint} />
    <line x1={104} y1={14} x2={104} y2={80} {...faint} />
    {ENDPOINTS.map((y, i) => (
      <motion.g
        key={y}
        variants={{
          initial: { opacity: 0.3 },
          animate: {
            opacity: 1,
            transition: { duration: 0.25, delay: i * 0.07 },
          },
        }}
      >
        <line x1={104} y1={y + 6} x2={148} y2={y + 6} {...faint} />
        <rect x={148} y={y} width={56} height={12} {...edge} />
      </motion.g>
    ))}
  </Stage>
);
