/*
 * The same two words the Industries page uses (`industries/roadmap.ts`):
 * "Available now" and "In design". "Coming Soon" and "Roadmap" both read as
 * a date being kept quiet; "In design" is the honest word for something that
 * is not built, not in beta and not scheduled. Two labels for one meaning is
 * how a visitor ends up believing the platform ships more than it does.
 */
const kinds = {
  available: {
    label: "Available now",
    dot: "bg-green-600",
    cls: "border-green-200 bg-green-50 text-green-800",
  },
  soon: {
    label: "In design",
    dot: "bg-blue",
    cls: "border-sky/70 bg-ice/60 text-blue-deep",
  },
  roadmap: {
    label: "In design",
    dot: "bg-slate-400",
    cls: "border-slate-200 bg-slate-50 text-slate-600",
  },
  early: {
    label: "Early Access",
    dot: "bg-cyan",
    cls: "border-sky/70 bg-ice/60 text-blue-deep",
  },
} as const;

interface StatusBadgeProps {
  kind: keyof typeof kinds;
  /** Override the default label when context needs it. */
  label?: string;
  /** Set when the badge sits on deep navy. */
  tone?: "light" | "navy";
  className?: string;
}

/** Availability is always stated honestly — never blur what exists today. */
export function StatusBadge({ kind, label, tone = "light", className = "" }: StatusBadgeProps) {
  const k = kinds[kind];
  const surface =
    tone === "navy" ? "border-white/20 bg-white/5 text-white/85" : k.cls;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${surface} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${k.dot}`} />
      {label ?? k.label}
    </span>
  );
}
