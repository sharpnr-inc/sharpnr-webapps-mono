import { useRef } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { LayerNode } from "./nodes/LayerNode";
import { CoreNode } from "./nodes/CoreNode";
import { MarketplaceNode } from "./nodes/MarketplaceNode";
import { InfraGroupNode } from "./nodes/InfraGroupNode";
import { ServiceNode } from "./nodes/ServiceNode";
import { useDiagramAnimations } from "./hooks/useDiagramAnimations";
import { initialNodes, initialEdges } from "./data";
import { COLORS } from "./constants";

const nodeTypes = {
  layer: LayerNode,
  core: CoreNode,
  marketplace: MarketplaceNode,
  infraGroup: InfraGroupNode,
  service: ServiceNode,
};

export function SharpnrFlowDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  useDiagramAnimations(wrapperRef);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={wrapperRef}
        className="w-full h-[85vh] min-h-[700px] bg-bg-diagram rounded-[24px] overflow-hidden border border-border-diagram shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="sharpnr-flow w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={true}
            zoomOnScroll={false}
            minZoom={0.35}
            maxZoom={1.4}
            proOptions={{ hideAttribution: true }}
            style={{ background: COLORS.bg }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1}
              color={COLORS.borderDash}
              className="opacity-[0.35]"
            />
          </ReactFlow>
        </div>

        <style>{`
          .sharpnr-flow .react-flow__renderer { background: ${COLORS.bg}; }
          .sharpnr-flow .react-flow__minimap { display: none; }
          .sharpnr-flow .react-flow__controls {
            background: ${COLORS.surface};
            border: 1px solid ${COLORS.border};
            border-radius: 8px;
            overflow: hidden;
          }
          .sharpnr-flow .react-flow__controls-button {
            background: ${COLORS.surface};
            border-bottom: 1px solid ${COLORS.border};
            fill: ${COLORS.textMuted};
          }
          .sharpnr-flow .react-flow__controls-button:hover {
            background: ${COLORS.surfaceAlt};
            fill: ${COLORS.text};
          }
          .sharpnr-flow .react-flow__edge-path {
            transition: filter 0.2s ease;
          }
          .sharpnr-flow .react-flow__node:focus { outline: none; }
          .sharpnr-flow .react-flow__handle { pointer-events: none; }
        `}</style>
      </div>
    </section>
  );
}

export default SharpnrFlowDiagram;
