// import { useOrgResources } from "../api/queries";
import { RESOURCE_OPS } from "../constants";
import {
  usePolicyBuilderStore,
  type ResourceOp,
} from "../store/usePolicyBuilderStore";
import { ScopeField } from "./ScopeField";

export function Resource() {
  // Nothing here reads the resources yet — restore when this is wired up.
  // const { data } = useOrgResources();

  const resource = usePolicyBuilderStore((s) => s.resource);
  const setResource = usePolicyBuilderStore((s) => s.setResource);
  return (
    <ScopeField
      title="resource"
      op={resource.op}
      ops={RESOURCE_OPS}
      entityType={resource.entityType}
      entityId={resource.entityId}
      onOpChange={(op) => setResource({ op: op as ResourceOp })}
      onTypeChange={(entityType) => setResource({ entityType })}
      onIdChange={(entityId) => setResource({ entityId })}
    />
  );
}
