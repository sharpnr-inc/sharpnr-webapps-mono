import { cn } from "@sharpnr/utils";
import { usePolicyBuilderContext } from "../context";

/**
 * Renders the live-generated Cedar text from context. Handy for consumers that
 * want to surface a preview alongside the form.
 */
export function Preview({ className }: { className?: string }) {
  const { text, valid, engineReady } = usePolicyBuilderContext("Preview");
  return (
    <div className={cn("space-y-1.5", className)}>
      <pre
        className={cn(
          "overflow-auto rounded-lg border bg-muted/40 p-4 font-mono text-xs",
          engineReady && !valid && "border-destructive/50",
        )}
      >
        {text || "// start building to see the generated policy"}
      </pre>
      {!engineReady ? (
        <p className="text-xs text-muted-foreground">
          Loading the Cedar engine — the policy has not been validated yet.
        </p>
      ) : null}
    </div>
  );
}
