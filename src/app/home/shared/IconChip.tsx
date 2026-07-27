import type { LucideIcon } from "lucide-react";
import { onSpotlightMove } from "@/app/home/shared/spotlight";

interface IconChipProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  /** Tailwind size classes for the glyph itself — no icon-in-a-square
   * backdrop, the SVG is the graphic. */
  iconClassName?: string;
  /** "row" (icon beside label, the default) or "col" (icon above label,
   * for narrow grid cells like Scene 03's locked structure). */
  direction?: "row" | "col";
}

/*
 * The flat icon chip — a hairline frame and a bare, larger SVG glyph doing
 * the work. Never a UI card: no fill, no icon-in-a-tinted-square, nothing
 * that reads as a dashboard feature tile.
 */
export function IconChip({
  icon: Icon,
  label,
  className = "",
  iconClassName = "size-7",
  direction = "row",
}: IconChipProps) {
  return (
    <div
      onMouseMove={onSpotlightMove}
      className={`hp-icon-chip hp-spotlight flex gap-3 ${
        direction === "col" ? "flex-col items-start justify-center" : "items-center"
      } ${className}`}
    >
      <Icon className={`shrink-0 text-sky ${iconClassName}`} strokeWidth={1.5} />
      <span className="wrap-break-word text-sm font-semibold leading-tight tracking-tight text-white/85">
        {label}
      </span>
    </div>
  );
}
