/** Small circular progress ring that drains as `remaining` counts down. */
export function CountdownRing({
  remaining,
  total,
}: {
  remaining: number;
  total: number;
}) {
  const radius = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? Math.min(Math.max(remaining / total, 0), 1) : 0;

  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 -rotate-90"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r={radius}
        fill="none"
        strokeWidth="2"
        className="stroke-muted-foreground/25"
      />
      <circle
        cx="8"
        cy="8"
        r={radius}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        className="stroke-foreground/60 transition-[stroke-dashoffset] duration-1000 ease-linear"
      />
    </svg>
  );
}
