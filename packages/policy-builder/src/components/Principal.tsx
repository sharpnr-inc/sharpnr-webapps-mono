import { PRINCIPAL_OPS } from "../constants";
import {
  usePolicyBuilderStore,
  type PrincipalOp,
} from "../store/usePolicyBuilderStore";
import { ScopeField } from "./ScopeField";

export function Principal() {
  const principal = usePolicyBuilderStore((s) => s.principal);
  const setPrincipal = usePolicyBuilderStore((s) => s.setPrincipal);
  return (
    <ScopeField
      title="principal"
      op={principal.op}
      ops={PRINCIPAL_OPS}
      entityType={principal.entityType}
      entityId={principal.entityId}
      onOpChange={(op) => setPrincipal({ op: op as PrincipalOp })}
      onTypeChange={(entityType) => setPrincipal({ entityType })}
      onIdChange={(entityId) => setPrincipal({ entityId })}
    />
  );
}
