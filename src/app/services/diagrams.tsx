/*
 * Services — the page's diagrams.
 *
 * Two sets live here.
 *
 *   CAPABILITY_DIAGRAMS  one per capability section (Scene 02–08). These
 *                        draw what a capability *is* — a structure.
 *   Diagram*             the four "better together" stories at the foot of
 *                        the page. These draw what happens — a journey.
 *
 * The split is deliberate and is the rule that keeps the page from
 * repeating itself: seven structures followed by four journeys, never two
 * drawings of the same shape. Both sets share the 220×90 stage and the same
 * three stroke weights below, so a 1px line is 1px everywhere on the page.
 *
 * ── the four "better together" diagrams ──
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

/* ────────────────────────────────────────────────────────────────
   Capability diagrams — one per section on the Services page.

   Seven capability sections ran back to back with no drawing at all, so
   the whole middle of the page read as the same section seven times. Each
   of these has to say which capability it belongs to with the heading
   removed, and each has to be a different *shape* from its neighbours —
   the failure mode here is seven variations on a row of boxes.

     Financial management   work above, one book below, every event posting
     People & workforce     one directory, everyone on the same spine
     Customer relationships one record, and it accumulates
     Communication          a conversation with its work still attached
     Identity & governance  one identity, scoped grants, one policy over all
     Knowledge              many sources, one understanding, one answer out
     Business network       a field outside the organization, one joined
   ──────────────────────────────────────────────────────────────── */

/**
 * Financial management — the record is made by the work, not after it.
 *
 * Operations run along the upper line; the ledger is the lower one. Every
 * event drops straight down onto the book at the moment it happens. There
 * is deliberately no return path and no second entry point: re-keying is
 * the thing this capability removes, so drawing one would argue against it.
 */
const DiagramFinance = () => {
  const events = [46, 82, 118, 154, 190];
  return (
    <Stage>
      {/* The work. */}
      <line x1={16} y1={26} x2={204} y2={26} {...edge} />
      {events.map((x, i) => (
        <motion.g
          key={x}
          variants={{
            initial: { opacity: 0.4 },
            animate: {
              opacity: 1,
              transition: { duration: 0.24, delay: i * 0.05 },
            },
          }}
        >
          <rect x={x - 9} y={18} width={18} height={16} {...edge} />
          {/* Straight down. Same moment, no detour. */}
          <line x1={x} y1={34} x2={x} y2={64} {...faint} />
          <line x1={x - 7} y1={64} x2={x + 7} y2={64} {...base} />
        </motion.g>
      ))}
      {/* One book, unbroken under all of it. */}
      <line x1={16} y1={64} x2={204} y2={64} {...base} />
      <line x1={16} y1={72} x2={204} y2={72} {...faint} />
    </Stage>
  );
};

/**
 * People & workforce — one directory, and everyone is in it.
 *
 * Rows of different widths because no two roles are the same, but every
 * one of them starts on the same left spine: the claim is a single
 * employee record, not five systems that happen to hold the same person.
 */
const DiagramPeople = () => {
  const rows = [
    { y: 16, w: 118 },
    { y: 30, w: 152 },
    { y: 44, w: 96 },
    { y: 58, w: 136 },
    { y: 72, w: 110 },
  ];
  return (
    <Stage>
      {/* The spine every record is filed against. */}
      <line x1={40} y1={10} x2={40} y2={84} {...base} />
      {rows.map((r, i) => (
        <motion.g
          key={r.y}
          variants={{
            initial: { x: -6, opacity: 0.45 },
            animate: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.26, delay: i * 0.05 },
            },
          }}
        >
          <line x1={40} y1={r.y} x2={40 + r.w} y2={r.y} {...edge} />
          <rect x={30} y={r.y - 4} width={10} height={8} {...edge} />
        </motion.g>
      ))}
    </Stage>
  );
};

/**
 * Customer relationships — one record, and it gets deeper.
 *
 * A single enclosure with strata inside it, each one wider than the last,
 * fed by marks arriving from outside. Nothing is ever drawn as a second
 * record: the capability is that sales, support and marketing are reading
 * the same one, and a relationship that accumulates is the whole argument.
 */
const DiagramCustomerRecord = () => {
  const strata = [
    { y: 60, w: 44 },
    { y: 48, w: 68 },
    { y: 36, w: 92 },
    { y: 24, w: 116 },
  ];
  return (
    <Stage>
      <rect x={52} y={16} width={124} height={58} {...base} />
      {strata.map((s, i) => (
        <motion.g
          key={s.y}
          variants={{
            initial: { opacity: 0.35 },
            animate: {
              opacity: 1,
              transition: { duration: 0.26, delay: i * 0.06 },
            },
          }}
        >
          <line x1={56} y1={s.y} x2={56 + s.w} y2={s.y} {...edge} />
          {/* Arriving from outside — an interaction the record kept. */}
          <line x1={20} y1={s.y} x2={52} y2={s.y} {...faint} />
          <circle cx={20} cy={s.y} r={2.4} fill={ACCENT} fillOpacity={0.7} />
        </motion.g>
      ))}
    </Stage>
  );
};

/**
 * Communication & collaboration — the conversation keeps its work.
 *
 * A thread running down the left with a document and a task hanging off
 * it, still attached. Drawn as branches rather than as three columns
 * because the point is that the artefacts belong to the discussion that
 * produced them, not that three tools sit side by side.
 */
const DiagramCollab = () => {
  const turns = [22, 38, 54, 70];
  return (
    <Stage>
      {/* The thread. */}
      <line x1={34} y1={14} x2={34} y2={78} {...base} />
      {turns.map((y, i) => (
        <motion.g
          key={y}
          variants={{
            initial: { opacity: 0.4 },
            animate: {
              opacity: 1,
              transition: { duration: 0.22, delay: i * 0.05 },
            },
          }}
        >
          <line x1={34} y1={y} x2={54} y2={y} {...faint} />
          <rect x={54} y={y - 4} width={26} height={8} {...edge} />
        </motion.g>
      ))}
      {/* What the conversation produced — still tied to it. */}
      <path d="M34 30 L112 30 L112 24" {...faint} />
      <rect x={112} y={12} width={64} height={24} {...edge} />
      {[18, 24, 30].map((y) => (
        <line key={y} x1={120} y1={y} x2={168} y2={y} {...faint} />
      ))}
      <path d="M34 62 L112 62 L112 58" {...faint} />
      <rect x={112} y={52} width={64} height={26} {...edge} />
      {[60, 70].map((y) => (
        <g key={y}>
          <rect x={119} y={y - 4} width={8} height={8} {...edge} />
          <line x1={132} y1={y} x2={168} y2={y} {...faint} />
        </g>
      ))}
    </Stage>
  );
};

/**
 * Identity, security & governance — one identity, scoped.
 *
 * The grants beyond the boundary are deliberately different widths: equal
 * boxes would say everyone gets the same access, and role-based scoping is
 * exactly what this capability does. The policy line runs over all of them
 * from the identity itself, so nothing is granted outside it.
 */
const DiagramIdentity = () => {
  const grants = [
    { y: 30, w: 58 },
    { y: 46, w: 34 },
    { y: 62, w: 76 },
  ];
  return (
    <Stage>
      {/* One identity. */}
      <rect x={14} y={32} width={30} height={28} {...base} />
      <line x1={20} y1={42} x2={38} y2={42} {...faint} />
      <line x1={20} y1={50} x2={34} y2={50} {...faint} />

      {/* The boundary everything has to pass. */}
      <line x1={78} y1={8} x2={78} y2={82} {...edge} />

      {/* One policy, over every grant. */}
      <line x1={44} y1={16} x2={196} y2={16} {...base} />

      {grants.map((g, i) => (
        <motion.g
          key={g.y}
          variants={{
            initial: { opacity: 0.35 },
            animate: {
              opacity: 1,
              transition: { duration: 0.24, delay: i * 0.06 },
            },
          }}
        >
          <line x1={44} y1={46} x2={78} y2={g.y} {...faint} />
          <line x1={78} y1={g.y} x2={96} y2={g.y} {...faint} />
          <rect x={96} y={g.y - 6} width={g.w} height={12} {...edge} />
          {/* Held under the policy above it. */}
          <line x1={96 + g.w / 2} y1={16} x2={96 + g.w / 2} y2={g.y - 6} {...faint} />
        </motion.g>
      ))}
    </Stage>
  );
};

/**
 * Knowledge & intelligence — many sources, one understanding.
 *
 * Sources arrive from every side rather than from a single row, because
 * the claim is that the information was already scattered. They terminate
 * on one rule; a single mark leaves it. One answer out, never a dashboard.
 */
const DiagramKnowledge = () => {
  const sources = [
    { x: 18, y: 14 },
    { x: 52, y: 24 },
    { x: 14, y: 44 },
    { x: 40, y: 62 },
    { x: 20, y: 78 },
    { x: 68, y: 76 },
  ];
  return (
    <Stage>
      {sources.map((s, i) => (
        <motion.g
          key={i}
          variants={{
            initial: { opacity: 0.3 },
            animate: {
              opacity: 1,
              transition: { duration: 0.26, delay: i * 0.04 },
            },
          }}
        >
          <line x1={s.x + 12} y1={s.y} x2={112} y2={45} {...faint} />
          <rect x={s.x} y={s.y - 5} width={12} height={10} {...edge} />
        </motion.g>
      ))}
      {/* One understanding. */}
      <line x1={112} y1={20} x2={112} y2={70} {...base} />
      {/* One answer. */}
      <motion.g
        variants={{
          initial: { x: -8, opacity: 0.4 },
          animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3, delay: 0.16 },
          },
        }}
      >
        <line x1={112} y1={45} x2={166} y2={45} {...base} />
        <rect x={166} y={35} width={38} height={20} {...edge} />
      </motion.g>
    </Stage>
  );
};

/**
 * Business network — the organization is not the whole business.
 *
 * Your organization is the closed frame on the right. Outside it a field
 * of other organizations, only one of them joined: a network is worth
 * drawing because of the ones you have not connected yet, and wiring all
 * of them would say the opposite of "discover a trusted supplier".
 */
const DiagramNetwork = () => {
  const outside = [
    { x: 16, y: 16, on: false },
    { x: 52, y: 30, on: false },
    { x: 14, y: 50, on: true },
    { x: 46, y: 68, on: false },
    { x: 78, y: 12, on: false },
    { x: 82, y: 60, on: false },
  ];
  return (
    <Stage>
      {outside.map((o, i) => (
        <motion.rect
          key={i}
          x={o.x}
          y={o.y}
          width={22}
          height={14}
          {...(o.on ? base : faint)}
          variants={{
            initial: { opacity: o.on ? 0.5 : 0.5 },
            animate: {
              opacity: 1,
              transition: { duration: 0.24, delay: i * 0.04 },
            },
          }}
        />
      ))}

      {/* One connection, made on purpose. */}
      <motion.path
        d="M36 57 L118 57 L118 45 L138 45"
        {...base}
        variants={{
          initial: { pathLength: 0.4, opacity: 0.5 },
          animate: { pathLength: 1, opacity: 1, transition: { duration: 0.45 } },
        }}
      />

      {/* Your organization. */}
      <rect x={138} y={18} width={66} height={54} {...base} />
      {[30, 45, 60].map((y) => (
        <line key={y} x1={146} y1={y} x2={196} y2={y} {...faint} />
      ))}
      <circle cx={138} cy={45} r={3} fill={ACCENT} fillOpacity={0.85} />
    </Stage>
  );
};

/**
 * Keyed by `Capability.id` — the section looks its drawing up rather than
 * the data file importing components, so `capabilities.tsx` stays content.
 */
export const CAPABILITY_DIAGRAMS: Record<string, () => React.ReactElement> = {
  "financial-management": DiagramFinance,
  "people-workforce": DiagramPeople,
  "customer-relationships": DiagramCustomerRecord,
  "communication-collaboration": DiagramCollab,
  "identity-governance": DiagramIdentity,
  "knowledge-intelligence": DiagramKnowledge,
  "business-network": DiagramNetwork,
};

/* ── the four "better together" diagrams ── */

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
