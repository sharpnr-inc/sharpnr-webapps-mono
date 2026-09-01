import { create } from "zustand";

/* -------------------------------------------------------------------------- */
/*                                   Types                                     */
/* -------------------------------------------------------------------------- */

export type Effect = "permit" | "forbid";

/** Operators Cedar allows in the policy scope, per variable. */
export type PrincipalOp = "All" | "==" | "in" | "is";
export type ActionOp = "All" | "==" | "in";
export type ResourceOp = "All" | "==" | "in" | "is";

export type ConditionKind = "when" | "unless";

/**
 * A single scope constraint, e.g. `principal == User::"alice"`.
 * `entityType` is the namespace/type ("User", "Action", "Photo") and
 * `entityId` is the literal id ("alice"). Both are ignored when op is "All".
 */
export interface ScopeConstraint<Op extends string = string> {
  op: Op;
  entityType: string;
  entityId: string;
}

/** A `when { ... }` / `unless { ... }` block with a free-form expression. */
export interface Condition {
  id: string;
  kind: ConditionKind;
  expression: string;
}

export interface PolicyBuilderState {
  /** Human-friendly policy name; also used to derive the Cedar `@id` annotation. */
  name: string;
  description: string;
  effect: Effect;
  principal: ScopeConstraint<PrincipalOp>;
  action: ScopeConstraint<ActionOp>;
  resource: ScopeConstraint<ResourceOp>;
  conditions: Condition[];

  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setEffect: (effect: Effect) => void;
  setPrincipal: (patch: Partial<ScopeConstraint<PrincipalOp>>) => void;
  setAction: (patch: Partial<ScopeConstraint<ActionOp>>) => void;
  setResource: (patch: Partial<ScopeConstraint<ResourceOp>>) => void;
  addCondition: (kind?: ConditionKind) => void;
  updateCondition: (id: string, patch: Partial<Omit<Condition, "id">>) => void;
  removeCondition: (id: string) => void;
  reset: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                 Initial draft                              */
/* -------------------------------------------------------------------------- */

const INITIAL = {
  name: "",
  description: "",
  effect: "permit" as Effect,
  principal: { op: "All", entityType: "User", entityId: "" } as ScopeConstraint<PrincipalOp>,
  action: { op: "All", entityType: "Action", entityId: "" } as ScopeConstraint<ActionOp>,
  resource: { op: "All", entityType: "Resource", entityId: "" } as ScopeConstraint<ResourceOp>,
  conditions: [] as Condition[],
};

const newConditionId = () =>
  `cond_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

/* -------------------------------------------------------------------------- */
/*                                   Store                                     */
/* -------------------------------------------------------------------------- */

export const usePolicyBuilderStore = create<PolicyBuilderState>((set) => ({
  ...INITIAL,

  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setEffect: (effect) => set({ effect }),

  setPrincipal: (patch) =>
    set((state) => ({ principal: { ...state.principal, ...patch } })),
  setAction: (patch) =>
    set((state) => ({ action: { ...state.action, ...patch } })),
  setResource: (patch) =>
    set((state) => ({ resource: { ...state.resource, ...patch } })),

  addCondition: (kind = "when") =>
    set((state) => ({
      conditions: [
        ...state.conditions,
        { id: newConditionId(), kind, expression: "" },
      ],
    })),

  updateCondition: (id, patch) =>
    set((state) => ({
      conditions: state.conditions.map((c) =>
        c.id === id ? { ...c, ...patch } : c,
      ),
    })),

  removeCondition: (id) =>
    set((state) => ({
      conditions: state.conditions.filter((c) => c.id !== id),
    })),

  reset: () =>
    set({
      ...INITIAL,
      // Clone the scope objects so resets don't share references with the
      // module-level INITIAL constant.
      principal: { ...INITIAL.principal },
      action: { ...INITIAL.action },
      resource: { ...INITIAL.resource },
      conditions: [],
    }),
}));
