/**
 * Static option sets that populate the create-policy dropdowns. In a real
 * deployment these would come from the Cedar schema served by the backend; for
 * now they're hard-coded sample entity types and actions.
 */

export const ENTITY_TYPES = [
  "User",
  "Employee",
  "Group",
  "Property",
  "PaymentAccount",
  "AuditLog",
  "Inventory",
] as const;

export const ACTIONS = [
  "viewEmployee",
  "editEmployee",
  "viewAuditLog",
  "createPaymentAccount",
  "configureGateway",
  "updateInventory",
  "manageProperty",
] as const;

export const GROUPS = ["Admins", "Finance", "Auditors", "Managers"] as const;

export type ConstraintOp = "All" | "is" | "in" | "==";

export const PRINCIPAL_OPS: { value: ConstraintOp; label: string }[] = [
  { value: "All", label: "Any principal" },
  { value: "is", label: "Is of type…" },
  { value: "in", label: "In group…" },
  { value: "==", label: "Equals entity…" },
];

export const RESOURCE_OPS: { value: ConstraintOp; label: string }[] = [
  { value: "All", label: "Any resource" },
  { value: "is", label: "Is of type…" },
  { value: "==", label: "Equals entity…" },
];

// ── Condition (`when` / `unless`) builder options ──────────────────────────

import type {
  ConditionSource,
  ConditionOp,
  ConditionValueType,
} from "../../cedarPolicybuilder/service";

export const CONDITION_CLAUSES: { value: "when" | "unless"; label: string }[] =
  [
    { value: "when", label: "When (must be true)" },
    { value: "unless", label: "Unless (must be false)" },
  ];

export const CONDITION_SOURCES: { value: ConditionSource; label: string }[] = [
  { value: "principal", label: "principal" },
  { value: "resource", label: "resource" },
  { value: "action", label: "action" },
  { value: "context", label: "context" },
];

export const CONDITION_OPS: { value: ConditionOp; label: string }[] = [
  { value: "==", label: "equals (==)" },
  { value: "!=", label: "not equals (!=)" },
  { value: "<", label: "less than (<)" },
  { value: "<=", label: "less or equal (<=)" },
  { value: ">", label: "greater than (>)" },
  { value: ">=", label: "greater or equal (>=)" },
  { value: "in", label: "in" },
  { value: "like", label: "like (pattern)" },
  { value: "has", label: "has (attribute exists)" },
];

export const CONDITION_VALUE_TYPES: {
  value: ConditionValueType;
  label: string;
}[] = [
  { value: "string", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "entity", label: "Entity ref" },
  { value: "expr", label: "Expression" },
];
