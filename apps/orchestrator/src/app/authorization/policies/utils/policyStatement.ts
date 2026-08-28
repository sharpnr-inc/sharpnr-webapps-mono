/**
 * Readers for a policy's Cedar source text (`PolicyView.policy`).
 *
 * The backend returns the statement verbatim, so the index UI derives the
 * effect and principal scope it displays by parsing the policy head.
 */

/** Coarse effect of a policy, read from the leading keyword of its statement. */
export function policyEffect(statement: string): "permit" | "forbid" {
  // Skip annotation lines (`@id(...)`) to find the first policy keyword.
  const firstKeyword = statement
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("permit") || line.startsWith("forbid"));
  return firstKeyword?.startsWith("forbid") ? "forbid" : "permit";
}

/** Who a policy targets, read from the `principal` clause of its statement. */
export interface PolicyPrincipal {
  kind: "everyone" | "role" | "group" | "user" | "other";
  /** Human-readable target, e.g. "Everyone" or "front-desk". */
  label: string;
}

/**
 * Coarse principal scope of a policy. A bare `principal` (no `in`/`==`) means
 * the rule is evaluated for every member of the organization.
 */
export function policyPrincipal(statement: string): PolicyPrincipal {
  // The `principal` clause is always the first argument of the policy head, so
  // `when { principal.status == ... }` conditions are never matched here.
  const clause = statement
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("principal"));

  const match = clause?.match(/^principal\s+(?:in|==)\s+(\w+)::"([^"]+)"/);
  if (!match) return { kind: "everyone", label: "Everyone" };

  const [, entity, name] = match;
  switch (entity.toLowerCase()) {
    case "role":
      return { kind: "role", label: name };
    case "group":
      return { kind: "group", label: name };
    case "user":
      return { kind: "user", label: name };
    default:
      return { kind: "other", label: `${entity}: ${name}` };
  }
}
