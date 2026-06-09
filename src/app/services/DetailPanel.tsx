import { useEffect, useRef } from "react";
import { LAYER_META, SERVICE_DETAIL } from "./arch-data";
import type { Node } from "@xyflow/react";

type DetailPanelProps = {
  node: Node;
};

export function DetailPanel({ node }: DetailPanelProps) {
  const data = node.data as {
    title: string;
    layer: "ops" | "org" | "platform";
  };
  const layer = LAYER_META[data.layer];
  const detail = SERVICE_DETAIL[data.title] ?? {
    description: "No details available for this service.",
    responsibilities: [],
  };

  const panelRef = useRef<HTMLDivElement>(null);
  const prevTitle = useRef<string>("");

  // Fade-slide in on node change
  useEffect(() => {
    if (prevTitle.current === data.title) return;
    prevTitle.current = data.title;

    const el = panelRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.28s ease, transform 0.28s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, [data.title]);

  return (
    <aside
      className="flex flex-col justify-center"
      style={{
        width: "360px",
        flexShrink: 0,
        padding: "48px 36px",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div ref={panelRef}>
        {/* Layer breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: layer.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: "10px",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: layer.color,
              opacity: 0.8,
            }}
          >
            {layer.tag}
          </span>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px" }}>
            ·
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {layer.label}
          </span>
        </div>

        {/* Service name */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#f1f5f9",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {data.title}
        </h1>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, ${layer.color}55, transparent)`,
            marginBottom: "20px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.75,
            color: "rgba(203,213,225,0.75)",
            marginBottom: "28px",
          }}
        >
          {detail.description}
        </p>

        {/* Responsibilities */}
        {detail.responsibilities.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "12px",
              }}
            >
              Handles
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {detail.responsibilities.map((r) => (
                <li
                  key={r}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "13px",
                    color: "rgba(203,213,225,0.65)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      color: layer.color,
                      opacity: 0.7,
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    ›
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Connects to */}
        {detail.connects && detail.connects.length > 0 && (
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "10px",
              }}
            >
              Connects to
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {detail.connects.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "5px",
                    background: "rgba(6,182,212,0.08)",
                    border: "1px solid rgba(6,182,212,0.2)",
                    color: "rgba(34,211,238,0.75)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer hint */}
        <p
          style={{
            marginTop: "36px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.15)",
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          }}
        >
          ← click a node to explore
        </p>
      </div>
    </aside>
  );
}
