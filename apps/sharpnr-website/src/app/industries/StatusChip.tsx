/*
 * Industries — the availability chip.
 *
 * A local component rather than the site-wide `StatusBadge`, for one
 * reason: on this page the chip is a *scanning* device, not a label. It
 * sits in the same place on every section header — hard against the right
 * edge, level with the industry name — so a visitor can run their eye down
 * the right margin and learn what exists without reading a word of copy.
 * That only works if all eight are identical in size and position, which
 * means the chip has exactly two states and no size variants.
 *
 * Available is the accent. In design is twilight — present, legible, and
 * visibly not the accent, so "one of these is real" is carried by colour
 * before it is carried by the words. Neither state glows; a chip is a
 * static element.
 */
import { STATUS_LABEL, type IndustryStatus } from "./roadmap";

const TONE: Record<IndustryStatus, string> = {
  available: "border-cyan/45 text-cyan",
  design: "border-twilight/40 text-twilight",
};

const DOT: Record<IndustryStatus, string> = {
  available: "bg-cyan",
  design: "bg-twilight/70",
};

export function StatusChip({
  status,
  className = "",
}: {
  status: IndustryStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] ${TONE[status]} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${DOT[status]}`} aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
}
