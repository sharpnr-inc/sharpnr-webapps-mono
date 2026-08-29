import { Plus } from "lucide-react";
import { Button } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePermissionMatrixStore } from "../store/usePermissionMatrixStore";
import type { ConditionPalette, ResourceDescriptor } from "../types";
import { newCondition } from "../utils/conditions";
import { ConditionRow } from "./ConditionRow";

/**
 * The restrictions on one resource.
 *
 * Rows are ANDed into a single `when { ... }` — see utils/conditions.ts. There
 * is no `unless` control anywhere in this UI, and no "when/unless" choice for
 * the user to get wrong: negation is an operator on the row.
 */
export function ResourceConditions({
  resource,
  palette,
  className,
}: {
  resource: ResourceDescriptor;
  palette: ConditionPalette;
  className?: string;
}) {
  const rules = usePermissionMatrixStore((s) => s.rules);
  const addCondition = usePermissionMatrixStore((s) => s.addCondition);

  const conditions = rules[resource.type]?.conditions ?? [];

  // Never seed a row with a key the engine does not stamp — that is a rule
  // that reads correctly and can never match.
  const firstUsable = palette.keys.find((k) => !k.unavailableReason);
  if (!firstUsable) return null;

  return (
    <div className={cn("border-t px-4 py-3", className)}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs">
          {conditions.length === 0
            ? "Applies at any time, from anywhere."
            : conditions.length === 1
              ? "Applies only when this is true:"
              : `Applies only when all ${conditions.length} are true:`}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 shrink-0 gap-1 px-2 text-xs"
          onClick={() => addCondition(resource.type, newCondition(firstUsable))}
        >
          <Plus className="h-3 w-3" />
          Add restriction
        </Button>
      </div>

      {conditions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {conditions.map((condition) => (
            <ConditionRow
              key={condition.id}
              resourceType={resource.type}
              condition={condition}
              palette={palette}
            />
          ))}
        </div>
      )}
    </div>
  );
}
