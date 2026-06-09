import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import type { LabelNodeData } from "../types";

export function LayerNode({ data }: NodeProps<Node<LabelNodeData>>) {
  return (
    <div className="bg-surface border-[1.5px] border-border-diagram rounded-[10px] py-[14px] px-[28px] min-w-[260px] text-center shadow-[0_0_0_1px_rgba(122,48,40,0.25),0_8px_32px_rgba(0,0,0,0.5)]">
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="font-inter text-[15px] font-semibold text-accent-diagram tracking-[0.04em]">
        {data.label}
      </div>
      {data.sub && (
        <div className="mt-[6px] text-[11px] text-text-muted leading-[1.5] max-w-[260px]">
          {data.sub}
        </div>
      )}
    </div>
  );
}
