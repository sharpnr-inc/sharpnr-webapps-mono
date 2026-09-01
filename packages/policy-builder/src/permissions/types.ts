/**
 * The permission-matrix wire contract.
 *
 * This is the deliberate opposite of a Cedar-shaped form. A Cedar form asks the
 * user to compose a policy (effect, principal, operator, entity type, entity id,
 * a free-text `when` expression) and ships generated Cedar text to the server.
 * That works for a developer and does not work for the people who actually
 * administer an organization.
 *
 * Here the browser never sees Cedar. It sends which actions a role is granted
 * and, per resource, whether that grant covers everything or only named
 * instances. The SERVER turns that into policy text. Two consequences worth
 * stating, because they are the whole point:
 *
 *   1. Editing is trivial. Re-rendering the screen reads back a string[] and a
 *      map, not Cedar parsed to work out which boxes were ticked.
 *   2. The stored structure and the stored Cedar cannot disagree, because one
 *      is generated from the other. Today `policy` and `policyJson` are written
 *      independently and nothing keeps them in sync — a screen that lies about
 *      what the engine enforces is the worst bug an authz UI can have.
 */

/* -------------------------------------------------------------------------- */
/*                          What the server sends us                          */
/* -------------------------------------------------------------------------- */

/** One action that can be granted on a resource — a checkbox. */
export interface ActionDescriptor {
  /** Cedar action id, e.g. "canViewProperty". Never shown to the user. */
  name: string;
  /** What the user reads, e.g. "View property". */
  label: string;
  description?: string;
  /**
   * True when the action targets one instance (edit THIS property) rather than
   * the type (create A property).
   *
   * This drives the scope control. An action with requiresInstance: false can
   * never be narrowed — "Add a new property" has no property to scope it to —
   * so it always generates an unscoped statement even when the resource is
   * restricted to selected instances.
   */
  requiresInstance?: boolean;
}

/** One live, selectable instance — a row in the instance picker. */
export interface ResourceInstance {
  id: string;
  label: string;
}

/** One protectable resource — a section of checkboxes. */
export interface ResourceDescriptor {
  /** Cedar entity type, e.g. "Property". Never shown to the user. */
  type: string;
  label: string;
  description?: string;
  /**
   * Grouping for the UI ("Operations", "Administration"). The backend does not
   * send this yet; `groupCatalog` falls back to a single group. Adding one
   * `Category` field to ResourceDescriptor in the aggregator is what turns a
   * flat list into something an office manager can scan.
   */
  category?: string;
  actions: ActionDescriptor[];
  /**
   * The org's live instances, from the aggregator's InstanceLister. Undefined
   * means the type has no selectable instances at all, which is different from
   * an empty array ("instances exist, this org has none") — in both cases the
   * scope control is hidden, because there is nothing to pick.
   */
  instances?: ResourceInstance[];
}

export type PermissionCatalog = ResourceDescriptor[];

/* -------------------------------------------------------------------------- */
/*                          What we send the server                           */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Restrictions                                */
/* -------------------------------------------------------------------------- */

/**
 * How a restriction compares a key to its value(s).
 *
 * There is no `unless` here, and that is deliberate: `unless X` is exactly
 * `when !X`. The second keyword exists so hand-written Cedar reads well, and a
 * generator does not need it. Negation is an OPERATOR ("is not", "is none of"),
 * so the person using the screen never has to choose between two keywords that
 * mean the same thing — and every restriction they build emits a single
 * `when { ... }`.
 */
export type ConditionOperator = "is" | "isNot" | "isOneOf" | "isNoneOf";

/** One restriction row: key, operator, value(s). */
export interface Condition {
  /** Client-side row identity. Not sent to the server. */
  id: string;
  /** The palette key's Cedar path, e.g. "context.isBusinessHours". */
  key: string;
  operator: ConditionOperator;
  /** One value for is/isNot; one or more for isOneOf/isNoneOf. */
  values: string[];
}

/** One value a closed-set key accepts. */
export interface ConditionValue {
  value: string;
  label: string;
}

/**
 * One attribute a restriction can be authored against.
 *
 * This is the unified descriptor the aggregator does not send yet: today
 * resource attributes arrive as {name, type, description} with no operators,
 * no labels and no value lists, while context keys arrive in a different shape
 * that DOES carry values. The UI needs one shape with all of it, or every
 * dropdown has to be built twice.
 */
export interface ConditionKeyDescriptor {
  /** Cedar path as it appears in policy text, e.g. "context.network". */
  cedar: string;
  label: string;
  description?: string;
  type: "bool" | "string" | "long" | "datetime";
  /** Which operators the builder offers for this key. */
  operators: ConditionOperator[];
  /** Closed set of values. Empty/absent means free-form (avoid — see demo.ts). */
  values?: ConditionValue[];
  /** Grouping in the key dropdown, e.g. "The request" / "The person". */
  group?: string;
  /**
   * Set when the engine does not actually stamp this key yet. The builder
   * shows it disabled with this text rather than silently offering a condition
   * that can never match — Cedar errors on a missing attribute and skips the
   * whole policy, which is invisible at runtime.
   */
  unavailableReason?: string;
}

/** Everything a restriction row's first dropdown can offer. */
export interface ConditionPalette {
  keys: ConditionKeyDescriptor[];
}

/* -------------------------------------------------------------------------- */
/*                              Per-resource rules                            */
/* -------------------------------------------------------------------------- */

/**
 * How one resource's granted actions are narrowed.
 *
 * Both fields narrow the same grant, which is why they live together rather
 * than in two parallel maps:
 *
 *   instances  — absent means every instance, now and in future. Present means
 *                exactly these ids, and an empty array grants nothing.
 *   conditions — ANDed into one `when { ... }`. Absent means unconditional.
 *
 * Absent-means-everything is the important half. Cedar grants are a union, so
 * permits only widen: you cannot start from an unscoped `permit` and narrow it
 * with a second statement. Narrowing has to REPLACE the broad grant, which is
 * why this is one rule per resource rather than something layered on top of the
 * action checkboxes.
 */
export interface ResourceRule {
  instances?: string[];
  conditions?: Condition[];
}

/** Resource type -> how its grant is narrowed. Absent = unnarrowed. */
export type PermissionRules = Record<string, ResourceRule>;

export interface RolePermissionsPayload {
  actions: string[];
  rules: PermissionRules;
}

/** Read shape for rendering the boxes. Same fields, deliberately. */
export type RolePermissionsView = RolePermissionsPayload;
