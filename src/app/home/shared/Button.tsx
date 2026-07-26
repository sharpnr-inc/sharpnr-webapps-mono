import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  /** Internal route — rendered with the router Link. */
  to?: string;
  /** External URL (auth app, docs) or mailto:. */
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  /** Trailing arrow — reserve for the main action of a section. */
  arrow?: boolean;
  className?: string;
}

/*
 * Homepage button — Component Language 3.0.
 * Primary: filled accent. Secondary: outlined. Ghost: text only.
 * Height 52px, radius 14px, 24px horizontal padding, 16px / 600.
 * Hover: background brightens, lift 2px, arrow slides 6px (180ms).
 * Press returns to origin. Never scales. Never bounces.
 */
const base =
  "group inline-flex h-[52px] select-none items-center justify-center gap-2.5 rounded-none px-7 text-[0.9375rem] font-semibold tracking-tight " +
  "transition-[transform,background-color,border-color,color] duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cyan " +
  "active:translate-y-0 active:duration-120 motion-safe:hover:-translate-y-0.5";

const variants = {
  primary: "bg-cyan text-navy hover:bg-sky",
  secondary:
    "border border-white/20 text-white/90 hover:border-white/45 hover:bg-white/[0.06] hover:text-white",
  ghost: "px-2 text-white/75 hover:text-white",
} as const;

export function Button({
  children,
  to,
  href,
  variant = "primary",
  arrow = false,
  className = "",
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}
