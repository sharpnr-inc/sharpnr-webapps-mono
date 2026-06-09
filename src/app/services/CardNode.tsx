import { Handle, Position } from "@xyflow/react";

const statusColors: Record<string, { dot: string; text: string; bg: string }> =
  {
    healthy: { dot: "#22d3a0", text: "#22d3a0", bg: "rgba(34,211,160,0.08)" },
    degraded: { dot: "#f59e0b", text: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
    down: { dot: "#f43f5e", text: "#f43f5e", bg: "rgba(244,63,94,0.08)" },
  };

type CardNodeProps = {
  data: {
    title: string;
    description: string;
    status?: "healthy" | "degraded" | "down";
    lang?: string;
    port?: string;
    selected?: boolean;
  };
  selected?: boolean;
};

export default function CardNode({ data, selected }: CardNodeProps) {
  const status = data.status ?? "healthy";
  const sc = statusColors[status];

  return (
    <div
      style={{
        background: selected ? "rgba(0,212,255,0.06)" : "rgba(16,18,28,0.92)",
        border: selected
          ? "1px solid rgba(0,212,255,0.6)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "14px 16px",
        minWidth: "170px",
        fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
        boxShadow: selected
          ? "0 0 0 3px rgba(0,212,255,0.15), 0 8px 32px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.4)",
        transition: "all 0.2s ease",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Status dot */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: sc.dot,
          boxShadow: `0 0 0 3px ${sc.bg}`,
        }}
      />

      {/* Service label */}
      <div
        style={{
          fontSize: "9px",
          letterSpacing: "0.12em",
          color: "rgba(0,212,255,0.6)",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        {data.lang ?? "service"}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#e2e8f0",
          marginBottom: "6px",
          letterSpacing: "-0.01em",
        }}
      >
        {data.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "11px",
          color: "rgba(226,232,240,0.45)",
          lineHeight: 1.4,
          marginBottom: "10px",
        }}
      >
        {data.description}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "8px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            color: sc.text,
            background: sc.bg,
            padding: "2px 7px",
            borderRadius: "4px",
          }}
        >
          {status}
        </span>
        {data.port && (
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>
            :{data.port}
          </span>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "rgba(0,212,255,0.5)",
          border: "none",
          width: "8px",
          height: "8px",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "rgba(0,212,255,0.5)",
          border: "none",
          width: "8px",
          height: "8px",
        }}
      />
    </div>
  );
}
