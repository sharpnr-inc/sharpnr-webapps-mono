export { default as PermissionMatrix } from "./PermissionMatrix";
export type {
  PermissionMatrixContextValue,
  PermissionMatrixProps,
} from "./PermissionMatrix";

export { usePermissionMatrixContext } from "./context";

export {
  usePermissionMatrixStore,
  groupCatalog,
  isDirty,
  isScopable,
  sectionState,
  serializeDraft,
} from "./store/usePermissionMatrixStore";
export type {
  PermissionMatrixState,
  ScopeMode,
  SectionState,
} from "./store/usePermissionMatrixStore";

export {
  usePermissionCatalog,
  useRolePermissions,
  useSaveRolePermissions,
} from "./api/queries";
export {
  fetchPermissionCatalog,
  getRolePermissions,
  saveRolePermissions,
} from "./api/service";

export { generatePolicyText } from "./utils/generatePreview";
export {
  OPERATOR_LABELS,
  describeCondition,
  findKey,
  isMultiValue,
  newCondition,
  renderCondition,
  renderWhenClause,
} from "./utils/conditions";

export type {
  ActionDescriptor,
  Condition,
  ConditionKeyDescriptor,
  ConditionOperator,
  ConditionPalette,
  ConditionValue,
  PermissionCatalog,
  PermissionRules,
  ResourceDescriptor,
  ResourceInstance,
  ResourceRule,
  RolePermissionsPayload,
  RolePermissionsView,
} from "./types";

export { DEMO_CATALOG, DEMO_PALETTE, DEMO_ROLES } from "./demo";
