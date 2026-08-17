interface EyebrowProps {
  children: string;
  /** Background the label sits on — controls contrast color. */
  tone?: "light" | "navy";
  className?: string;
}

/** Small section label — quiet, uppercase, always above the headline. */
export function Eyebrow({ children, tone = "light", className = "" }: EyebrowProps) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.16em] ${
        tone === "navy" ? "text-cyan" : "text-blue"
      } ${className}`}
    >
      {children}
    </p>
  );
}
