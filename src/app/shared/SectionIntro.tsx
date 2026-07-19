import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

interface SectionIntroProps {
  eyebrow?: string;
  heading: ReactNode;
  lede?: ReactNode;
  /** Background the intro sits on. */
  tone?: "light" | "navy";
  align?: "left" | "center";
  /** Heading scale — lg for major chapters, md for supporting sections. */
  size?: "lg" | "md";
  className?: string;
}

/**
 * Standard section opening: label → headline → supporting copy.
 * SDL rhythm: headline, 16–24px, copy, then content below.
 */
export function SectionIntro({
  eyebrow,
  heading,
  lede,
  tone = "light",
  align = "left",
  size = "lg",
  className = "",
}: SectionIntroProps) {
  const headingColor = tone === "navy" ? "text-white" : "text-navy";
  const ledeColor = tone === "navy" ? "text-white/70" : "text-slate-600";
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto flex flex-col items-center text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`${eyebrow ? "mt-4" : ""} max-w-3xl font-bold ${headingColor} ${
          size === "lg"
            ? "text-heading-lg md:text-heading-xl"
            : "text-heading-md md:text-heading-lg"
        }`}
      >
        {heading}
      </h2>
      {lede && (
        <p className={`prose-width mt-5 text-body-lg ${ledeColor}`}>{lede}</p>
      )}
    </div>
  );
}
