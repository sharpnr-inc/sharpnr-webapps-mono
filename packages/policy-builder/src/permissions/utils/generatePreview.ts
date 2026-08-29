import type {
  ConditionPalette,
  PermissionCatalog,
  PermissionRules,
} from "../types";
import { renderWhenClause } from "./conditions";

/**
 * Renders the Cedar the SERVER would generate from a draft.
 *
 * ⚠ Illustrative only. This text is never sent anywhere and is not what gets
 * stored — that is the entire point of the design. It exists so a developer
 * reviewing the screen can see the mapping; ship it hidden, or behind a
 * developer flag, and never show it to the people this UI is for. Keep it in
 * sync with the server-side generator if you change either.
 *
 * # Why a resource can produce two kinds of statement
 *
 * Cedar grants are a union, so a permit can only widen. An unscoped
 * `permit(principal, action in [...], resource)` covers every instance, and no
 * later statement can take that back. Restricting to specific instances
 * therefore REPLACES the unscoped statement rather than narrowing it.
 *
 * But actions that do not target an instance cannot be replaced that way —
 * "Add a new property" has no property to name. So when a resource is scoped,
 * its type-level actions still emit one unscoped statement, and only its
 * instance actions are pinned to the picked ids.
 *
 * One statement per instance is deliberate: `compilePolicySet` already splits a
 * multi-statement row and suffixes each with `@i`, so this costs nothing.
 * Cedar may also accept `resource in [Property::"a", Property::"b"]` to collapse
 * them — verify that against cedar-go before relying on it.
 *
 * # Restrictions
 *
 * Every restriction on a resource lands in one `when { ... }` on each of that
 * resource's statements. There is no `unless`: `unless X` is `when !X`, and
 * negation is an operator in the UI, so a generator never needs the keyword.
 */
export function generatePolicyText(
  catalog: PermissionCatalog,
  granted: Set<string>,
  rules: PermissionRules,
  palette: ConditionPalette = { keys: [] },
): string {
  const blocks: string[] = [];

  for (const resource of catalog) {
    const on = resource.actions.filter((a) => granted.has(a.name));
    if (on.length === 0) continue;

    const rule = rules[resource.type];
    const picked = rule?.instances;
    const when = renderWhenClause(rule?.conditions, palette);
    const scoped = picked !== undefined;

    // Unscoped grant: every ticked action on this resource, all instances.
    if (!scoped) {
      blocks.push(
        comment(resource.label, when ? "every instance, restricted" : "every instance"),
        permit(on.map((a) => a.name), null, resource.type, when),
      );
      continue;
    }

    const typeLevel = on.filter((a) => !a.requiresInstance);
    const perInstance = on.filter((a) => a.requiresInstance);

    if (typeLevel.length > 0) {
      blocks.push(
        comment(resource.label, "not tied to an instance"),
        permit(typeLevel.map((a) => a.name), null, resource.type, when),
      );
    }

    if (perInstance.length === 0) continue;

    if (picked.length === 0) {
      blocks.push(
        `// ${resource.label} — restricted, but no instances picked yet, so these`,
        `// grant nothing: ${perInstance.map((a) => a.label).join(", ")}`,
        "",
      );
      continue;
    }

    blocks.push(comment(resource.label, `${picked.length} selected`));
    for (const id of picked) {
      blocks.push(permit(perInstance.map((a) => a.name), id, resource.type, when));
    }
  }

  if (blocks.length === 0) {
    return "// No permissions granted — this role can do nothing.";
  }
  return blocks.join("\n").trimEnd();
}

function comment(label: string, note: string): string {
  return `// ${label} — ${note}`;
}

function permit(
  actionIds: string[],
  instanceId: string | null,
  resourceType: string,
  when = "",
): string {
  const ids = actionIds
    .slice()
    .sort()
    .map((a) => `    Action::"${a}"`)
    .join(",\n");
  const resourceClause =
    instanceId === null
      ? "  resource"
      : `  resource == ${resourceType}::"${instanceId}"`;
  return `permit (\n  principal,\n  action in [\n${ids}\n  ],\n${resourceClause}\n)${when};\n`;
}
