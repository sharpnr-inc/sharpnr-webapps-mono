import React from "react";

export function ArchitectureDiagram() {
  const fontStyles = {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  return (
    <svg
      width="100%"
      viewBox="0 0 700 860"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-3xl mx-auto drop-shadow-sm"
    >
      <title>Sharpnr Architecture Overview</title>
      <desc>
        Three-tier architecture: Business Operations at top,
        Business/Organization in middle, Sharpnr underlying services at bottom
      </desc>

      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.05" />
        </filter>
        <linearGradient id="grad-ops" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={5}
          markerHeight={5}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* --- Tier 1: Business Operations --- */}
      <g filter="url(#shadow)">
        <rect
          x={20}
          y={40}
          width={660}
          height={230}
          rx={20}
          fill="#eff6ff"
          stroke="#bfdbfe"
          strokeWidth={1.5}
        />
        <text
          x={350}
          y={72}
          textAnchor="middle"
          fill="#1e40af"
          fontSize={16}
          fontWeight={700}
          style={fontStyles}
        >
          Business Operations
        </text>
        <text
          x={350}
          y={90}
          textAnchor="middle"
          fill="#60a5fa"
          fontSize={13}
          style={fontStyles}
        >
          Industry-specific industry apps built on Sharpnr
        </text>
      </g>

      {/* Sharp-Hospitality */}
      <g transform="translate(45, 110)" filter="url(#shadow)">
        <rect
          width={180}
          height={140}
          rx={12}
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth={1}
        />
        <circle cx={30} cy={30} r={12} fill="#dbeafe" />
        <path
          d="M26 30h8M30 26v8"
          stroke="#2563eb"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <text
          x={50}
          y={35}
          fill="#0f172a"
          fontSize={14}
          fontWeight={600}
          style={fontStyles}
        >
          Sharp-Hospitality
        </text>
        <text x={20} y={60} fill="#64748b" fontSize={12} style={fontStyles}>
          Restaurants · Hotels · Bars
        </text>
        <rect x={15} y={75} width={150} height={22} rx={4} fill="#f8fafc" />
        <text x={25} y={90} fill="#475569" fontSize={11} style={fontStyles}>
          Tables &amp; Reservations
        </text>
        <rect x={15} y={102} width={150} height={22} rx={4} fill="#f8fafc" />
        <text x={25} y={117} fill="#475569" fontSize={11} style={fontStyles}>
          Order Management
        </text>
      </g>

      {/* Sharp-Retail */}
      <g transform="translate(245, 110)" filter="url(#shadow)">
        <rect
          width={180}
          height={140}
          rx={12}
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth={1}
        />
        <circle cx={30} cy={30} r={12} fill="#fef3c7" />
        <path
          d="M26 32h8M30 26l-4 4 4 4"
          stroke="#d97706"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />
        <text
          x={50}
          y={35}
          fill="#0f172a"
          fontSize={14}
          fontWeight={600}
          style={fontStyles}
        >
          Sharp-Retail
        </text>
        <text x={20} y={60} fill="#64748b" fontSize={12} style={fontStyles}>
          Inventory · POS · E-com
        </text>
        <rect x={15} y={75} width={150} height={22} rx={4} fill="#f8fafc" />
        <text x={25} y={90} fill="#475569" fontSize={11} style={fontStyles}>
          Sales Management
        </text>
        <rect x={15} y={102} width={150} height={22} rx={4} fill="#f8fafc" />
        <text x={25} y={117} fill="#475569" fontSize={11} style={fontStyles}>
          Customer Loyalty
        </text>
      </g>

      {/* Sharp-Healthcare */}
      <g transform="translate(445, 110)" filter="url(#shadow)">
        <rect
          width={180}
          height={140}
          rx={12}
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth={1}
        />
        <circle cx={30} cy={30} r={12} fill="#dcfce7" />
        <path
          d="M26 30h8M30 26v8"
          stroke="#16a34a"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <text
          x={50}
          y={35}
          fill="#0f172a"
          fontSize={14}
          fontWeight={600}
          style={fontStyles}
        >
          Sharp-Healthcare
        </text>
        <text x={20} y={60} fill="#64748b" fontSize={12} style={fontStyles}>
          Clinics · Hospitals · Labs
        </text>
        <rect x={15} y={75} width={150} height={22} rx={4} fill="#f8fafc" />
        <text x={25} y={90} fill="#475569" fontSize={11} style={fontStyles}>
          Patient Records
        </text>
        <rect x={15} y={102} width={150} height={22} rx={4} fill="#f8fafc" />
        <text x={25} y={117} fill="#475569" fontSize={11} style={fontStyles}>
          Appointments
        </text>
      </g>

      {/* Connector 1 */}
      <path
        d="M350 270 L350 310"
        stroke="#94a3b8"
        strokeWidth={2}
        strokeDasharray="4 4"
        markerEnd="url(#arrowhead)"
      />
      <rect x={300} y={280} width={100} height={20} rx={10} fill="#f1f5f9" />
      <text
        x={350}
        y={294}
        textAnchor="middle"
        fill="#64748b"
        fontSize={11}
        fontWeight={500}
        style={fontStyles}
      >
        INTEGRATES WITH
      </text>

      {/* --- Tier 2: Business / Organization --- */}
      <g filter="url(#shadow)">
        <rect
          x={20}
          y={320}
          width={660}
          height={120}
          rx={20}
          fill="#fff7ed"
          stroke="#fed7aa"
          strokeWidth={1.5}
        />
        <text
          x={350}
          y={352}
          textAnchor="middle"
          fill="#9a3412"
          fontSize={16}
          fontWeight={700}
          style={fontStyles}
        >
          Business / Organization
        </text>
        <text
          x={350}
          y={370}
          textAnchor="middle"
          fill="#f97316"
          fontSize={13}
          style={fontStyles}
        >
          Centralized management of teams, finances, and data
        </text>

        <g transform="translate(40, 385)">
          {["Teams", "Finances", "Workflows", "Data", "Security"].map(
            (label, i) => (
              <g key={label} transform={`translate(${i * 128}, 0)`}>
                <rect
                  width={110}
                  height={32}
                  rx={8}
                  fill="#ffffff"
                  stroke="#fdba74"
                  strokeWidth={1}
                />
                <text
                  x={55}
                  y={21}
                  textAnchor="middle"
                  fill="#ea580c"
                  fontSize={12}
                  fontWeight={500}
                  style={fontStyles}
                >
                  {label}
                </text>
              </g>
            ),
          )}
        </g>
      </g>

      {/* Connector 2 */}
      <path
        d="M350 440 L350 480"
        stroke="#94a3b8"
        strokeWidth={2}
        strokeDasharray="4 4"
        markerEnd="url(#arrowhead)"
      />
      <rect x={300} y={450} width={100} height={20} rx={10} fill="#f1f5f9" />
      <text
        x={350}
        y={464}
        textAnchor="middle"
        fill="#64748b"
        fontSize={11}
        fontWeight={500}
        style={fontStyles}
      >
        POWERED BY
      </text>

      {/* --- Tier 3: Sharpnr Underlying Services --- */}
      <g filter="url(#shadow)">
        <rect
          x={20}
          y={490}
          width={660}
          height={330}
          rx={20}
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth={1.5}
        />
        <text
          x={350}
          y={522}
          textAnchor="middle"
          fill="#334155"
          fontSize={16}
          fontWeight={700}
          style={fontStyles}
        >
          Sharpnr Underlying Services
        </text>
        <text
          x={350}
          y={540}
          textAnchor="middle"
          fill="#64748b"
          fontSize={13}
          style={fontStyles}
        >
          Shared platform services and core infrastructure
        </text>
      </g>

      {/* Service Grid */}
      {[
        { name: "Sharp-Accounting", color: "#6366f1", icon: "ledger" },
        { name: "Sharp-HRMS", color: "#ec4899", icon: "people" },
        { name: "Sharp-IAM", color: "#8b5cf6", icon: "shield" },
        { name: "Sharp-Silo", color: "#06b6d4", icon: "database" },
        { name: "Orchestrator", color: "#f59e0b", icon: "cpu" },
        { name: "Sharp-Cable", color: "#10b981", icon: "link" },
      ].map((service, i) => (
        <g
          key={service.name}
          transform={`translate(${50 + (i % 3) * 210}, ${570 + Math.floor(i / 3) * 110})`}
          filter="url(#shadow)"
        >
          <rect
            width={180}
            height={85}
            rx={12}
            fill="#ffffff"
            stroke={service.color}
            strokeWidth={1.5}
            strokeOpacity={0.3}
          />
          <rect width={5} height={85} rx={2} fill={service.color} />
          <text
            x={15}
            y={30}
            fill="#0f172a"
            fontSize={14}
            fontWeight={600}
            style={fontStyles}
          >
            {service.name}
          </text>
          <text x={15} y={52} fill="#64748b" fontSize={11} style={fontStyles}>
            Core platform component
          </text>
          <circle cx={155} cy={60} r={12} fill={`${service.color}15`} />
          <circle cx={155} cy={60} r={3} fill={service.color} />
        </g>
      ))}
    </svg>
  );
}
