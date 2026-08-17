import type {
  Condition,
  PolicyBuilderState,
  ScopeConstraint,
} from "../store/usePolicyBuilderStore";

/** `User::"alice"` — a Cedar entity reference. */
function entityRef(c: ScopeConstraint) {
  return `${c.entityType.trim()}::"${c.entityId.trim()}"`;
}

/**
 * Render a single scope line, e.g. `principal == User::"alice"`.
 * Returns just the variable name when the op is "All" (unconstrained).
 */
function scopeToText(varName: "principal" | "action" | "resource", c: ScopeConstraint) {
  switch (c.op) {
    case "All":
      return varName;
    case "is":
      // `principal is User` — type check, no id.
      return `${varName} is ${c.entityType.trim()}`;
    case "==":
    case "in":
    default:
      return `${varName} ${c.op} ${entityRef(c)}`;
  }
}

function conditionToText(cond: Condition) {
  const expr = cond.expression.trim() || "true";
  return `${cond.kind} { ${expr} }`;
}

/**
 * Turn the builder draft into Cedar policy source text. Pure string assembly —
 * validation happens separately via {@link verifyPolicy}.
 */
/** Turn a human policy name into a Cedar-safe `@id` slug. */
function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildPolicyText(state: PolicyBuilderState): string {
  const { name, description, effect, principal, action, resource, conditions } =
    state;

  const annotations: string[] = [];
  if (name.trim()) annotations.push(`@id("${slugify(name)}")`);
  if (description.trim())
    // Escape quotes so the annotation stays valid Cedar.
    annotations.push(`@description("${description.trim().replace(/"/g, '\\"')}")`);

  const scope = [
    scopeToText("principal", principal),
    scopeToText("action", action),
    scopeToText("resource", resource),
  ].join(",\n  ");

  const head = annotations.length ? `${annotations.join("\n")}\n` : "";
  const conditionsText = conditions
    .map((c) => `\n${conditionToText(c)}`)
    .join("");

  return `${head}${effect} (\n  ${scope}\n)${conditionsText};`;
}
