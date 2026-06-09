import { useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CardNode from "./CardNode";

const nodeTypes = {
  card: CardNode,
};

const initialNodes = [
  {
    id: "1",
    type: "card",
    position: { x: 100, y: 120 },
    data: {
      title: "User Service",
      description: "Handles authentication, authorization and user profiles.",
    },
  },
  {
    id: "2",
    type: "card",
    position: { x: 420, y: 120 },
    data: {
      title: "Invoice Service",
      description: "Creates invoices and manages billing operations.",
    },
  },
  {
    id: "3",
    type: "card",
    position: { x: 740, y: 120 },
    data: {
      title: "Payment Service",
      description: "Processes online payments and settlements.",
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: {
      stroke: "#6366F1",
      strokeWidth: 2,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: {
      stroke: "#6366F1",
      strokeWidth: 2,
    },
  },
];

export default function ServicePage() {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState<Node>(
    initialNodes[0] as Node,
  );

  return (
    <div className="flex h-screen bg-[#020617]">
      {/* Left Information Panel */}
      <div className="flex w-[35%] items-center justify-center p-10">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="mb-2 text-sm uppercase tracking-widest text-indigo-400">
            Service
          </p>

          <h1 className="text-4xl font-bold text-white">
            {(selectedNode.data as any).title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            {(selectedNode.data as any).description}
          </p>

          <div className="mt-8 h-px bg-white/10" />

          <p className="mt-8 text-sm text-zinc-500">
            Click another node to explore the platform architecture.
          </p>
        </div>
      </div>

      {/* Flow */}
      <div className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          onNodeClick={(_, node) => setSelectedNode(node)}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          minZoom={1}
          maxZoom={1}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={32} size={1} color="rgba(255,255,255,.08)" />
        </ReactFlow>
      </div>
    </div>
  );
}
