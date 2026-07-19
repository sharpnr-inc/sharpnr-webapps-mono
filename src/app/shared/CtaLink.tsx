import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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

const styles = {
  base: "group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200",
  light: {
    primary: "bg-blue text-white hover:bg-blue-deep",
    secondary:
      "border border-slate-300 text-slate-900 hover:border-blue hover:text-blue-deep",
  },
  navy: {
    primary: "bg-white text-navy hover:bg-ice",
    secondary: "border border-white/25 text-white hover:border-cyan/70",
  },
} as const;

/** Buttons represent decisions — one primary per section, calm feedback. */
export function CtaLink({
  children,
  to,
  href,
  variant = "primary",
  tone = "light",
  arrow = false,
  className = "",
}: CtaLinkProps) {
  const cls = `${styles.base} ${styles[tone][variant]} ${className}`;
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
