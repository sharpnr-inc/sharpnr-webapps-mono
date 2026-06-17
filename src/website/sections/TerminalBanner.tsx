import { Typewriter } from "../components/Typewriter";

/** Decorative CLI banner — stylistic flourish, not real output. */
export function TerminalBanner() {
  return (
    <div className="border-y border-border bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className="text-muted-foreground/50 select-none">$</span>
          <span className="text-muted-foreground">
            <Typewriter text="orchestrator --connect --apps --services --watch" delay={300} />
          </span>
        </div>
      </div>
    </div>
  );
}
