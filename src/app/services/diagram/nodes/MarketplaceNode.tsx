import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import type { LabelNodeData } from "../types";

export function MarketplaceNode({ data }: NodeProps<Node<LabelNodeData>>) {
  return (
    <div className="bg-surface-alt border-[1.5px] border-dashed border-border-dash rounded-[12px] py-[14px] px-[20px] min-w-[220px] text-center shadow-[0_4px_24px_rgba(0,0,0,0.37)]">
      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />
      <Handle type="target" position={Position.Right} id="right-t" className="opacity-0" />
      <div className="font-inter text-[13px] font-semibold text-text tracking-[0.03em]">
        {data.label}
      </div>
      {data.sub && (
        <div className="mt-[6px] text-[10px] text-text-muted leading-[1.6]">
          {data.sub}
        </div>
      )}
    </div>
  );
}
