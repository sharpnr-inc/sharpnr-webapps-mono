/*
 * The hospitality bento's drawings — the kicker and the four blueprints.
 *
 * They live beside `./catalogue` rather than in it because that file is
 * content: a list of tiles, their spans and their copy. Components and data
 * in one module also cost Vite the ability to hot-replace either.
 *
 * Same language as `src/app/home/why/skeletons.tsx`: strokes only, one
 * accent, no gradient and no glow. Only the tiles that carry extra width
 * get a drawing, and they get it because the width would otherwise be
 * empty. No `dark:` variants — this site is only ever dark, so the dark
 * values are the base.
 */
import type { ReactNode } from "react";

const ACCENT = "#00b4d8";

/** The kicker keeps the Operations / Business / Customer / Intelligence
 *  grouping the lists carried, without going back to four lists. */
export const Kicker = ({
  group,
  children,
}: {
  group: string;
  children?: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-cyan/55">
      {group}
    </p>
    {children}
  </div>
);

const stroke = {
  edge: { stroke: ACCENT, strokeOpacity: 0.5, strokeWidth: 1.1, fill: "none" },
  faint: { stroke: ACCENT, strokeOpacity: 0.26, strokeWidth: 1, fill: "none" },
  base: { stroke: ACCENT, strokeOpacity: 0.85, strokeWidth: 1.5, fill: "none" },
} as const;

/** Point of Sale — the order taken once, at the head of everything. */
export const PosArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    {/* the terminal */}
    <rect x={10} y={14} width={62} height={38} {...stroke.base} />
    <line x1={10} y1={26} x2={72} y2={26} {...stroke.edge} />
    {[34, 42].map((y) => (
      <line key={y} x1={20} y1={y} x2={50} y2={y} {...stroke.faint} />
    ))}
    {/* one order leaving it */}
    <line x1={72} y1={33} x2={132} y2={33} {...stroke.edge} />
    <rect x={132} y={12} width={46} height={42} {...stroke.edge} />
    {[22, 30, 38, 46].map((y) => (
      <line key={y} x1={140} y1={y} x2={170} y2={y} {...stroke.faint} />
    ))}
  </svg>
);

/** Inventory — the count that moves as the day does. */
export const InventoryArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    <line x1={10} y1={52} x2={140} y2={52} {...stroke.base} />
    {[0, 1, 2, 3].map((c) => (
      <rect
        key={c}
        x={12 + c * 32}
        y={34}
        width={28}
        height={18}
        {...stroke.edge}
      />
    ))}
    {[0, 1, 2].map((c) => (
      <rect
        key={c}
        x={12 + c * 32}
        y={16}
        width={28}
        height={18}
        {...stroke.faint}
      />
    ))}
    {/* the one that just left */}
    <line x1={148} y1={43} x2={190} y2={43} {...stroke.edge} />
    <line x1={182} y1={38} x2={190} y2={43} {...stroke.edge} />
    <line x1={182} y1={48} x2={190} y2={43} {...stroke.edge} />
  </svg>
);

/** Live Insights — the same figures, read at any moment. */
export const InsightsArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    <line x1={10} y1={50} x2={210} y2={50} {...stroke.base} />
    {[26, 58, 90, 122, 154, 186].map((x, i) => (
      <line
        key={x}
        x1={x}
        y1={50}
        x2={x}
        y2={50 - [18, 30, 12, 34, 22, 40][i]}
        {...stroke.edge}
      />
    ))}
    {/* The reading line — it is current, which is the whole claim. */}
    <line x1={10} y1={16} x2={210} y2={16} {...stroke.faint} />
  </svg>
);

/** IVA — many parts of the day, one answer. */
export const IvaArt = () => (
  <svg viewBox="0 0 220 60" className="mt-0.5 h-7 w-full" aria-hidden="true">
    {[
      [12, 12],
      [12, 30],
      [12, 48],
      [44, 20],
      [44, 40],
    ].map(([x, y], i) => (
      <g key={i}>
        <rect x={x} y={y - 5} width={14} height={10} {...stroke.edge} />
        <line x1={x + 14} y1={y} x2={112} y2={30} {...stroke.faint} />
      </g>
    ))}
    <line x1={112} y1={10} x2={112} y2={50} {...stroke.base} />
    <line x1={112} y1={30} x2={168} y2={30} {...stroke.base} />
    <rect x={168} y={20} width={40} height={20} {...stroke.edge} />
  </svg>
);
