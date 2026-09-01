import type {
  ActionOp,
  PrincipalOp,
  ResourceOp,
} from "./store/usePolicyBuilderStore";

/* -------------------------------------------------------------------------- */
/*                              Operator presets                              */
/* -------------------------------------------------------------------------- */

export const PRINCIPAL_OPS: { value: PrincipalOp; label: string }[] = [
  { value: "All", label: "Any principal" },
  { value: "==", label: "is exactly (==)" },
  { value: "in", label: "is in group (in)" },
  { value: "is", label: "is of type (is)" },
];

export const ACTION_OPS: { value: ActionOp; label: string }[] = [
  { value: "All", label: "Any action" },
  { value: "==", label: "is exactly (==)" },
  { value: "in", label: "is in group (in)" },
];

export const RESOURCE_OPS: { value: ResourceOp; label: string }[] = [
  { value: "All", label: "Any resource" },
  { value: "==", label: "is exactly (==)" },
  { value: "in", label: "is in group (in)" },
  { value: "is", label: "is of type (is)" },
];
