// Cedar policy helpers.
//
// The `@cedar-policy/cedar-wasm` ESM build initializes its WASM module via a
// top-level await (handled by `vite-plugin-wasm` + `vite-plugin-top-level-await`
// in vite.config.ts), so the exported functions are ready to call as soon as the
// module is imported — no manual `init()` step is required.
import {
  policyToJson,
  formatPolicies,
  type PolicyJson,
  type EntityUidJson,
} from "@cedar-policy/cedar-wasm";

/** Resolve an `EntityUidJson` (either `{ __entity }` wrapped or flat) to `Type::"id"`. */
function entityUidToString(uid: EntityUidJson): string {
  const ref = "__entity" in uid ? uid.__entity : uid;
  return `${ref.type}::"${ref.id}"`;
}

export interface ParsedConstraint {
  /** Human readable summary, e.g. `User::"alice"`, `is Photo`, `any`. */
  label: string;
}

function describeConstraint(
  c:
    | PolicyJson["principal"]
    | PolicyJson["action"]
    | PolicyJson["resource"],
): ParsedConstraint {
  switch (c.op) {
    case "All":
      return { label: "any" };
    case "==":
      return {
        label: "entity" in c ? entityUidToString(c.entity) : `?${c.slot}`,
      };
    case "in": {
      if ("entity" in c) return { label: `in ${entityUidToString(c.entity)}` };
      if ("entities" in c)
        return { label: `in [${c.entities.map(entityUidToString).join(", ")}]` };
      return { label: `in ?${c.slot}` };
    }
    case "is": {
      const base = `is ${c.entity_type}`;
      if (c.in) {
        const inPart =
          "entity" in c.in
            ? entityUidToString(c.in.entity)
            : `?${c.in.slot}`;
        return { label: `${base} in ${inPart}` };
      }
      return { label: base };
    }
    default:
      return { label: "any" };
  }
}

export interface ParsedPolicy {
  effect: PolicyJson["effect"];
  principal: ParsedConstraint;
  action: ParsedConstraint;
  resource: ParsedConstraint;
  hasConditions: boolean;
  annotations: Record<string, string>;
}

/**
 * Parse a Cedar policy (source text) into a structured summary used by the UI.
 * Returns `null` if the text is not valid Cedar.
 */
export function parsePolicy(policyText: string): ParsedPolicy | null {
  const res = policyToJson(policyText);
  if (res.type !== "success") return null;

  const json = res.json;
  const annotations: Record<string, string> = {};
  for (const [key, value] of Object.entries(json.annotations ?? {})) {
    annotations[key] = (value as { val?: string }).val ?? "";
  }

  return {
    effect: json.effect,
    principal: describeConstraint(json.principal),
    action: describeConstraint(json.action),
    resource: describeConstraint(json.resource),
    hasConditions: (json.conditions?.length ?? 0) > 0,
    annotations,
  };
}

/** Pretty-print Cedar policy text. Falls back to the original text on failure. */
export function formatPolicy(policyText: string, lineWidth = 80): string {
  const res = formatPolicies({ policyText, lineWidth, indentWidth: 2 });
  return res.type === "success" ? res.formatted_policy : policyText;
}

export type ScopeOp = "All" | "is" | "in" | "==";

export interface ScopeInput {
  op: ScopeOp;
  /** Entity type, e.g. `User` (used by `is`). */
  entityType?: string;
  /** Fully-qualified entity id, e.g. `Admins` for `Group::"Admins"`. */
  entityId?: string;
  /** Entity type namespace for `in` / `==` (e.g. `Group`). */
  entityNamespace?: string;
}

export type ConditionSource =
  | "principal"
  | "resource"
  | "action"
  | "context";

export type ConditionOp =
  | "=="
  | "!="
  | "<"
  | "<="
  | ">"
  | ">="
  | "in"
  | "like"
  | "has";

export type ConditionValueType =
  | "string"
  | "number"
  | "boolean"
  | "entity"
  | "expr";

export interface ConditionInput {
  /** `when` includes the request when true; `unless` excludes it. */
  clause: "when" | "unless";
  source: ConditionSource;
  /** Attribute path on the source, e.g. `status` or `owner.id`. */
  attribute: string;
  operator: ConditionOp;
  valueType: ConditionValueType;
  value: string;
}

export interface BuildPolicyInput {
  id?: string;
  effect: "permit" | "forbid";
  principal: ScopeInput;
  /** Specific action name, or empty for any action. */
  action?: string;
  resource: ScopeInput;
  /** Structured `when` / `unless` conditions. */
  conditions?: ConditionInput[];
}

function renderScope(kind: "principal" | "resource", s: ScopeInput): string {
  switch (s.op) {
    case "is":
      return s.entityType ? `${kind} is ${s.entityType}` : kind;
    case "in":
      return s.entityNamespace && s.entityId
        ? `${kind} in ${s.entityNamespace}::"${s.entityId}"`
        : kind;
    case "==":
      return s.entityNamespace && s.entityId
        ? `${kind} == ${s.entityNamespace}::"${s.entityId}"`
        : kind;
    case "All":
    default:
      return kind;
  }
}

/** Render the right-hand value of a condition based on its declared type. */
function renderConditionValue(c: ConditionInput): string {
  const raw = c.value.trim();
  switch (c.valueType) {
    case "string":
    case "expr":
    case "entity":
      // `string` is the only one we quote; entity/expr are written verbatim
      // (e.g. `Group::"Admins"` or `principal.legalEntity`).
      return c.valueType === "string" ? `"${raw}"` : raw;
    case "number":
      return raw;
    case "boolean":
      return raw === "true" ? "true" : "false";
    default:
      return raw;
  }
}

/** Build a single Cedar boolean expression from a structured condition. */
export function buildConditionExpr(c: ConditionInput): string {
  const attr = c.attribute.trim();
  // `has` tests attribute presence: `principal has status` (no value).
  if (c.operator === "has") {
    return attr ? `${c.source} has ${attr}` : "";
  }

  const left = attr ? `${c.source}.${attr}` : c.source;
  const right = renderConditionValue(c);
  if (!right) return "";
  return `${left} ${c.operator} ${right}`;
}

/** Assemble Cedar policy source text from structured form input. */
export function buildPolicyText(input: BuildPolicyInput): string {
  const lines: string[] = [];
  if (input.id) lines.push(`@id("${input.id}")`);

  const actionScope = input.action
    ? `action == Action::"${input.action}"`
    : "action";

  lines.push(`${input.effect} (`);
  lines.push(`  ${renderScope("principal", input.principal)},`);
  lines.push(`  ${actionScope},`);
  lines.push(`  ${renderScope("resource", input.resource)}`);
  lines.push(`)`);

  // Group conditions by clause kind and join each group with `&&` into a single
  // `when` / `unless` block — both are valid Cedar and keep the output compact.
  const exprs = (input.conditions ?? [])
    .map((c) => ({ clause: c.clause, expr: buildConditionExpr(c) }))
    .filter((c) => c.expr);

  const whenExprs = exprs.filter((c) => c.clause === "when").map((c) => c.expr);
  const unlessExprs = exprs
    .filter((c) => c.clause === "unless")
    .map((c) => c.expr);

  const clauses: string[] = [];
  if (whenExprs.length) clauses.push(`when { ${whenExprs.join(" && ")} }`);
  if (unlessExprs.length)
    clauses.push(`unless { ${unlessExprs.join(" && ")} }`);

  const tail = clauses.length ? `\n${clauses.join("\n")};` : ";";

  return lines.join("\n") + tail;
}
