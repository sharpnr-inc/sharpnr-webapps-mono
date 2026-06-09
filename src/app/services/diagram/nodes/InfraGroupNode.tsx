import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import type { LabelNodeData } from "../types";

export function InfraGroupNode({ data }: NodeProps<Node<LabelNodeData>>) {
  return (
    <div className="bg-infra border-[1.5px] border-dashed border-accent-diagram/33 rounded-[16px] w-full h-full p-[20px_28px] shadow-[inset_0_0_60px_rgba(0,0,0,0.25)] pointer-events-none">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="font-inter text-[22px] font-bold text-text-muted tracking-[0.01em] select-none">
        {data.label}
      </div>
    </div>
  );
}
