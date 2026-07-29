import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSpecular } from "@/components/ui/specular";

interface CtaLinkProps {
  children: ReactNode;
  /** Internal route — rendered with the router Link. */
  to?: string;
  /** External URL (auth app, docs, product apps). */
  href?: string;
  variant?: "primary" | "secondary";
  /** Background the button sits on. */
  tone?: "light" | "navy";
  /** Show a trailing arrow — reserve for the main action of a section. */
  arrow?: boolean;
  className?: string;
}

/*
 * 6px corners, not the reference snippet's `radius={18}`. The rounder
 * corner suits an isolated demo button; across a site built from square
 * hairline diagrams it reads as a different design language. A small
 * radius keeps the specular arc travelling around a recognisable edge
 * without softening the page.
 *
 * No `border` on the primary: the specular `::before` IS the border, and a
 * real one underneath doubled the edge to 2px and flattened the effect.
 * The secondary keeps its border because it carries no rim.
 */
const styles = {
  base: "hp-specular group inline-flex items-center justify-center gap-2 rounded-[6px] px-7 py-3.5 text-sm font-medium transition-colors duration-200",
  light: {
    primary: "bg-blue text-white hover:bg-blue-deep",
    secondary:
      "border border-slate-300 text-slate-900 hover:border-blue hover:text-blue-deep",
  },
  navy: {
    /* Filled, with a blue rim. Cyan on cyan would be invisible.
       The fill does not lighten on hover — that washed out the rim just as
       it lit, so the specular arc is the hover feedback on its own. */
    primary: "bg-cyan text-navy",
    /* Dark, with the cyan rim as its only border. */
    secondary: "bg-canvas text-white hover:bg-white/[0.05]",
  },
} as const;

/**
 * Buttons represent decisions — one primary per section, calm feedback.
 *
 * Every CTA carries the specular rim: a bright arc on the border that
 * angles toward the pointer and fades up as it approaches. It is deliberately
 * a *link* and not the upstream component's `<button>` — these navigate, and
 * a button would lose middle-click, open-in-new-tab and the href a crawler
 * reads. `components/ui/specular.ts` explains the rest of that trade.
 *
 * A filled button gets a white sheen, an outlined one an ice-coloured rim,
 * via `data-tone` — the same highlight on both would read as correct on
 * neither.
 */
export function CtaLink({
  children,
  to,
  href,
  variant = "primary",
  tone = "light",
  arrow = false,
  className = "",
}: CtaLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useSpecular(ref);

  const cls = `${styles.base} ${styles[tone][variant]} ${className}`;
  const solid = variant === "primary";
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={cls}
        data-tone={solid ? "solid" : undefined}
      >
        {inner}
      </Link>
    );
  }
  return (
    <a
      ref={ref}
      href={href}
      className={cls}
      data-tone={solid ? "solid" : undefined}
    >
      {inner}
    </a>
  );
}
