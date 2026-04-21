"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Users,
  BadgeDollarSign,
  CalendarDays,
  TrendingUp,
  ClipboardCheck,
  UserPlus,
  FileText,
  Bell,
  ShieldCheck,
  Building2,
  ChevronRight,
  Star,
} from "lucide-react";

// ─── Font Loader ──────────────────────────────────────────────────────────────

function useFonts() {
  useEffect(() => {
    if (document.getElementById("sharp-hr-fonts")) return;
    const l = document.createElement("link");
    l.id = "sharp-hr-fonts";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    id: "employees",
    num: "01",
    icon: <Users size={22} />,
    tag: "Core HR",
    title: "Employee Management",
    subtitle: "Every person, in one place.",
    description:
      "Centralized employee profiles, org charts, document management, and lifecycle tracking — from offer letter to alumni.",
    chips: [
      "Employee Directory",
      "Org Chart",
      "Document Vault",
      "Lifecycle Tracking",
      "Custom Fields",
      "Role History",
    ],
  },
  {
    id: "payroll",
    num: "02",
    icon: <BadgeDollarSign size={22} />,
    tag: "Payroll",
    title: "Payroll & Compensation",
    subtitle: "Pay right. Every time.",
    description:
      "Automated payroll runs, tax computation, payslip generation, and compliance-ready salary registers across all pay structures.",
    chips: [
      "Auto Payroll Runs",
      "Tax Computation",
      "Payslip Generator",
      "CTC Breakdowns",
      "Reimbursements",
      "Payroll History",
    ],
  },
  {
    id: "leaves",
    num: "03",
    icon: <CalendarDays size={22} />,
    tag: "Time & Attendance",
    title: "Leave & Attendance",
    subtitle: "Time tracked. Policies respected.",
    description:
      "Custom leave policies, multi-level approvals, biometric sync, shift scheduling, and real-time attendance dashboards.",
    chips: [
      "Custom Leave Types",
      "Approval Workflows",
      "Shift Scheduling",
      "Biometric Sync",
      "Holiday Calendar",
      "Comp Off",
    ],
  },
  {
    id: "performance",
    num: "04",
    icon: <TrendingUp size={22} />,
    tag: "Performance",
    title: "Performance Management",
    subtitle: "Growth, made visible.",
    description:
      "Goal setting, OKRs, 360° reviews, appraisal cycles, and continuous feedback loops — all tied to your compensation workflows.",
    chips: [
      "OKR Tracking",
      "360° Reviews",
      "Appraisal Cycles",
      "Continuous Feedback",
      "Rating Scales",
      "Performance Reports",
    ],
  },
  {
    id: "recruitment",
    num: "05",
    icon: <UserPlus size={22} />,
    tag: "Hiring",
    title: "Recruitment & Onboarding",
    subtitle: "Hire fast. Onboard right.",
    description:
      "ATS pipeline, job posting, interview scheduling, offer management, and structured onboarding checklists — end-to-end.",
    chips: [
      "ATS Pipeline",
      "Job Posting",
      "Interview Scheduler",
      "Offer Letters",
      "Onboarding Tasks",
      "E-signatures",
    ],
  },
  {
    id: "compliance",
    num: "06",
    icon: <ShieldCheck size={22} />,
    tag: "Compliance",
    title: "Compliance & Reports",
    subtitle: "Audit-ready. Always.",
    description:
      "PF, ESI, TDS, labour law compliance, and statutory reports — auto-generated, filed, and archived.",
    chips: [
      "PF & ESI",
      "TDS Returns",
      "Gratuity Calc",
      "Form 16",
      "Labour Registers",
      "Audit Trails",
    ],
  },
];

const STATS = [
  { value: "50K+", label: "Employees Managed" },
  { value: "99.8%", label: "Payroll Accuracy" },
  { value: "6-in-1", label: "Unified Modules" },
  { value: "< 5min", label: "Payroll Run Time" },
];

const PLATFORM_FEATURES = [
  {
    icon: <Bell size={16} />,
    title: "Smart Notifications",
    desc: "Policy reminders, approval nudges, and payroll alerts — delivered at the right moment.",
  },
  {
    icon: <Building2 size={16} />,
    title: "Multi-Entity Support",
    desc: "Manage multiple legal entities, locations, and pay structures from one account.",
  },
  {
    icon: <FileText size={16} />,
    title: "Document Management",
    desc: "Offer letters, contracts, appraisal forms — generated, signed, and stored.",
  },
  {
    icon: <ClipboardCheck size={16} />,
    title: "Policy Engine",
    desc: "Build any HR policy — leave, probation, shift — with a flexible rule builder.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Head of HR, UrbanScale",
    body: "SharpHR replaced four different tools we were using. The payroll accuracy alone saved us 12 hours a month.",
  },
  {
    name: "Rohan Joshi",
    role: "COO, Nimbus Fintech",
    body: "The performance module changed how we run appraisals. Feedback is now continuous, not an annual nightmare.",
  },
  {
    name: "Anjali Rao",
    role: "People Ops Lead, CraftWorks",
    body: "Onboarding used to take us a week of back-and-forth. With SharpHR, new hires are productive from day one.",
  },
];

// ─── Org Chart Visual ─────────────────────────────────────────────────────────

function OrgChartVisual() {
  const ceo = { x: 204, y: 24, label: "CEO", sub: "Arjun S." };
  const tier2 = [
    { x: 82, y: 110, label: "Engineering", sub: "12 members" },
    { x: 204, y: 110, label: "People Ops", sub: "5 members" },
    { x: 326, y: 110, label: "Finance", sub: "8 members" },
  ];
  const tier3 = [
    { x: 30, y: 196, label: "Frontend", sub: "4" },
    { x: 134, y: 196, label: "Backend", sub: "8" },
    { x: 238, y: 196, label: "Recruiter", sub: "2" },
    { x: 342, y: 196, label: "Payroll", sub: "3" },
  ];

  return (
    <svg viewBox="0 0 430 290" width="100%" height="100%" aria-hidden>
      <defs>
        <pattern
          id="og"
          x="0"
          y="0"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="1"
            cy="1"
            r="0.8"
            fill="hsl(var(--border))"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="430" height="290" fill="url(#og)" />

      {/* CEO → tier2 lines */}
      {tier2.map((n, i) => (
        <motion.line
          key={i}
          x1={ceo.x + 46}
          y1={ceo.y + 34}
          x2={n.x + 46}
          y2={n.y}
          stroke="hsl(var(--border))"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
        />
      ))}

      {/* tier2 → tier3 lines */}
      {[
        [0, 0],
        [0, 1],
        [1, 2],
        [2, 3],
      ].map(([s, t], i) => (
        <motion.line
          key={`t${i}`}
          x1={tier2[s].x + 46}
          y1={tier2[s].y + 34}
          x2={tier3[t].x + 46}
          y2={tier3[t].y}
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
        />
      ))}

      {/* CEO node */}
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        <rect
          x={ceo.x}
          y={ceo.y}
          width={92}
          height={38}
          rx={9}
          fill="hsl(var(--primary))"
          fillOpacity="0.12"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <text
          x={ceo.x + 46}
          y={ceo.y + 15}
          textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="9.5"
          fontWeight="600"
          fontFamily="'JetBrains Mono', monospace"
        >
          {ceo.label}
        </text>
        <text
          x={ceo.x + 46}
          y={ceo.y + 29}
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize="8.5"
          fontFamily="'DM Sans', sans-serif"
        >
          {ceo.sub}
        </text>
      </motion.g>

      {/* Tier 2 */}
      {tier2.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <rect
            x={n.x}
            y={n.y}
            width={92}
            height={38}
            rx={9}
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
          <text
            x={n.x + 46}
            y={n.y + 15}
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            fontSize="9.5"
            fontWeight="500"
            fontFamily="'DM Sans', sans-serif"
          >
            {n.label}
          </text>
          <text
            x={n.x + 46}
            y={n.y + 29}
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
            opacity="0.6"
          >
            {n.sub}
          </text>
        </motion.g>
      ))}

      {/* Tier 3 */}
      {tier3.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 + i * 0.08 }}
        >
          <rect
            x={n.x}
            y={n.y}
            width={92}
            height={38}
            rx={9}
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <text
            x={n.x + 46}
            y={n.y + 15}
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            fontSize="9"
            fontWeight="500"
            fontFamily="'DM Sans', sans-serif"
          >
            {n.label}
          </text>
          <text
            x={n.x + 46}
            y={n.y + 29}
            textAnchor="middle"
            fill="hsl(var(--primary))"
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
            opacity="0.6"
          >
            {n.sub} members
          </text>
        </motion.g>
      ))}

      {/* Live badge */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <rect
          x={14}
          y={252}
          width={400}
          height={28}
          rx={7}
          fill="hsl(var(--primary))"
          fillOpacity="0.06"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
        <motion.circle
          cx={28}
          cy={266}
          r={4}
          fill="hsl(var(--primary))"
          fillOpacity="0.8"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text
          x={40}
          y={270}
          fill="hsl(var(--muted-foreground))"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          opacity="0.6"
        >
          LIVE ORG · 37 EMPLOYEES · 3 DEPARTMENTS · 2 OPEN ROLES
        </text>
      </motion.g>
    </svg>
  );
}

// ─── Payroll Visual ───────────────────────────────────────────────────────────

function PayrollVisual() {
  const rows = [
    {
      name: "Sneha K.",
      dept: "Engineering",
      ctc: "₹18.5L",
      status: "Processed",
    },
    { name: "Rahul D.", dept: "Design", ctc: "₹14.2L", status: "Processed" },
    { name: "Megha P.", dept: "People Ops", ctc: "₹12.0L", status: "Pending" },
    { name: "Aditya R.", dept: "Finance", ctc: "₹16.8L", status: "Processed" },
  ];
  return (
    <svg viewBox="0 0 430 290" width="100%" height="100%" aria-hidden>
      <defs>
        <pattern
          id="pg"
          x="0"
          y="0"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="1"
            cy="1"
            r="0.8"
            fill="hsl(var(--border))"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="430" height="290" fill="url(#pg)" />
      <motion.text
        x={16}
        y={30}
        fill="hsl(var(--foreground))"
        fontSize="10"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="2"
        fillOpacity="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        MARCH PAYROLL · RUN IN 3m 24s
      </motion.text>
      {/* Header row */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {["Employee", "Department", "CTC", "Status"].map((h, i) => (
          <text
            key={h}
            x={[16, 130, 265, 340][i]}
            y={54}
            fill="hsl(var(--muted-foreground))"
            fontSize="8.5"
            fillOpacity="0.5"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="1"
          >
            {h.toUpperCase()}
          </text>
        ))}
      </motion.g>
      {rows.map((r, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
        >
          <rect
            x={14}
            y={64 + i * 46}
            width={400}
            height={36}
            rx={8}
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
          <text
            x={28}
            y={64 + i * 46 + 22}
            fill="hsl(var(--foreground))"
            fontSize="11"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="500"
          >
            {r.name}
          </text>
          <text
            x={130}
            y={64 + i * 46 + 22}
            fill="hsl(var(--muted-foreground))"
            fontSize="10"
            fontFamily="'DM Sans', sans-serif"
          >
            {r.dept}
          </text>
          <text
            x={265}
            y={64 + i * 46 + 22}
            fill="hsl(var(--foreground))"
            fontSize="10.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            {r.ctc}
          </text>
          <rect
            x={340}
            y={64 + i * 46 + 9}
            width={60}
            height={18}
            rx={5}
            fill={
              r.status === "Processed"
                ? "hsl(var(--primary))"
                : "hsl(var(--muted))"
            }
            fillOpacity={r.status === "Processed" ? 0.12 : 0.4}
          />
          <text
            x={370}
            y={64 + i * 46 + 22}
            textAnchor="middle"
            fill={
              r.status === "Processed"
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))"
            }
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            {r.status.toUpperCase()}
          </text>
        </motion.g>
      ))}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <rect
          x={14}
          y={254}
          width={400}
          height={28}
          rx={7}
          fill="hsl(var(--primary))"
          fillOpacity="0.07"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
        <text
          x={28}
          y={272}
          fill="hsl(var(--muted-foreground))"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          opacity="0.6"
        >
          TOTAL DISBURSED · ₹ 61,50,000 · 37 EMPLOYEES · 100% COMPLIANT
        </text>
      </motion.g>
    </svg>
  );
}

// ─── Leave Visual ─────────────────────────────────────────────────────────────

function LeaveVisual() {
  const people = ["Arjun", "Sneha", "Rahul", "Megha", "Aditya"];
  const leaves = [[0, 1, 2], [5, 6], [3, 4, 5, 6], [1], [8, 9, 10]];
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  return (
    <svg viewBox="0 0 430 290" width="100%" height="100%" aria-hidden>
      <defs>
        <pattern
          id="lvg"
          x="0"
          y="0"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="1"
            cy="1"
            r="0.8"
            fill="hsl(var(--border))"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="430" height="290" fill="url(#lvg)" />
      <motion.text
        x={16}
        y={28}
        fill="hsl(var(--foreground))"
        fontSize="10"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="2"
        fillOpacity="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        LEAVE CALENDAR · MARCH
      </motion.text>
      {days.map((d, i) => (
        <text
          key={d}
          x={88 + i * 24}
          y={50}
          fill="hsl(var(--muted-foreground))"
          fontSize="8"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          opacity="0.4"
        >
          {d}
        </text>
      ))}
      {people.map((p, pi) => (
        <motion.g
          key={p}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + pi * 0.1 }}
        >
          <text
            x={14}
            y={76 + pi * 42}
            fill="hsl(var(--muted-foreground))"
            fontSize="10.5"
            fontFamily="'DM Sans', sans-serif"
          >
            {p}
          </text>
          {days.map((_, di) => {
            const isLeave = leaves[pi].includes(di);
            return (
              <motion.rect
                key={di}
                x={78 + di * 24}
                y={60 + pi * 42}
                width={20}
                height={24}
                rx={4}
                fill={isLeave ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                fillOpacity={isLeave ? 0.25 : 0.15}
                stroke={isLeave ? "hsl(var(--primary))" : "transparent"}
                strokeWidth="1"
                strokeOpacity="0.4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + pi * 0.08 + di * 0.02 }}
              />
            );
          })}
        </motion.g>
      ))}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <rect
          x={14}
          y={254}
          width={400}
          height={28}
          rx={7}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        <text
          x={28}
          y={272}
          fill="hsl(var(--muted-foreground))"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          opacity="0.6"
        >
          12 LEAVES APPROVED · 3 PENDING · 0 CONFLICTS
        </text>
      </motion.g>
    </svg>
  );
}

// ─── Module visuals map ───────────────────────────────────────────────────────

const MOD_VISUALS: Record<string, React.ReactNode> = {
  employees: <OrgChartVisual />,
  payroll: <PayrollVisual />,
  leaves: <LeaveVisual />,
  performance: <OrgChartVisual />,
  recruitment: <PayrollVisual />,
  compliance: <LeaveVisual />,
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 52px",
        height: 62,
        background: "hsl(var(--background) / 0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: "hsl(var(--foreground))",
          }}
        >
          Sharp
          <span style={{ color: "hsl(var(--primary))", fontStyle: "italic" }}>
            HR
          </span>
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8.5,
            letterSpacing: 2,
            color: "hsl(var(--muted-foreground))",
            opacity: 0.45,
            marginLeft: 6,
          }}
        >
          by SharpNR
        </span>
      </div>

      <div style={{ display: "flex", gap: 30 }}>
        {["Modules", "Pricing", "Integrations", "Docs"].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 500,
              color: "hsl(var(--muted-foreground))",
              textDecoration: "none",
            }}
          >
            {item}
          </a>
        ))}
      </div>

      <Button
        size="sm"
        style={{ gap: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
      >
        Get Started <ChevronRight size={14} />
      </Button>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "130px 52px 80px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border) / 0.55) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 35%, hsl(var(--background)) 88%)",
        }}
      />
      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "52%",
          width: 640,
          height: 560,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse, hsl(var(--primary) / 0.055), transparent 68%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 38,
          }}
        >
          <Badge
            variant="outline"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: 2.5,
            }}
          >
            SharpNR Suite
          </Badge>
          <div
            style={{ height: 1, width: 48, background: "hsl(var(--border))" }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              letterSpacing: 2,
              color: "hsl(var(--muted-foreground))",
              opacity: 0.5,
            }}
          >
            PEOPLE OPERATIONS PLATFORM
          </span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(64px, 8.2vw, 112px)",
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: "-1.5px",
                color: "hsl(var(--foreground))",
                margin: "0 0 10px",
              }}
            >
              Your people.
              <br />
              <motion.em
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                style={{ fontStyle: "italic", color: "hsl(var(--primary))" }}
              >
                Fully seen.
              </motion.em>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "min(480px, 90%)" }}
              transition={{ delay: 0.55, duration: 0.75, ease: "easeOut" }}
              style={{
                height: 1,
                background: "hsl(var(--border))",
                marginBottom: 28,
                marginTop: 26,
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.75,
                color: "hsl(var(--muted-foreground))",
                margin: "0 0 40px",
                maxWidth: 460,
              }}
            >
              SharpHR is the all-in-one HR platform for modern teams. Employee
              records, payroll, leaves, performance, hiring, and compliance —
              unified, automated, and built to scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Button
                size="lg"
                style={{
                  gap: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Start for Free <ArrowRight size={17} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book a Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.68 }}
              style={{
                marginTop: 44,
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              {[
                "PF & ESI Ready",
                "Form 16 Auto-gen",
                "Payroll in < 5min",
                "Multi-Entity",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9.5,
                    letterSpacing: 1.5,
                    color: "hsl(var(--muted-foreground))",
                    opacity: 0.5,
                    borderBottom: "1px solid hsl(var(--border))",
                    paddingBottom: 3,
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — animated stacked module pills */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.65 }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {MODULES.slice(0, 5).map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.09 }}
                whileHover={{ x: 6, borderColor: "hsl(var(--primary) / 0.4)" }}
                style={{
                  padding: "17px 22px",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  background: "hsl(var(--card))",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "default",
                  transition: "border-color 0.22s ease",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9,
                    background: "hsl(var(--primary) / 0.08)",
                    border: "1px solid hsl(var(--primary) / 0.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "hsl(var(--primary))",
                    flexShrink: 0,
                  }}
                >
                  {m.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {m.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 8.5,
                      letterSpacing: 1.5,
                      color: "hsl(var(--muted-foreground))",
                      opacity: 0.45,
                      marginTop: 2,
                    }}
                  >
                    {m.tag.toUpperCase()}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "hsl(var(--border))",
                    lineHeight: 1,
                  }}
                >
                  {m.num}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid hsl(var(--border))",
        borderBottom: "1px solid hsl(var(--border))",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        padding: "0 52px",
      }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.09 }}
          style={{
            padding: "48px 24px",
            textAlign: "center",
            borderRight: i < 3 ? "1px solid hsl(var(--border))" : undefined,
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1,
              color: "hsl(var(--foreground))",
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              letterSpacing: 2,
              color: "hsl(var(--muted-foreground))",
              marginTop: 8,
            }}
          >
            {s.label.toUpperCase()}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

// ─── Modules Deep Dive ────────────────────────────────────────────────────────

function ModulesSection() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];

  return (
    <section
      style={{
        padding: "110px 52px",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 60 }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: 3,
            color: "hsl(var(--primary))",
            marginBottom: 16,
          }}
        >
          — Core Modules
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 5vw, 62px)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.5px",
            color: "hsl(var(--foreground))",
            margin: 0,
          }}
        >
          Six modules.
          <br />
          <em style={{ fontStyle: "italic", color: "hsl(var(--primary))" }}>
            One HR platform.
          </em>
        </motion.h2>
      </div>

      {/* Tab row */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 56,
          flexWrap: "wrap",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          overflow: "hidden",
          width: "fit-content",
        }}
      >
        {MODULES.map((mod, i) => (
          <motion.button
            key={mod.id}
            onClick={() => setActive(i)}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "11px 22px",
              background:
                active === i ? "hsl(var(--primary))" : "hsl(var(--card))",
              color:
                active === i
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--muted-foreground))",
              border: "none",
              borderRight:
                i < MODULES.length - 1
                  ? "1px solid hsl(var(--border))"
                  : undefined,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
              transition: "all 0.22s ease",
            }}
          >
            {mod.icon}
            <span
              style={
                {
                  display: "none",
                  "@media (min-width: 768px)": { display: "inline" },
                } as React.CSSProperties
              }
            >
              {mod.title.split(" ")[0]}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 1,
                color: "hsl(var(--border))",
                marginBottom: 2,
              }}
            >
              {m.num}
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.3px",
                color: "hsl(var(--foreground))",
                margin: "0 0 6px",
              }}
            >
              {m.title}
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontStyle: "italic",
                color: "hsl(var(--primary))",
                margin: "0 0 20px",
              }}
            >
              {m.subtitle}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.72,
                color: "hsl(var(--muted-foreground))",
                margin: "0 0 32px",
              }}
            >
              {m.description}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 9,
                marginBottom: 32,
              }}
            >
              {m.chips.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: "5px 13px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 100,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "hsl(var(--muted-foreground))",
                    background: "hsl(var(--muted))",
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <Button
              variant="outline"
              style={{ gap: 6, fontFamily: "'DM Sans', sans-serif" }}
            >
              Explore {m.title} <ArrowRight size={14} />
            </Button>
          </div>

          {/* Visual */}
          <div
            style={{
              border: "1px solid hsl(var(--border))",
              borderRadius: 16,
              background: "hsl(var(--card))",
              padding: 20,
              height: 320,
              overflow: "hidden",
            }}
          >
            {MOD_VISUALS[m.id]}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ─── Platform Features ────────────────────────────────────────────────────────

function PlatformSection() {
  return (
    <section
      style={{
        padding: "110px 52px",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: 3,
              color: "hsl(var(--primary))",
              marginBottom: 20,
            }}
          >
            — Platform Depth
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px, 4.5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.5px",
              color: "hsl(var(--foreground))",
              margin: "0 0 20px",
            }}
          >
            Built deep.
            <br />
            <em style={{ fontStyle: "italic", color: "hsl(var(--primary))" }}>
              Not just wide.
            </em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15.5,
              lineHeight: 1.72,
              color: "hsl(var(--muted-foreground))",
              margin: "0 0 36px",
            }}
          >
            SharpHR isn't a surface-level HRMS. Every module goes deep — from
            custom policy engines to statutory compliance that files itself.
            Powered by SharpIAM for role-based access across every action.
          </motion.p>

          {/* Terminal callout */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26 }}
            style={{
              padding: "16px 20px",
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 10,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12.5,
              lineHeight: 1.65,
              color: "hsl(var(--muted-foreground))",
            }}
          >
            <span style={{ color: "hsl(var(--primary))" }}>$</span> npx
            create-sharpnr-app --with-hr
            <br />
            <span style={{ opacity: 0.45 }}>
              ✓ SharpHR configured · 6 modules active · IAM linked
            </span>
          </motion.div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          {PLATFORM_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "24px 20px",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                background: "hsl(var(--card))",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "hsl(var(--primary) / 0.09)",
                  border: "1px solid hsl(var(--primary) / 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "hsl(var(--primary))",
                  marginBottom: 14,
                }}
              >
                {f.icon}
              </div>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                  margin: "0 0 8px",
                }}
              >
                {f.title}
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section
      style={{
        padding: "110px 52px",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: 3,
          color: "hsl(var(--primary))",
          marginBottom: 16,
        }}
      >
        — Voices
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(40px, 5vw, 60px)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.5px",
          color: "hsl(var(--foreground))",
          margin: "0 0 60px",
        }}
      >
        Heard from the field.
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "1.5rem",
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            style={{
              padding: "32px 28px",
              border: "1px solid hsl(var(--border))",
              borderRadius: 14,
              background: "hsl(var(--card))",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              cursor: "default",
            }}
          >
            <div style={{ display: "flex", gap: 3 }}>
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  size={13}
                  fill="hsl(var(--primary))"
                  color="hsl(var(--primary))"
                  style={{ opacity: 0.7 }}
                />
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 19,
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "hsl(var(--foreground))",
                margin: 0,
                flex: 1,
              }}
            >
              "{t.body}"
            </p>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: 1.5,
                  color: "hsl(var(--muted-foreground))",
                  opacity: 0.5,
                  marginTop: 3,
                }}
              >
                {t.role.toUpperCase()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      style={{
        padding: "120px 52px",
        borderTop: "1px solid hsl(var(--border))",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "radial-gradient(circle, hsl(var(--border) / 0.5) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 25%, hsl(var(--background)) 85%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 440,
          background:
            "radial-gradient(ellipse, hsl(var(--primary) / 0.06), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: 3,
            color: "hsl(var(--primary))",
            marginBottom: 28,
          }}
        >
          — Get Started
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(54px, 8vw, 96px)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-1px",
            color: "hsl(var(--foreground))",
            margin: "0 auto 24px",
          }}
        >
          HR that works
          <br />
          <em style={{ fontStyle: "italic", color: "hsl(var(--primary))" }}>
            for your people.
          </em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: "hsl(var(--muted-foreground))",
            maxWidth: 440,
            margin: "0 auto 48px",
          }}
        >
          From your first hire to your thousandth, SharpHR grows with you. Set
          up in a day. Run forever.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            size="lg"
            style={{
              gap: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Start Free Trial <ArrowRight size={18} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}
          >
            Talk to Sales
          </Button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 56,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9.5,
            letterSpacing: 1.5,
            color: "hsl(var(--muted-foreground))",
            opacity: 0.32,
          }}
        >
          SharpHR · A SharpNR Product · Secured by SharpIAM
        </motion.p>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function LandingPage() {
  useFonts();
  return (
    <div
      style={{
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ModulesSection />
      <PlatformSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
