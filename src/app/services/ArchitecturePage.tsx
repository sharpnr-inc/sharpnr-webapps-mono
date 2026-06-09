import { useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ArchNode } from "./ArchNode";
import { DetailPanel } from "./DetailPanel";
import { GROUP_LABELS } from "./arch-data";
import { initialNodes, initialEdges } from "./arch-data";

const nodeTypes = { arch: ArchNode };

export default function ArchitecturePage() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState<Node>(initialNodes[0] as Node);

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ background: "#020617" }}
    >
      {/* Detail panel — left */}
      <DetailPanel node={selected} />

      {/* Flow — right */}
      <div className="relative flex-1" style={{ minWidth: 0 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          onNodeClick={(_, node) => setSelected(node)}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          preventScrolling={false} // <-- Important
          minZoom={0.9}
          maxZoom={0.9}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={28} size={1} color="rgba(255,255,255,0.04)" />

          {/* Layer labels rendered as SVG overlay via foreignObject isn't ideal — use absolute positioned divs instead */}
          <div className="absolute inset-0 pointer-events-none">
            {Object.values(GROUP_LABELS).map((g) => (
              <div
                key={g.id}
                className="absolute text-xs font-mono tracking-widest uppercase"
                style={{
                  left: `${g.labelLeft}%`,
                  top: `${g.labelTop}%`,
                  color: g.color,
                  opacity: 0.55,
                  letterSpacing: "0.14em",
                  fontSize: "10px",
                }}
              >
                {g.label}
              </div>
            ))}
          </div>
        </ReactFlow>
      </div>
    </div>
  );
}
