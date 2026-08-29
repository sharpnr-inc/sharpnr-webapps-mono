export { default as PolicyBuilder } from "./PolicyBuilder";
export type {
  PolicyBuilderContextValue,
  PolicyBuilderProps,
} from "./PolicyBuilder";

export { usePolicyBuilderContext } from "./context";
export { useCedarReady } from "./hooks/useCedarReady";

export { usePolicyBuilderStore } from "./store/usePolicyBuilderStore";
export type {
  ActionOp,
  Condition,
  ConditionKind,
  Effect,
  PolicyBuilderState,
  PrincipalOp,
  ResourceOp,
  ScopeConstraint,
} from "./store/usePolicyBuilderStore";

export { buildPolicyText } from "./utils/buildPolicyText";
export { verifyPolicy } from "./utils/verifyPolicy";
export type { PolicyVerification } from "./utils/verifyPolicy";

export { convertPolicyToJson } from "./utils/convertPolicytoJson";
export type { PolicyJsonResult } from "./utils/convertPolicytoJson";

/* -------------------------------------------------------------------------- */
/*                            Permission matrix                               */
/* -------------------------------------------------------------------------- */

/**
 * The checkbox-first alternative to the Cedar-shaped builder above. Same
 * package, different audience: PolicyBuilder is for someone who knows what a
 * principal is, PermissionMatrix is for the person who administers the org.
 * See ./permissions/types.ts for why the browser stops generating Cedar.
 */
export * from "./permissions";
