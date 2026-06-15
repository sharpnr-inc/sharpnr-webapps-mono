"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle, Code2, Fingerprint,
  GitBranch, Bell, Key, Zap, ChevronRight, Shield
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    icon: <Key size={20} />,
    title: "Single Sign-On",
    description:
      "One identity, everywhere. Seamless SSO across all your apps with SAML 2.0, OIDC, and OAuth2.",
    tag: "SSO",
  },
  {
    icon: <Fingerprint size={20} />,
    title: "Adaptive MFA",
    description:
      "Risk-based multi-factor auth that challenges users only when the context demands it.",
    tag: "MFA",
  },
  {
    icon: <GitBranch size={20} />,
    title: "Role-Based Access",
    description:
      "Granular RBAC and ABAC policies. Right access, right person, right time — no exceptions.",
    tag: "RBAC",
  },
  {
    icon: <Bell size={20} />,
    title: "Audit & Compliance",
    description:
      "Immutable audit trails with SOC2, GDPR, and HIPAA compliance built in by design.",
    tag: "AUDIT",
  },
  {
    icon: <Zap size={20} />,
    title: "Auto Provisioning",
    description:
      "SCIM-powered lifecycle management. Users onboard and offboard in seconds, not tickets.",
    tag: "SCIM",
  },
  {
    icon: <Code2 size={20} />,
    title: "API-First Design",
    description:
      "Every capability exposed via REST & GraphQL. Build identity natively into anything.",
    tag: "API",
  },
];

const STATS = [
  { value: 99, suffix: ".99%", label: "Uptime SLA" },
  { value: 10, suffix: "M+", label: "Identities Managed" },
  { value: 150, suffix: "+", label: "Integrations" },
  { value: 0, suffix: "", label: "Security Breaches" },
];

const WHY_ITEMS = [
  "Deploy in minutes, not months",
  "No vendor lock-in — open standards only",
  "99.99% uptime with enterprise SLA",
  "Self-hosted or cloud — your choice",
  "Built for engineers, loved by security teams",
  "The last identity system you'll ever need",
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function useFonts() {
  useEffect(() => {
    if (document.getElementById("sharp-iam-fonts")) return;
    const link = document.createElement("link");
    link.id = "sharp-iam-fonts";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || value === 0) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {value === 0 ? 0 : count}
      {suffix}
    </span>
  );
}

// ─── Identity Graph SVG ───────────────────────────────────────────────────────

function IdentityGraph() {
  const inputs = [
    { y: 70,  label: "Users",    delay: 0.3 },
    { y: 180, label: "Apps",     delay: 0.5 },
    { y: 290, label: "Devices",  delay: 0.7 },
    { y: 400, label: "Services", delay: 0.9 },
  ];
  const outputs = [
    { y: 120, label: "Dashboard", delay: 1.3 },
    { y: 250, label: "API",       delay: 1.5 },
    { y: 380, label: "Database",  delay: 1.7 },
  ];

  const cx = 250, cy = 240;

  return (
    <svg
      viewBox="0 0 500 490"
      width="100%"
      height="100%"
      style={{ maxWidth: 460 }}
      aria-hidden="true"
    >
      {/* Grid dots */}
      <defs>
        <pattern id="grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="hsl(var(--border))" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="500" height="490" fill="url(#grid)" />

      {/* Input lines */}
      {inputs.map((n, i) => (
        <motion.line
          key={`il-${i}`}
          x1={112} y1={n.y + 18}
          x2={cx}  y2={cy}
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: n.delay + 0.3, duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Output dashed lines */}
      {outputs.map((n, i) => (
        <motion.line
          key={`ol-${i}`}
          x1={cx}  y1={cy}
          x2={388} y2={n.y + 18}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ delay: n.delay, duration: 0.7, ease: "easeOut" }}
        />
      ))}

      {/* Input nodes */}
      {inputs.map((n, i) => (
        <motion.g
          key={`in-${i}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: n.delay, duration: 0.45, ease: "easeOut" }}
        >
          <rect x={20} y={n.y} width={92} height={36} rx={8}
            fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x={66} y={n.y + 23} textAnchor="middle"
            fill="hsl(var(--muted-foreground))" fontSize="11.5"
            fontFamily="'JetBrains Mono', monospace">
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* Hub — pulsing rings */}
      {[1, 2, 3].map((r) => (
        <motion.circle
          key={r}
          cx={cx} cy={cy} r={44 + r * 20}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.18, 0] }}
          transition={{ delay: 1.2 + r * 0.35, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Hub core */}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 180 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <circle cx={cx} cy={cy} r={52}
          fill="hsl(var(--primary))" fillOpacity="0.07"
          stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x={cx} y={cy - 9} textAnchor="middle"
          fill="hsl(var(--foreground))" fontSize="14"
          fontFamily="'Bebas Neue', sans-serif" letterSpacing="3">
          SHARP
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle"
          fill="hsl(var(--primary))" fontSize="14"
          fontFamily="'Bebas Neue', sans-serif" letterSpacing="3">
          IAM
        </text>
      </motion.g>

      {/* Output nodes */}
      {outputs.map((n, i) => (
        <motion.g
          key={`out-${i}`}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: n.delay, duration: 0.45, ease: "easeOut" }}
        >
          <rect x={388} y={n.y} width={96} height={36} rx={8}
            fill="hsl(var(--primary))" fillOpacity="0.07"
            stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.4" />
          <text x={436} y={n.y + 23} textAnchor="middle"
            fill="hsl(var(--foreground))" fontSize="11.5"
            fontFamily="'JetBrains Mono', monospace">
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "hsl(var(--card))",
        border: `1px solid ${hovered ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border))"}`,
        borderRadius: 12,
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s ease",
        cursor: "default",
      }}
    >
      {/* Hover shimmer */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 0%, hsl(var(--primary) / 0.06), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Tag */}
      <span style={{
        position: "absolute", top: 20, right: 20,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: 2,
        color: "hsl(var(--muted-foreground))", opacity: 0.5,
      }}>
        {feature.tag}
      </span>

      {/* Icon */}
      <motion.div
        animate={{ color: hovered ? "hsl(var(--primary))" : "hsl(var(--primary))" }}
        style={{
          width: 42, height: 42, borderRadius: 10,
          background: "hsl(var(--primary) / 0.08)",
          border: "1px solid hsl(var(--primary) / 0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "hsl(var(--primary))",
          marginBottom: 18,
        }}
      >
        {feature.icon}
      </motion.div>

      <h3 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15, fontWeight: 600,
        color: "hsl(var(--foreground))",
        marginBottom: 10, margin: "0 0 10px",
      }}>
        {feature.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13.5, lineHeight: 1.65,
        color: "hsl(var(--muted-foreground))",
        margin: 0,
      }}>
        {feature.description}
      </p>
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px", height: 64,
        background: "hsl(var(--background) / 0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 7,
          background: "hsl(var(--primary))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Shield size={16} color="hsl(var(--primary-foreground))" />
        </div>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 20, letterSpacing: 2,
          color: "hsl(var(--foreground))",
        }}>
          SHARP<span style={{ color: "hsl(var(--primary))" }}>IAM</span>
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 32 }}>
        {["Docs", "Changelog", "Pricing", "GitHub"].map((item) => (
          <a key={item} href="#" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13.5, fontWeight: 500,
            color: "hsl(var(--muted-foreground))",
            textDecoration: "none",
          }}>
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: "8px 20px",
          background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          border: "none", borderRadius: 7,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13.5, fontWeight: 600,
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
        }}
      >
        Get Access <ChevronRight size={14} />
      </motion.button>
    </motion.nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      gap: "3rem",
      padding: "120px 60px 80px",
      position: "relative",
      backgroundImage:
        "radial-gradient(circle, hsl(var(--border) / 0.45) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}>
      {/* Radial vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 50% 50%, transparent 40%, hsl(var(--background)) 100%)",
      }} />

      {/* Left: Text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 100,
            border: "1px solid hsl(var(--border))",
            background: "hsl(var(--muted))",
            marginBottom: 32,
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "hsl(var(--primary))",
              display: "inline-block",
            }}
          />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5, letterSpacing: 2.5,
            color: "hsl(var(--muted-foreground))",
          }}>
            BY SHARPNR
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65, ease: "easeOut" }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(72px, 9vw, 108px)",
            lineHeight: 0.92,
            letterSpacing: "3px",
            margin: "0 0 28px",
            color: "hsl(var(--foreground))",
          }}
        >
          SHARP
          <br />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ color: "hsl(var(--primary))", display: "inline-block" }}
          >
            IAM
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17.5, lineHeight: 1.7,
            color: "hsl(var(--muted-foreground))",
            maxWidth: 460, margin: "0 0 44px",
          }}
        >
          Centralized identity management for the modern enterprise.
          One platform to authenticate, authorize, and audit every
          identity across your entire organization.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 30px",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none", borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            Get Started <ArrowRight size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 30px",
              background: "transparent",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 500,
              cursor: "pointer",
            }}
          >
            View Docs
          </motion.button>
        </motion.div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{ marginTop: 48, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}
        >
          {["SOC2 Type II", "GDPR", "HIPAA", "ISO 27001"].map((b) => (
            <span key={b} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: 1.5,
              color: "hsl(var(--muted-foreground))",
              opacity: 0.6,
              borderBottom: "1px solid hsl(var(--border))",
              paddingBottom: 3,
            }}>
              {b}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right: Identity Graph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%", height: 500, position: "relative", zIndex: 1 }}
      >
        <IdentityGraph />
      </motion.div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid hsl(var(--border))",
        borderBottom: "1px solid hsl(var(--border))",
        padding: "60px 60px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2rem",
      }}
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{ textAlign: "center" }}
        >
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 56, letterSpacing: 1,
            color: "hsl(var(--foreground))",
            lineHeight: 1, marginBottom: 6,
          }}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5, letterSpacing: 2,
            color: "hsl(var(--muted-foreground))",
            textTransform: "uppercase",
          }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section style={{ padding: "100px 60px" }}>
      <div style={{ marginBottom: 60 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5, letterSpacing: 3,
            color: "hsl(var(--primary))",
            marginBottom: 16, textTransform: "uppercase",
          }}
        >
          — Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(42px, 5.5vw, 64px)",
            letterSpacing: 2,
            color: "hsl(var(--foreground))",
            margin: 0, lineHeight: 1,
          }}
        >
          EVERYTHING IDENTITY
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, color: "hsl(var(--muted-foreground))",
            marginTop: 14, maxWidth: 520, lineHeight: 1.6,
          }}
        >
          All the identity primitives your organization needs, unified under one roof.
          No stitching together six different tools.
        </motion.p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.25rem",
      }}>
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Why Section ──────────────────────────────────────────────────────────────

function WhySection() {
  return (
    <section style={{
      padding: "100px 60px",
      borderTop: "1px solid hsl(var(--border))",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "7rem",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "30%", left: "40%",
        width: 500, height: 400,
        background: "radial-gradient(ellipse, hsl(var(--primary) / 0.05), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5, letterSpacing: 3,
            color: "hsl(var(--primary))",
            marginBottom: 20, textTransform: "uppercase",
          }}
        >
          — Why SharpIAM
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(44px, 5vw, 62px)",
            letterSpacing: 2, lineHeight: 1,
            color: "hsl(var(--foreground))",
            marginBottom: 24,
          }}
        >
          BUILT FOR
          <br />SCALE FROM
          <br /><span style={{ color: "hsl(var(--primary))" }}>DAY ONE</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15.5, lineHeight: 1.7,
            color: "hsl(var(--muted-foreground))",
          }}
        >
          SharpIAM is the identity backbone of the SharpNR ecosystem.
          Built by engineers who've felt the pain of identity sprawl —
          it's designed to be the last identity system you'll ever need.
        </motion.p>

        {/* Terminal-style callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: 32, padding: "16px 20px",
            background: "hsl(var(--muted))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12.5, lineHeight: 1.6,
            color: "hsl(var(--muted-foreground))",
          }}
        >
          <span style={{ color: "hsl(var(--primary))" }}>$</span>{" "}
          npx create-sharpnr-app --with-iam
          <br />
          <span style={{ opacity: 0.5 }}>
            ✓ SharpIAM configured in 42s
          </span>
        </motion.div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {WHY_ITEMS.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ x: 4 }}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "15px 20px",
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 10, cursor: "default",
            }}
          >
            <CheckCircle size={15}
              style={{ flexShrink: 0, color: "hsl(var(--primary))" }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, fontWeight: 500,
              color: "hsl(var(--foreground))",
            }}>
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section style={{
      padding: "110px 60px",
      borderTop: "1px solid hsl(var(--border))",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      backgroundImage:
        "radial-gradient(circle, hsl(var(--border) / 0.45) 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(var(--background)) 85%)",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 400,
        background:
          "radial-gradient(ellipse, hsl(var(--primary) / 0.07), transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5, letterSpacing: 3,
            color: "hsl(var(--primary))",
            marginBottom: 24, textTransform: "uppercase",
          }}
        >
          — Get Started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(54px, 8vw, 88px)",
            letterSpacing: 2, lineHeight: 1,
            color: "hsl(var(--foreground))",
            marginBottom: 20,
          }}
        >
          IDENTITY,
          <br />
          <span style={{ color: "hsl(var(--primary))" }}>FINALLY SOLVED</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, lineHeight: 1.7,
            color: "hsl(var(--muted-foreground))",
            maxWidth: 420, margin: "0 auto 44px",
          }}
        >
          Join the SharpNR ecosystem. Set up in minutes, scale to millions of identities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ display: "flex", gap: 12, justifyContent: "center" }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "16px 38px",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none", borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            Start Free <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "16px 38px",
              background: "transparent",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Talk to Sales
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 48,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5, letterSpacing: 1.5,
            color: "hsl(var(--muted-foreground))",
            opacity: 0.4,
          }}
        >
          SharpIAM · A SharpNR Product · Built with ♯ precision
        </motion.p>
      </div>
    </section>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export function SharpIAMAboutPage() {
  useFonts();

  return (
    <div style={{
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WhySection />
      <CTASection />
    </div>
  );
}