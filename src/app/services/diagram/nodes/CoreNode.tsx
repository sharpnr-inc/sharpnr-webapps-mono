import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import type { CoreNodeData } from "../types";

export function CoreNode({ data }: NodeProps<Node<CoreNodeData>>) {
  return (
    <div className="bg-surface border-[1.5px] border-accent-diagram/50 rounded-[10px] py-[12px] px-[32px] min-w-[200px] text-center shadow-[0_0_24px_rgba(232,96,76,0.13),0_0_0_1px_rgba(232,96,76,0.2)] relative">
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Left} id="left" className="opacity-0" />
      <Handle type="target" position={Position.Left} id="left-t" className="opacity-0" />
      <div className="font-inter text-[16px] font-bold text-text tracking-[0.02em]">
        {data.label}
      </div>
      <div className="text-[10px] text-text-muted mt-[2px]">
        {data.sub}
      </div>
    </div>
  );
}
