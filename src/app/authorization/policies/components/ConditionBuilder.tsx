import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@sharpnr/ui";
import { Plus, Trash2, Filter } from "lucide-react";
import type { ConditionInput } from "../../cederbuilder/service";
import {
  CONDITION_CLAUSES,
  CONDITION_SOURCES,
  CONDITION_OPS,
  CONDITION_VALUE_TYPES,
} from "../data/policyOptions";

interface ConditionBuilderProps {
  conditions: ConditionInput[];
  onChange: (next: ConditionInput[]) => void;
}

const newCondition = (): ConditionInput => ({
  clause: "when",
  source: "resource",
  attribute: "",
  operator: "==",
  valueType: "string",
  value: "",
});

export function ConditionBuilder({
  conditions,
  onChange,
}: ConditionBuilderProps) {
  const update = (index: number, patch: Partial<ConditionInput>) => {
    onChange(
      conditions.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    );
  };

  const remove = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  const add = () => onChange([...conditions, newCondition()]);

  return (
    <div className="space-y-3">
      {conditions.length === 0 && (
        <div className="flex flex-col items-center gap-1 rounded-md border border-dashed py-6 text-center">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            No conditions — the policy applies to all matching requests.
          </p>
        </div>
      )}

      {conditions.map((c, i) => {
        const showValue = c.operator !== "has";
        return (
          <div
            key={i}
            className="space-y-2 rounded-md border bg-muted/30 p-3"
          >
            <div className="flex items-center justify-between">
              <Select
                value={c.clause}
                onValueChange={(v) =>
                  update(i, { clause: v as ConditionInput["clause"] })
                }
              >
                <SelectTrigger className="h-7 w-44 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CONDITION_CLAUSES.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => remove(i)}
                aria-label="Remove condition"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Source */}
              <Select
                value={c.source}
                onValueChange={(v) =>
                  update(i, { source: v as ConditionInput["source"] })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CONDITION_SOURCES.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Attribute path */}
              <Input
                value={c.attribute}
                onChange={(e) => update(i, { attribute: e.target.value })}
                placeholder="attribute, e.g. status"
                className="w-40 font-mono text-xs"
              />

              {/* Operator */}
              <Select
                value={c.operator}
                onValueChange={(v) =>
                  update(i, { operator: v as ConditionInput["operator"] })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CONDITION_OPS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Value type + value */}
              {showValue && (
                <>
                  <Select
                    value={c.valueType}
                    onValueChange={(v) =>
                      update(i, {
                        valueType: v as ConditionInput["valueType"],
                        value: v === "boolean" ? "true" : c.value,
                      })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {CONDITION_VALUE_TYPES.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {c.valueType === "boolean" ? (
                    <Select
                      value={c.value || "true"}
                      onValueChange={(v) => update(i, { value: v })}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">true</SelectItem>
                          <SelectItem value="false">false</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={c.value}
                      onChange={(e) => update(i, { value: e.target.value })}
                      placeholder={
                        c.valueType === "entity"
                          ? 'Group::"Admins"'
                          : c.valueType === "expr"
                            ? "principal.legalEntity"
                            : c.valueType === "number"
                              ? "0"
                              : "value"
                      }
                      className="w-44 font-mono text-xs"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={add}
      >
        <Plus className="h-3.5 w-3.5" /> Add condition
      </Button>
    </div>
  );
}
