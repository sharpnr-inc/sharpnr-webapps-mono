import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import type { ServiceNodeData } from "../types";

export function ServiceNode({ data }: NodeProps<Node<ServiceNodeData>>) {
  return (
    <div className="bg-surface-alt border-[1.5px] border-dashed border-border-dash rounded-[12px] p-[12px_14px] min-w-[168px] max-w-[200px] shadow-[0_2px_16px_rgba(0,0,0,0.31)]">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="font-inter text-[12px] font-bold text-text tracking-[0.03em] mb-[6px] text-center">
        {data.label}
      </div>
      <div className="text-[9.5px] text-text-muted leading-[1.65] text-center">
        {data.items.join(" • ")}
      </div>
    </div>
  );
}
