import { Plus, Trash2 } from "lucide-react";
import { Button, Textarea } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePolicyBuilderStore } from "../store/usePolicyBuilderStore";
import { SectionLabel } from "./SectionLabel";

export function Conditions({ className }: { className?: string }) {
  const conditions = usePolicyBuilderStore((s) => s.conditions);
  const addCondition = usePolicyBuilderStore((s) => s.addCondition);
  const updateCondition = usePolicyBuilderStore((s) => s.updateCondition);
  const removeCondition = usePolicyBuilderStore((s) => s.removeCondition);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <SectionLabel>Conditions</SectionLabel>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addCondition("when")}>
            <Plus className="h-3.5 w-3.5" /> when
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addCondition("unless")}
          >
            <Plus className="h-3.5 w-3.5" /> unless
          </Button>
        </div>
      </div>

      {conditions.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No conditions — the policy applies to the whole scope above.
        </p>
      )}

      {conditions.map((cond) => (
        <div key={cond.id} className="flex items-start gap-2">
          <span className="mt-2 w-14 shrink-0 font-mono text-xs text-muted-foreground">
            {cond.kind}
          </span>
          <Textarea
            value={cond.expression}
            rows={2}
            className="font-mono text-sm"
            onChange={(e) =>
              updateCondition(cond.id, { expression: e.target.value })
            }
            placeholder="e.g. resource.owner == principal"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => removeCondition(cond.id)}
            aria-label="Remove condition"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
}
