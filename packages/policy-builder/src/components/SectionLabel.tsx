import type { ReactNode } from "react";

/** Small uppercase section heading used between groups. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}
