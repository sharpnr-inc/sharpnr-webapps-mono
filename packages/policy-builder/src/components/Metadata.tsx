import { cn } from "@sharpnr/utils";
import { Description } from "./Description";
import { EffectField } from "./EffectField";
import { Name } from "./Name";

/** Convenience grouping of Name + Effect + Description. */
export function Metadata({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Name />
        <EffectField />
      </div>
      <Description />
    </div>
  );
}
