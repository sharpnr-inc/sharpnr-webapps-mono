import { create } from "zustand";
import type {
  Condition,
  PermissionRules,
  ResourceDescriptor,
} from "../types";

/**
 * The whole draft is a set of granted action ids plus a per-resource scope map.
 *
 * Compare with a Cedar-shaped store, which holds an effect, three scope
 * constraints (operator + entity type + entity id each) and a list of free-text
 * Cedar expressions. That state is rich because Cedar is rich — and every field
 * in it is a decision the user has to understand. Here there are two kinds of
 * decision: is this box ticked, and does it cover everything or only these.
 */
export interface PermissionMatrixState {
  /** Action ids currently ticked. */
  granted: Set<string>;
  /**
   * Resource type -> how its grant is narrowed (instances and/or restrictions).
   * A type absent from this map is granted broadly. See PermissionRules.
   */
  rules: PermissionRules;

  /**
   * What was loaded from the server, kept as a draft rather than a serialized
   * string: Reset restores it directly, and `isDirty` serializes both sides on
   * demand. One source of truth, and no parsing a format back apart.
   */
  baseline: { actions: string[]; rules: PermissionRules };

  load: (actions: string[], rules?: PermissionRules) => void;
  toggle: (action: string) => void;
  setMany: (actions: string[], granted: boolean) => void;
  /** Switch a resource between "all instances" and "only selected". */
  setScopeMode: (resourceType: string, mode: ScopeMode) => void;
  toggleInstance: (resourceType: string, instanceId: string) => void;
  setInstances: (resourceType: string, instanceIds: string[]) => void;
  addCondition: (resourceType: string, condition: Condition) => void;
  updateCondition: (
    resourceType: string,
    conditionId: string,
    patch: Partial<Omit<Condition, "id">>,
  ) => void;
  removeCondition: (resourceType: string, conditionId: string) => void;
  reset: () => void;
}

export type ScopeMode = "all" | "selected";

/**
 * Canonical serialization of a draft, used for dirty-checking.
 *
 * Sorting everything is what stops a re-render or a differently-ordered server
 * response from reading as an unsaved change.
 */
export function serializeDraft(
  granted: Set<string>,
  rules: PermissionRules,
): string {
  const acts = [...granted].sort().join(",");
  const rulePart = Object.keys(rules)
    .sort()
    .map((type) => {
      const rule = rules[type]!;
      const inst =
        rule.instances === undefined ? "*" : [...rule.instances].sort().join("+");
      const conds = (rule.conditions ?? [])
        .map((c) => c.key + c.operator + [...c.values].sort().join("|"))
        .sort()
        .join("&");
      return `${type}:${inst}:${conds}`;
    })
    .join(";");
  return acts + "||" + rulePart;
}

/** Whether the draft differs from what was loaded. */
export function isDirty(
  granted: Set<string>,
  rules: PermissionRules,
  baseline: { actions: string[]; rules: PermissionRules },
): boolean {
  return (
    serializeDraft(granted, rules) !==
    serializeDraft(new Set(baseline.actions), baseline.rules)
  );
}

function cloneRules(rules: PermissionRules): PermissionRules {
  const out: PermissionRules = {};
  for (const [type, rule] of Object.entries(rules)) {
    out[type] = {
      instances: rule.instances ? [...rule.instances] : undefined,
      conditions: rule.conditions?.map((c) => ({ ...c, values: [...c.values] })),
    };
  }
  return out;
}

/** Reads a resource's rule, creating an empty one so callers can patch it. */
function ruleFor(rules: PermissionRules, type: string) {
  const next = cloneRules(rules);
  if (!next[type]) next[type] = {};
  return next;
}

/**
 * Drops a rule that no longer narrows anything.
 *
 * `{}` and "absent" mean the same thing to the engine, but only "absent" says
 * so in the payload — so clearing the last restriction should leave no trace
 * rather than an empty object that reads as a configured-but-empty rule.
 */
function prune(rules: PermissionRules, type: string): PermissionRules {
  const rule = rules[type];
  if (!rule) return rules;
  if (rule.instances === undefined && (rule.conditions?.length ?? 0) === 0) {
    const next = { ...rules };
    delete next[type];
    return next;
  }
  if (rule.conditions && rule.conditions.length === 0) {
    rules[type] = { instances: rule.instances };
  }
  return rules;
}

export const usePermissionMatrixStore = create<PermissionMatrixState>(
  (set) => ({
    granted: new Set<string>(),
    rules: {},
    baseline: { actions: [], rules: {} },

    load: (actions, rules = {}) =>
      set({
        granted: new Set(actions),
        rules: cloneRules(rules),
        baseline: { actions: [...actions], rules: cloneRules(rules) },
      }),

    toggle: (action) =>
      set((state) => {
        const next = new Set(state.granted);
        if (next.has(action)) next.delete(action);
        else next.add(action);
        return { granted: next };
      }),

    setMany: (actions, granted) =>
      set((state) => {
        const next = new Set(state.granted);
        for (const a of actions) {
          if (granted) next.add(a);
          else next.delete(a);
        }
        return { granted: next };
      }),

    setScopeMode: (resourceType, mode) =>
      set((state) => {
        const next = ruleFor(state.rules, resourceType);
        // Absent instances means "every instance", so switching to All is a
        // delete rather than a sentinel value.
        if (mode === "all") next[resourceType]!.instances = undefined;
        else if (!next[resourceType]!.instances) next[resourceType]!.instances = [];
        return { rules: prune(next, resourceType) };
      }),

    toggleInstance: (resourceType, instanceId) =>
      set((state) => {
        const next = ruleFor(state.rules, resourceType);
        const picked = next[resourceType]!.instances ?? [];
        next[resourceType]!.instances = picked.includes(instanceId)
          ? picked.filter((id) => id !== instanceId)
          : [...picked, instanceId];
        return { rules: next };
      }),

    setInstances: (resourceType, instanceIds) =>
      set((state) => {
        const next = ruleFor(state.rules, resourceType);
        next[resourceType]!.instances = [...instanceIds];
        return { rules: next };
      }),

    addCondition: (resourceType, condition) =>
      set((state) => {
        const next = ruleFor(state.rules, resourceType);
        next[resourceType]!.conditions = [
          ...(next[resourceType]!.conditions ?? []),
          condition,
        ];
        return { rules: next };
      }),

    updateCondition: (resourceType, conditionId, patch) =>
      set((state) => {
        const next = ruleFor(state.rules, resourceType);
        next[resourceType]!.conditions = (
          next[resourceType]!.conditions ?? []
        ).map((c) => (c.id === conditionId ? { ...c, ...patch } : c));
        return { rules: next };
      }),

    removeCondition: (resourceType, conditionId) =>
      set((state) => {
        const next = ruleFor(state.rules, resourceType);
        next[resourceType]!.conditions = (
          next[resourceType]!.conditions ?? []
        ).filter((c) => c.id !== conditionId);
        return { rules: prune(next, resourceType) };
      }),

    reset: () =>
      set((state) => ({
        granted: new Set(state.baseline.actions),
        rules: cloneRules(state.baseline.rules),
      })),
  }),
);

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                    */
/* -------------------------------------------------------------------------- */

/** "all" | "some" | "none" — drives a resource's select-all box and badge. */
export type SectionState = "all" | "some" | "none";

export function sectionState(
  resource: ResourceDescriptor,
  granted: Set<string>,
): SectionState {
  const total = resource.actions.length;
  if (total === 0) return "none";
  let count = 0;
  for (const a of resource.actions) if (granted.has(a.name)) count++;
  if (count === 0) return "none";
  return count === total ? "all" : "some";
}

/**
 * Whether a resource can be narrowed to specific instances at all.
 *
 * Both halves are required: somewhere to point (registered instances) and
 * something that can be pointed (an action that targets one instance). A
 * resource whose actions are all type-level — create, list — has nothing to
 * scope, so the control is hidden rather than shown and disabled.
 */
export function isScopable(resource: ResourceDescriptor): boolean {
  return (
    (resource.instances?.length ?? 0) > 0 &&
    resource.actions.some((a) => a.requiresInstance)
  );
}

/**
 * Groups the catalog for display. `category` is not sent by the backend yet, so
 * everything currently lands in one group — which is exactly why adding that
 * field to the aggregator is worth doing: a flat list of every resource type in
 * the product is not something a non-technical admin can scan.
 */
export function groupCatalog(
  catalog: ResourceDescriptor[],
): { category: string; resources: ResourceDescriptor[] }[] {
  const groups = new Map<string, ResourceDescriptor[]>();
  for (const r of catalog) {
    const key = r.category?.trim() || "All permissions";
    const bucket = groups.get(key);
    if (bucket) bucket.push(r);
    else groups.set(key, [r]);
  }
  return [...groups].map(([category, resources]) => ({ category, resources }));
}
