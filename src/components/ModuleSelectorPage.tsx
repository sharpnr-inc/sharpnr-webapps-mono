import { useState } from "react";
import {
  Building2,
  UtensilsCrossed,
  Wine,
  Construction,
  ArrowRight,
} from "lucide-react";

const modules = [
  {
    title: "Hotel Management",
    description:
      "Reservations, check-ins, housekeeping and complete guest lifecycle management.",
    icon: Building2,
    link: "workspace/hotel",
    accent: "#7eb8f7",
    accentRgb: "126, 184, 247",
    tag: "Core",
    number: "01",
  },
  {
    title: "Restaurant",
    description:
      "Orders, tables, menus, billing and kitchen workflow automation.",
    icon: UtensilsCrossed,
    link: "workspace/restaurant",
    accent: "#fb923c",
    accentRgb: "251, 146, 60",
    tag: "Core",
    number: "02",
  },
  {
    title: "Bar Management",
    description:
      "POS operations, beverage tracking and inventory shift control.",
    icon: Wine,
    link: "workspace/bar",
    accent: "#34d399",
    accentRgb: "52, 211, 153",
    tag: "Core",
    number: "03",
  },
  {
    title: "Infrastructure",
    description: "Kitchen, reception and loading dock operations management.",
    icon: Construction,
    link: "workspace/infra/kitchen/",
    accent: "#94a3b8",
    accentRgb: "148, 163, 184",
    tag: "Support",
    number: "04",
  },
];

export default function ModuleSelectorPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060c18",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&family=Cormorant+Garant:wght@400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sh-reveal { opacity: 0; }
        .sh-reveal.mounted { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        .sh-reveal.mounted.d1 { animation-delay: 0s; }
        .sh-reveal.mounted.d2 { animation-delay: 0.07s; }
        .sh-reveal.mounted.d3 { animation-delay: 0.14s; }
        .sh-reveal.mounted.d4 { animation-delay: 0.21s; }
        .sh-reveal.mounted.d5 { animation-delay: 0.28s; }
        .sh-reveal.mounted.d6 { animation-delay: 0.35s; }
        .sh-reveal.mounted.d7 { animation-delay: 0.42s; }

        .sh-card { transition: background 0.25s ease; }
        .sh-card-accent { transition: opacity 0.25s ease; }
        .sh-icon-wrap { transition: background 0.25s ease, border-color 0.25s ease; }
        .sh-icon { transition: color 0.25s ease; }
        .sh-title { transition: color 0.25s ease; }
        .sh-desc  { transition: color 0.25s ease; }
        .sh-cta   { transition: opacity 0.25s ease, transform 0.25s ease; }
        .sh-number { transition: color 0.25s ease; }
      `}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(201,146,42,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "960px", width: "100%", position: "relative" }}>
        {/* Brand */}
        <div
          className={`sh-reveal mounted d1`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              border: "1px solid rgba(201,146,42,0.35)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#c9922a",
                borderRadius: "2px",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garant', Georgia, serif",
              fontSize: "17px",
              fontWeight: "600",
              color: "#d4c9a8",
              letterSpacing: "0.04em",
            }}
          >
            Sharp Hospitality
          </span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p
            className={`sh-reveal mounted d2`}
            style={{
              fontSize: "10px",
              fontWeight: "500",
              letterSpacing: "0.18em",
              color: "#c9922a",
              textTransform: "uppercase",
              margin: "0 0 1rem",
            }}
          >
            Management Suite
          </p>
          <h1
            className={`sh-reveal mounted d3`}
            style={{
              fontFamily: "'Cormorant Garant', Georgia, serif",
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              fontWeight: "500",
              color: "#ede8db",
              lineHeight: "1.1",
              margin: "0 0 1.1rem",
              letterSpacing: "-0.01em",
            }}
          >
            Select Your Workspace
          </h1>
          <p
            className={`sh-reveal mounted d4`}
            style={{
              color: "#6b6358",
              fontSize: "15px",
              lineHeight: "1.7",
              maxWidth: "440px",
              margin: 0,
            }}
          >
            Manage your hospitality operations — independently or fully
            connected.
          </p>
        </div>

        {/* Hairline divider */}
        <div
          className={`sh-reveal mounted d4`}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, rgba(201,146,42,0.25), transparent 60%)",
            marginBottom: "3rem",
          }}
        />

        {/* Grid — unified panel with 1px gap separators */}
        <div
          className={`sh-reveal mounted d5`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "14px",
            overflow: "hidden",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            const active = hovered === i;
            return (
              <div
                key={mod.title}
                className="sh-card"
                onClick={() => window.open(mod.link, "_self")}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: active
                    ? `rgba(${mod.accentRgb}, 0.07)`
                    : "#0d0b09",
                  padding: "2rem 1.75rem",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top accent bar */}
                <div
                  className="sh-card-accent"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: mod.accent,
                    opacity: active ? 1 : 0,
                  }}
                />

                {/* Module number */}
                <div
                  className="sh-number"
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    letterSpacing: "0.12em",
                    color: active ? mod.accent : "#2e2a26",
                    marginBottom: "1.5rem",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {mod.number}
                </div>

                {/* Icon */}
                <div
                  className="sh-icon-wrap"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: active
                      ? `rgba(${mod.accentRgb}, 0.15)`
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      active
                        ? `rgba(${mod.accentRgb}, 0.3)`
                        : "rgba(255,255,255,0.07)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Icon
                    className="sh-icon"
                    size={17}
                    style={{ color: active ? mod.accent : "#3d3830" }}
                  />
                </div>

                {/* Tag pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "100px",
                    padding: "2px 9px",
                    marginBottom: "0.8rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      color: "#3a3530",
                      textTransform: "uppercase",
                      fontWeight: "500",
                    }}
                  >
                    {mod.tag}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="sh-title"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: active ? "#ede8db" : "#7a6f60",
                    margin: "0 0 0.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {mod.title}
                </h2>

                {/* Description */}
                <p
                  className="sh-desc"
                  style={{
                    fontSize: "12px",
                    color: active ? "#5a5248" : "#302c28",
                    lineHeight: "1.65",
                    margin: "0 0 1.75rem",
                  }}
                >
                  {mod.description}
                </p>

                {/* CTA */}
                <div
                  className="sh-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: mod.accent,
                    letterSpacing: "0.04em",
                    opacity: active ? 1 : 0,
                    transform: active ? "translateX(0)" : "translateX(-6px)",
                  }}
                >
                  Enter workspace
                  <ArrowRight size={11} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer row */}
        <div
          className={`sh-reveal mounted d7`}
          style={{
            marginTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "11px", color: "#2a2620" }}>
            © {new Date().getFullYear()} Sharp Hospitality
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#34d399",
                boxShadow: "0 0 6px rgba(52,211,153,0.5)",
              }}
            />
            <span style={{ fontSize: "11px", color: "#2a2620" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
