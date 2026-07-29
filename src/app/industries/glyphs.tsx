/*
 * Industries — one glyph per industry.
 *
 * These replaced eight identical rectangles that differed only in how many
 * dividing lines were drawn inside them. Eight boxes said "eight of
 * something"; they did not say a hotel is not a hospital and a hospital is
 * not a factory, which is the entire claim the section above them makes.
 *
 * Discipline is `src/app/home/why/skeletons.tsx`:
 *
 *   one stage        every glyph is drawn on the same 64×44 grid, so a
 *                    1-unit line is the same weight in all eight and they
 *                    read as one set rather than eight drawings.
 *   strokes only     nothing filled carries meaning. A filled shape on this
 *                    canvas reads as a hole punched in it.
 *   one accent       #00b4d8 at three opacities. No second colour, no
 *                    gradient, no glow — a static drawing never glows.
 *   one ground line  every building stands on y=40, so the row sits level.
 *
 * They are decorative. Every one is `aria-hidden`, and the industry name
 * next to it is always real text — the label carries the meaning, the glyph
 * only makes it findable at a glance.
 */
import type { ReactNode } from "react";

const ACCENT = "#00b4d8";

const edge = {
  stroke: ACCENT,
  strokeOpacity: 0.55,
  strokeWidth: 1.1,
  fill: "none",
} as const;
const faint = {
  stroke: ACCENT,
  strokeOpacity: 0.3,
  strokeWidth: 1,
  fill: "none",
} as const;
const base = {
  stroke: ACCENT,
  strokeOpacity: 0.9,
  strokeWidth: 1.5,
  fill: "none",
} as const;

/** The shared stage. Nothing may be drawn outside 4 → 60 by 4 → 40. */
export const GLYPH_VIEWBOX = "0 0 64 44";

/* ── Hospitality ──────────────────────────────────────────────────────
   A tower and a lower wing, entrance at the foot of the tower. Height and
   the second block are what separate it from the shopfront: a hotel is
   many floors of the same thing, a store is one floor of many things. */
const Hospitality = () => (
  <>
    <rect x={12} y={6} width={20} height={34} {...edge} />
    {[14, 21, 28].map((y) => (
      <line key={y} x1={12} y1={y} x2={32} y2={y} {...faint} />
    ))}
    <line x1={22} y1={6} x2={22} y2={31} {...faint} />
    <rect x={18} y={32} width={8} height={8} {...base} />
    <rect x={34} y={20} width={22} height={20} {...edge} />
    {[27, 33].map((y) => (
      <line key={y} x1={38} y1={y} x2={52} y2={y} {...faint} />
    ))}
  </>
);

/* ── Healthcare ───────────────────────────────────────────────────────
   A block with two wings and a cross over the entrance. The cross is the
   only thing drawn at full weight, because it is the one mark that makes
   the building unmistakable at 20 pixels. */
const Healthcare = () => (
  <>
    <rect x={6} y={24} width={10} height={16} {...faint} />
    <rect x={48} y={24} width={10} height={16} {...faint} />
    <rect x={16} y={10} width={32} height={30} {...edge} />
    <line x1={32} y1={15} x2={32} y2={27} {...base} />
    <line x1={26} y1={21} x2={38} y2={21} {...base} />
    <line x1={16} y1={32} x2={48} y2={32} {...faint} />
    <rect x={28} y={33} width={8} height={7} {...faint} />
  </>
);

/* ── Technology & Enterprise ──────────────────────────────────────────
   A processor rather than an office block: the industry is defined by
   what it builds, not by the building it sits in. */
const Technology = () => (
  <>
    {[14, 22, 30].map((y) => (
      <line key={`l${y}`} x1={8} y1={y} x2={18} y2={y} {...faint} />
    ))}
    {[14, 22, 30].map((y) => (
      <line key={`r${y}`} x1={46} y1={y} x2={56} y2={y} {...faint} />
    ))}
    {[24, 32, 40].map((x) => (
      <line key={`t${x}`} x1={x} y1={4} x2={x} y2={10} {...faint} />
    ))}
    {[24, 32, 40].map((x) => (
      <line key={`b${x}`} x1={x} y1={34} x2={x} y2={40} {...faint} />
    ))}
    <rect x={18} y={10} width={28} height={24} {...edge} />
    <rect x={25} y={17} width={14} height={10} {...base} />
  </>
);

/* ── Digital Commerce ─────────────────────────────────────────────────
   A storefront with no street: a window and the parcel that leaves it.
   This is what separates it from Retail, which has a door. */
const Commerce = () => (
  <>
    <rect x={6} y={8} width={30} height={22} {...edge} />
    <line x1={6} y1={14} x2={36} y2={14} {...edge} />
    <line x1={9} y1={11} x2={13} y2={11} {...faint} />
    {[20, 25].map((y) => (
      <line key={y} x1={10} y1={y} x2={30} y2={y} {...faint} />
    ))}
    <line x1={36} y1={24} x2={40} y2={24} {...faint} />
    <rect x={40} y={20} width={18} height={18} {...base} />
    <line x1={49} y1={20} x2={49} y2={38} {...faint} />
    <line x1={40} y1={28} x2={58} y2={28} {...faint} />
  </>
);

/* ── Education ────────────────────────────────────────────────────────
   Pediment and columns. The oldest sign there is for the thing, and the
   one shape on this page that could not be mistaken for a business. */
const Education = () => (
  <>
    <path d="M8 20 L32 6 L56 20" {...edge} />
    <line x1={8} y1={20} x2={56} y2={20} {...base} />
    {[15, 25, 39, 49].map((x) => (
      <line key={x} x1={x} y1={20} x2={x} y2={36} {...faint} />
    ))}
    <line x1={10} y1={36} x2={54} y2={36} {...base} />
    <line x1={6} y1={40} x2={58} y2={40} {...faint} />
  </>
);

/* ── Professional Services ────────────────────────────────────────────
   A case and a document. The output of the work, not a premises — these
   businesses sell what they know, and they deliver it as a file. */
const Professional = () => (
  <>
    <path d="M20 16 L20 11 L31 11 L31 16" {...faint} />
    <rect x={9} y={16} width={31} height={22} {...edge} />
    <line x1={9} y1={25} x2={40} y2={25} {...faint} />
    <line x1={21} y1={23} x2={28} y2={23} {...base} />
    <rect x={42} y={8} width={16} height={22} {...base} />
    {[14, 19, 24].map((y) => (
      <line key={y} x1={45} y1={y} x2={55} y2={y} {...faint} />
    ))}
  </>
);

/* ── Manufacturing ────────────────────────────────────────────────────
   Sawtooth roof and a stack. Nothing else in the set has a roof that
   repeats, which is what a plant looks like from the road. */
const Manufacturing = () => (
  <>
    <path d="M8 26 L18 17 L18 26 L28 17 L28 26 L38 17 L38 26" {...edge} />
    <line x1={8} y1={26} x2={8} y2={40} {...edge} />
    <line x1={38} y1={26} x2={38} y2={40} {...edge} />
    <line x1={8} y1={40} x2={58} y2={40} {...base} />
    <line x1={14} y1={34} x2={32} y2={34} {...faint} />
    <rect x={46} y={8} width={9} height={32} {...base} />
    <line x1={46} y1={14} x2={55} y2={14} {...faint} />
  </>
);

/* ── Retail ───────────────────────────────────────────────────────────
   One floor, an awning and a door onto a street. Physical stores — the
   thing Digital Commerce deliberately is not. */
const Retail = () => (
  <>
    <path d="M6 19 L11 10 L53 10 L58 19" {...edge} />
    <line x1={6} y1={19} x2={58} y2={19} {...base} />
    {[20, 32, 44].map((x) => (
      <line key={x} x1={x} y1={10} x2={x} y2={19} {...faint} />
    ))}
    <rect x={12} y={23} width={22} height={15} {...faint} />
    <line x1={12} y1={30} x2={34} y2={30} {...faint} />
    <rect x={39} y={23} width={12} height={17} {...edge} />
    <line x1={6} y1={40} x2={58} y2={40} {...base} />
  </>
);

/** Keyed by `IndustryEntry.id`. */
export const INDUSTRY_GLYPH: Record<string, () => ReactNode> = {
  hospitality: Hospitality,
  healthcare: Healthcare,
  technology: Technology,
  commerce: Commerce,
  education: Education,
  professional: Professional,
  manufacturing: Manufacturing,
  retail: Retail,
};

/**
 * A glyph on its own, for a section header.
 *
 * Decorative by definition — the industry name always sits beside it as
 * real text, so the glyph is hidden from assistive technology rather than
 * given a label that would be read out twice.
 */
export function IndustryGlyph({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const Glyph = INDUSTRY_GLYPH[id];
  if (!Glyph) return null;
  return (
    <svg
      viewBox={GLYPH_VIEWBOX}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <Glyph />
    </svg>
  );
}
