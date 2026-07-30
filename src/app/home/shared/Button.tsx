import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSpecular } from "@/components/ui/specular";

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
  "hp-specular group inline-flex h-[52px] select-none items-center justify-center gap-2.5 rounded-[6px] px-7 text-[0.9375rem] font-semibold tracking-tight " +
  "transition-[transform,background-color,border-color,color] duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cyan " +
  "active:translate-y-0 active:duration-120 motion-safe:hover:-translate-y-0.5";

/*
 * Filled primary, rimmed secondary — the hierarchy stays, and each takes
 * the specular colour that is actually visible on it (see `hp-specular` in
 * index.css): blue on the cyan fill, cyan on the dark one.
 *
 * The secondary carries no `border` of its own any more. The specular
 * `::before` is its border; a real one underneath doubled the edge to 2px
 * and flattened the rim into a plain outline.
 */
const variants = {
  /* The fill deliberately does not change on hover. It used to lighten to
     sky, which washed the blue rim out at exactly the moment the rim was
     supposed to be the feedback — the button got paler and nothing looked
     like it had lit up. The specular arc is the hover state now, so the
     fill has to hold still for it to read against. */
  primary: "bg-cyan text-navy",
  secondary: "bg-canvas text-white/90 hover:bg-white/[0.05] hover:text-white",
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
  const ref = useRef<HTMLAnchorElement>(null);
  useSpecular(ref);

  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5" />
      )}
    </>
  );

  /* Ghost is text, not a button — a rim around a text link would give it
     the weight of a primary action, which is the one thing it must not
     have. */
  const tone = variant === "primary" ? "solid" : undefined;

  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} data-tone={tone}>
        {inner}
      </Link>
    );
  }
  return (
    <a ref={ref} href={href} className={cls} data-tone={tone}>
      {inner}
    </a>
  );
}
