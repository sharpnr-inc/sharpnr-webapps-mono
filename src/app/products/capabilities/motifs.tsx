/*
 * Background motifs, one per capability.
 *
 * The same device the Industries page uses for its sectors: a large, very
 * faint architectural line figure sitting behind the group, strokes on
 * transparent — never a background plate, because a solid fill over the ink
 * wash flattens it (design.md §2).
 *
 * These replaced a hairline spine down the column gutter. The spine had to
 * carry two jobs at once — "this is all one platform" and "Intelligence
 * reaches all of it" — and at the weight that kept it from being intrusive
 * it read as a stray rule. A motif per capability does the first job by
 * being one visual family, and Intelligence does the second by being the
 * only motif that bleeds past its own group.
 *
 * Deliberately not illustrations of the products. They are ambient
 * structure: repeats, grids, runs. If one of these started to explain a
 * feature it would compete with the mark beside the heading, which is the
 * drawing that actually has to prove something.
 */

const stroke = {
  fill: "none",
  stroke: "#90e0ef",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;

/** Evenly spaced verticals — used by several motifs as their ground. */
function repeat(count: number, gap: number, from = 0) {
  return Array.from({ length: count }, (_, i) => from + i * gap);
}

type MotifProps = { className?: string };

/** Operations — a run of stations along one line. */
function OperationsMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      <path d="M0 130 H480" {...stroke} />
      {repeat(7, 68, 40).map((x) => (
        <g key={x} {...stroke}>
          <rect x={x - 18} y={112} width={36} height={36} />
          <path d={`M${x} 148 V196`} />
        </g>
      ))}
      <path d="M0 196 H480" {...stroke} strokeOpacity={0.6} />
    </svg>
  );
}

/**
 * Intelligence — a lattice that carries on past its own frame.
 *
 * The only motif drawn wider than its group, and the reason the spine
 * could be removed without losing what it argued. Its verticals run off
 * both edges of the viewBox rather than terminating, so at the group
 * boundary the lines continue into the capability above and below.
 */
function IntelligenceMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 320" className={className} aria-hidden="true">
      {repeat(9, 56, 16).map((x) => (
        <path key={x} d={`M${x} -20 V340`} {...stroke} strokeOpacity={0.75} />
      ))}
      {repeat(5, 62, 34).map((y) => (
        <path key={y} d={`M-20 ${y} H500`} {...stroke} strokeOpacity={0.45} />
      ))}
      {/* Junctions, only where the lattice is densest — a grid of identical
          crossings reads as graph paper. */}
      {repeat(4, 112, 72).map((x) =>
        repeat(3, 124, 96).map((y) => (
          <rect
            key={`${x}-${y}`}
            x={x - 3}
            y={y - 3}
            width={6}
            height={6}
            {...stroke}
          />
        )),
      )}
    </svg>
  );
}

/** Communication — threads hanging off one spine. */
function CommunicationMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      <path d="M64 0 V260" {...stroke} />
      {repeat(6, 42, 26).map((y, i) => (
        <g key={y} {...stroke}>
          <path d={`M64 ${y} H${150 + (i % 3) * 70}`} />
          <circle cx={150 + (i % 3) * 70} cy={y} r={4} />
        </g>
      ))}
    </svg>
  );
}

/** Finance — a ruled ledger. */
function FinanceMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      {repeat(9, 28, 22).map((y) => (
        <path key={y} d={`M0 ${y} H480`} {...stroke} strokeOpacity={0.5} />
      ))}
      <path d="M300 0 V260" {...stroke} />
      <path d="M390 0 V260" {...stroke} />
    </svg>
  );
}

/** People — a reporting structure. */
function PeopleMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      <g {...stroke}>
        <rect x={204} y={24} width={72} height={28} />
        <path d="M240 52 V88 M96 88 H384 M96 88 V116 M240 88 V116 M384 88 V116" />
        {[96, 240, 384].map((x) => (
          <rect key={x} x={x - 36} y={116} width={72} height={28} />
        ))}
        <path d="M96 144 V176 M240 144 V176 M384 144 V176" />
        {[60, 132, 204, 276, 348, 420].map((x) => (
          <rect key={x} x={x - 24} y={176} width={48} height={24} />
        ))}
      </g>
    </svg>
  );
}

/** Marketplace — two grids facing each other across a boundary. */
function MarketplaceMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      <path d="M240 0 V260" {...stroke} strokeOpacity={0.8} />
      {[0, 1].map((side) =>
        repeat(3, 46, 40).map((y) =>
          repeat(2, 62, side === 0 ? 40 : 288).map((x) => (
            <rect
              key={`${side}-${x}-${y}`}
              x={x}
              y={y}
              width={44}
              height={32}
              {...stroke}
              strokeOpacity={0.55}
            />
          )),
        ),
      )}
      <path d="M170 130 H310" {...stroke} />
    </svg>
  );
}

/** Automation — one input branching into parallel runs. */
function AutomationMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M20 130 H120" />
        <path d="M120 130 V40 H460 M120 130 V220 H460 M120 130 H460" />
        {[40, 130, 220].map((y) =>
          repeat(3, 96, 190).map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y - 12} width={56} height={24} />
          )),
        )}
      </g>
    </svg>
  );
}

/** Storage — racked shelves. */
function StorageMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      {repeat(5, 52, 26).map((y) => (
        <g key={y} {...stroke}>
          <path d={`M0 ${y + 40} H480`} />
          {repeat(6, 78, 24).map((x) => (
            <rect key={x} x={x} y={y + 12} width={54} height={28} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Developer platform — nested scopes. */
function DeveloperMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 480 260" className={className} aria-hidden="true">
      <g {...stroke}>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={40 + i * 34}
            y={20 + i * 26}
            width={400 - i * 68}
            height={220 - i * 52}
            strokeOpacity={0.4 + i * 0.2}
          />
        ))}
      </g>
    </svg>
  );
}

/*
 * Keyed by capability name. A capability with no entry simply renders no
 * motif — better than a placeholder, which would read as a real figure
 * that failed to say anything.
 */
const MOTIFS: Record<string, (p: MotifProps) => React.ReactElement> = {
  Operations: OperationsMotif,
  Intelligence: IntelligenceMotif,
  Communication: CommunicationMotif,
  Finance: FinanceMotif,
  People: PeopleMotif,
  Marketplace: MarketplaceMotif,
  Automation: AutomationMotif,
  Storage: StorageMotif,
  "Developer Platform": DeveloperMotif,
};

/**
 * One capability's background motif.
 *
 * `lg` and up only. Below that the copy occupies the full width and a motif
 * behind it costs legibility for something the visitor is not looking at.
 *
 * Intelligence is the exception in both size and clipping: it is drawn
 * taller than its group and is the one motif whose group does not clip it,
 * so its lattice visibly continues into the capabilities either side.
 */
export function CapabilityMotif({ name }: { name: string }) {
  const Motif = MOTIFS[name];
  if (!Motif) return null;

  const reaches = name === "Intelligence";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 hidden lg:block ${
        reaches ? "-my-16 overflow-visible" : "overflow-hidden"
      }`}
    >
      <Motif
        className={`absolute right-0 h-full w-[46%] ${
          reaches ? "opacity-[0.10]" : "opacity-[0.06]"
        }`}
      />
    </div>
  );
}
