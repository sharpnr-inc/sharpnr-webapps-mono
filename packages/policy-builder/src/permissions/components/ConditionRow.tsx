import { X } from "lucide-react";
import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePermissionMatrixStore } from "../store/usePermissionMatrixStore";
import type {
  Condition,
  ConditionKeyDescriptor,
  ConditionOperator,
  ConditionPalette,
} from "../types";
import { OPERATOR_LABELS, findKey, isMultiValue } from "../utils/conditions";

/**
 * One restriction: key, operator, value(s).
 *
 * Three dropdowns, all fed by the palette — never a text box. A free-text value
 * is how you get a rule that reads correctly and matches nothing: Cedar's `==`
 * is case-sensitive, so someone typing "mumbai" against a stored "Mumbai" gets
 * silence, not an error.
 */
export function ConditionRow({
  resourceType,
  condition,
  palette,
  className,
}: {
  resourceType: string;
  condition: Condition;
  palette: ConditionPalette;
  className?: string;
}) {
  const update = usePermissionMatrixStore((s) => s.updateCondition);
  const remove = usePermissionMatrixStore((s) => s.removeCondition);

  const key = findKey(palette, condition.key);
  if (!key) return null;

  const multi = isMultiValue(condition.operator);

  const groups = palette.keys.reduce<Record<string, ConditionKeyDescriptor[]>>(
    (acc, k) => {
      const g = k.group ?? "Other";
      (acc[g] ??= []).push(k);
      return acc;
    },
    {},
  );

  return (
    <div
      className={cn(
        "bg-muted/40 flex flex-wrap items-center gap-2 rounded-md px-2.5 py-2",
        className,
      )}
    >
      <span className="text-muted-foreground shrink-0 text-xs">Only when</span>

      {/* What to test */}
      <Select
        value={condition.key}
        onValueChange={(cedar) => {
          const next = findKey(palette, cedar);
          if (!next) return;
          // Operator and values belong to the old key; carrying them across
          // would leave a row that renders nonsense.
          update(resourceType, condition.id, {
            key: cedar,
            operator: next.operators[0] ?? "is",
            values: next.type === "bool" ? ["true"] : [],
          });
        }}
      >
        <SelectTrigger className="h-7 w-auto min-w-[9rem] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(groups).map(([group, keys]) => (
            <SelectGroup key={group}>
              <SelectLabel>{group}</SelectLabel>
              {keys.map((k) => (
                <SelectItem
                  key={k.cedar}
                  value={k.cedar}
                  disabled={Boolean(k.unavailableReason)}
                >
                  {k.label}
                  {k.unavailableReason ? " — unavailable" : ""}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      {/* How to compare. Negation lives here, which is what removes `unless`. */}
      <Select
        value={condition.operator}
        onValueChange={(op) =>
          update(resourceType, condition.id, {
            operator: op as ConditionOperator,
            // Narrowing many values to one would silently drop the rest.
            values: isMultiValue(op as ConditionOperator)
              ? condition.values
              : condition.values.slice(0, 1),
          })
        }
      >
        <SelectTrigger className="h-7 w-auto text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {key.operators.map((op) => (
            <SelectItem key={op} value={op}>
              {OPERATOR_LABELS[op]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* The value(s) */}
      {key.type === "bool" ? (
        <Select
          value={condition.values[0] ?? "true"}
          onValueChange={(v) => update(resourceType, condition.id, { values: [v] })}
        >
          <SelectTrigger className="h-7 w-auto text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      ) : multi ? (
        <ValueChips
          resourceType={resourceType}
          condition={condition}
          keyDescriptor={key}
        />
      ) : (
        <Select
          value={condition.values[0] ?? ""}
          onValueChange={(v) => update(resourceType, condition.id, { values: [v] })}
        >
          <SelectTrigger className="h-7 w-auto min-w-[8rem] text-xs">
            <SelectValue placeholder="Choose…" />
          </SelectTrigger>
          <SelectContent>
            {(key.values ?? []).map((v) => (
              <SelectItem key={v.value} value={v.value}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground ml-auto h-6 w-6 shrink-0 p-0"
        aria-label="Remove this restriction"
        onClick={() => remove(resourceType, condition.id)}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

/**
 * Multi-select for "is one of" / "is none of", as toggleable chips.
 *
 * "Or" lives here rather than in the row list: several values in one row is an
 * OR, several rows is an AND. That covers what people actually ask for without
 * making anyone build an expression tree.
 */
function ValueChips({
  resourceType,
  condition,
  keyDescriptor,
}: {
  resourceType: string;
  condition: Condition;
  keyDescriptor: ConditionKeyDescriptor;
}) {
  const update = usePermissionMatrixStore((s) => s.updateCondition);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {(keyDescriptor.values ?? []).map((v) => {
        const on = condition.values.includes(v.value);
        return (
          <button
            key={v.value}
            type="button"
            aria-pressed={on}
            onClick={() =>
              update(resourceType, condition.id, {
                values: on
                  ? condition.values.filter((x) => x !== v.value)
                  : [...condition.values, v.value],
              })
            }
          >
            <Badge
              variant={on ? "default" : "outline"}
              className="cursor-pointer text-xs font-normal"
            >
              {v.label}
            </Badge>
          </button>
        );
      })}
      {condition.values.length === 0 && (
        <span className="text-muted-foreground text-xs italic">
          pick at least one
        </span>
      )}
    </div>
  );
}
