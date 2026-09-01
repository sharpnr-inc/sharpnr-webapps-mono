import { ACTION_OPS } from "../constants";
import {
  usePolicyBuilderStore,
  type ActionOp,
} from "../store/usePolicyBuilderStore";
import { ScopeField } from "./ScopeField";

export function Action() {
  const action = usePolicyBuilderStore((s) => s.action);
  const setAction = usePolicyBuilderStore((s) => s.setAction);
  return (
    <ScopeField
      title="action"
      op={action.op}
      ops={ACTION_OPS}
      entityType={action.entityType}
      entityId={action.entityId}
      onOpChange={(op) => setAction({ op: op as ActionOp })}
      onTypeChange={(entityType) => setAction({ entityType })}
      onIdChange={(entityId) => setAction({ entityId })}
    />
  );
}
