import type { ReactNode } from "react";
import { cn } from "@sharpnr/utils";

/* -------------------------------------------------------------------------- */
/*  Diagram primitives.                                                       */
/*                                                                            */
/*  Each site draws one diagram of the mechanism that makes it different --   */
/*  not an illustration beside the copy, but the copy's argument in a form     */
/*  you can look at. These are the shared parts so thirteen hand-drawn SVGs    */
/*  still read as one family: same node shape, same rule weight, same label    */
/*  type. Everything is `currentColor` plus the app's accent, so a diagram      */
/*  themes with the page it sits on.                                          */
/* -------------------------------------------------------------------------- */

export type DiagramProps = {
  /** Describes the mechanism for anyone not seeing the drawing. */
  title: string;
  viewBox: string;
  children: ReactNode;
  /** A caption under the frame, in the page's small type. */
  caption?: ReactNode;
  /**
   * Sits the drawing on its own panel. On by default: a hero's background
   * motif runs behind the diagram, and bare line-art over a repeating pattern
   * is hard to read.
   */
  framed?: boolean;
  className?: string;
};

export function Diagram({
  title,
  viewBox,
  children,
  caption,
  framed = true,
  className,
}: DiagramProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "overflow-hidden",
          framed &&
            "rounded-xl border border-border bg-background/80 p-6 backdrop-blur-[2px] md:p-8",
        )}
      >
        {/* No `overflow-visible` here: an inline SVG that paints outside its
            viewBox contributes that overflow to the page's scroll width, which
            on a phone shows up as the whole document being too wide. Every
            diagram is drawn to fit its own viewBox instead. */}
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={title}
          className="block w-full"
        >
          {children}
        </svg>
      </div>
      {caption && (
        <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** A labelled box. The unit every diagram is assembled from. */
export function DNode({
  x,
  y,
  w = 132,
  h = 46,
  label,
  sub,
  accent = false,
  dashed = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  /** Quieter second line, e.g. which app the node lives in. */
  sub?: string;
  /** Fills with the page accent -- for the node the diagram is about. */
  accent?: boolean;
  /** For something that does not exist yet. */
  dashed?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={7}
        className={cn(
          accent ? "fill-primary/10 stroke-primary" : "fill-transparent stroke-current",
          accent ? "opacity-100" : "opacity-30",
        )}
        strokeWidth={1.5}
        {...(dashed ? { strokeDasharray: "4 4" } : {})}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        className={cn(
          "fill-current text-[11px] font-semibold",
          accent && "fill-primary",
        )}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          className="fill-current text-[9px] opacity-50"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** Small type floating in the diagram, for naming what an edge carries. */
export function DLabel({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-current text-[9px] tracking-wide uppercase opacity-45"
    >
      {children}
    </text>
  );
}

/** The arrowhead marker every diagram's connectors point with. */
export function DArrowDefs({ id = "arw" }: { id?: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 8 8"
        refX="6"
        refY="4"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M1 1 L6 4 L1 7" className="fill-none stroke-current" strokeWidth="1.4" />
      </marker>
    </defs>
  );
}
