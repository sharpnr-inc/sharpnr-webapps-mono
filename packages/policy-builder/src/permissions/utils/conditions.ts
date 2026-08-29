import type {
  Condition,
  ConditionKeyDescriptor,
  ConditionOperator,
  ConditionPalette,
} from "../types";

/** Labels for the operator dropdown, in the order they should appear. */
export const OPERATOR_LABELS: Record<ConditionOperator, string> = {
  is: "is",
  isNot: "is not",
  isOneOf: "is one of",
  isNoneOf: "is none of",
};

export function findKey(
  palette: ConditionPalette,
  cedar: string,
): ConditionKeyDescriptor | undefined {
  return palette.keys.find((k) => k.cedar === cedar);
}

/** Whether an operator takes several values (a multi-select) or one. */
export function isMultiValue(op: ConditionOperator): boolean {
  return op === "isOneOf" || op === "isNoneOf";
}

let seq = 0;
export function newCondition(key: ConditionKeyDescriptor): Condition {
  seq += 1;
  return {
    id: `cond_${Date.now().toString(36)}_${seq}`,
    key: key.cedar,
    operator: key.operators[0] ?? "is",
    // Seed a bool with "true" so a freshly added row already means something;
    // an incomplete row would otherwise generate nothing and look broken.
    values: key.type === "bool" ? ["true"] : [],
  };
}

/**
 * Renders one restriction as a Cedar boolean expression.
 *
 * Notes on the two non-obvious mappings:
 *
 *   bool  — a boolean attribute reads as itself, so "Business hours is Yes" is
 *           `context.isBusinessHours`, and "is No" is `!context.isBusinessHours`.
 *           Comparing to `== true` is legal but noise.
 *
 *   oneOf — Cedar's `in` is ENTITY HIERARCHY membership, not set membership, so
 *           `context.network in ["office","vpn"]` is not what it looks like.
 *           Set membership is `[...].contains(x)`, which is what this emits.
 */
export function renderCondition(
  condition: Condition,
  key: ConditionKeyDescriptor,
): string | null {
  const path = key.cedar;

  if (key.type === "bool") {
    const wantsTrue = condition.values[0] !== "false";
    const negated = condition.operator === "isNot";
    return wantsTrue === negated ? `!${path}` : path;
  }

  if (condition.values.length === 0) return null; // incomplete row: emit nothing

  const quoted = condition.values.map((v) => JSON.stringify(v));

  switch (condition.operator) {
    case "is":
      return `${path} == ${quoted[0]}`;
    case "isNot":
      return `${path} != ${quoted[0]}`;
    case "isOneOf":
      return `[${quoted.join(", ")}].contains(${path})`;
    case "isNoneOf":
      return `![${quoted.join(", ")}].contains(${path})`;
  }
}

/**
 * Renders every restriction on a resource as one `when { ... }` clause.
 *
 * Rows are ANDed. "Or" lives inside a single row's value list ("is one of"),
 * which covers nearly every real case without asking a non-technical user to
 * build an expression tree.
 */
export function renderWhenClause(
  conditions: Condition[] | undefined,
  palette: ConditionPalette,
): string {
  if (!conditions || conditions.length === 0) return "";

  const parts: string[] = [];
  for (const condition of conditions) {
    const key = findKey(palette, condition.key);
    if (!key) continue;
    const rendered = renderCondition(condition, key);
    if (rendered) parts.push(rendered);
  }

  if (parts.length === 0) return "";
  if (parts.length === 1) return `\nwhen { ${parts[0]} }`;
  return `\nwhen {\n  ${parts.join(" &&\n  ")}\n}`;
}

/** Plain-language echo of a row, for the summary under a resource. */
export function describeCondition(
  condition: Condition,
  key: ConditionKeyDescriptor,
): string {
  if (key.type === "bool") {
    const wantsTrue =
      (condition.values[0] !== "false") === (condition.operator !== "isNot");
    return `${key.label} is ${wantsTrue ? "yes" : "no"}`;
  }
  const labels = condition.values.map(
    (v) => key.values?.find((kv) => kv.value === v)?.label ?? v,
  );
  return `${key.label} ${OPERATOR_LABELS[condition.operator]} ${
    labels.join(", ") || "…"
  }`;
}
