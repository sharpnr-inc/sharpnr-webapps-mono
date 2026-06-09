import { Handle, Position } from "@xyflow/react";

type ArchNodeProps = {
  data: {
    title: string;
    layer: "ops" | "org" | "platform";
    tag: string;
    dot: string;
    border: string;
    glow: string;
  };
  selected?: boolean;
};

export function ArchNode({ data, selected }: ArchNodeProps) {
  return (
    <div
      style={{
        background: selected ? data.glow : "rgba(10,12,22,0.88)",
        border: `1px solid ${selected ? data.dot : data.border}`,
        borderRadius: "8px",
        padding: "10px 14px",
        minWidth: "148px",
        maxWidth: "164px",
        fontFamily: "'JetBrains Mono', 'Fira Mono', ui-monospace, monospace",
        boxShadow: selected
          ? `0 0 0 2px ${data.glow}, 0 8px 28px rgba(0,0,0,0.55)`
          : "0 2px 16px rgba(0,0,0,0.4)",
        transition: "all 0.18s ease",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Status dot */}
      <span
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: data.dot,
          opacity: selected ? 1 : 0.55,
          display: "block",
        }}
      />

      {/* Tag */}
      <div
        style={{
          fontSize: "9px",
          letterSpacing: "0.12em",
          color: data.dot,
          textTransform: "uppercase",
          marginBottom: "5px",
          opacity: 0.7,
        }}
      >
        {data.tag}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: selected ? "#f1f5f9" : "#cbd5e1",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {data.title}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.dot, border: "none", width: 6, height: 6, opacity: 0.6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.dot, border: "none", width: 6, height: 6, opacity: 0.6 }}
      />
    </div>
  );
}
