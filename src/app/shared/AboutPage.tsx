import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Hotel,
  UtensilsCrossed,
  Wine,
  ChevronRight,
  Layers,
  Unplug,
  BarChart3,
  Users,
  ClipboardList,
  RefreshCw,
  Shield,
  Boxes,
  Bell,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Font Loader ──────────────────────────────────────────────────────────────

function useFonts() {
  useEffect(() => {
    if (document.getElementById("sharp-hosp-fonts")) return;
    const l = document.createElement("link");
    l.id = "sharp-hosp-fonts";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    id: "restaurant",
    label: "01",
    title: "Restaurant",
    subtitle: "Full-service dining, simplified.",
    icon: <UtensilsCrossed size={24} />,
    tag: "POS + Kitchen",
    description:
      "Orders, tables, menus, kitchen display, billing, and inventory — all synced in real time across every outlet.",
    features: [
      "Table Management",
      "KDS Integration",
      "Menu Builder",
      "Multi-Outlet Billing",
      "Inventory Control",
      "Shift Reports",
    ],
    visual: "restaurant",
  },
  {
    id: "hotel",
    label: "02",
    title: "Hotel",
    subtitle: "Guest experience, front to back.",
    icon: <Hotel size={24} />,
    tag: "Rooms + Guests",
    description:
      "Reservations, check-ins, housekeeping queues, room allocation, invoicing, and multi-property dashboards.",
    features: [
      "PMS Core",
      "Housekeeping Queue",
      "Channel Manager",
      "Folio & Invoicing",
      "Guest Profiles",
      "Multi-Property",
    ],
    visual: "hotel",
  },
  {
    id: "bar",
    label: "03",
    title: "Bar",
    subtitle: "Every pour, perfectly tracked.",
    icon: <Wine size={24} />,
    tag: "Liquor + POS",
    description:
      "Liquor inventory, bar POS workflows, consumption analytics, wastage control, and tab management.",
    features: [
      "Liquor Tracking",
      "Bar POS",
      "Tab Management",
      "Consumption Analytics",
      "Wastage Alerts",
      "Supplier Orders",
    ],
    visual: "bar",
  },
];

const STATS = [
  { value: "10K+", label: "Outlets Running" },
  { value: "3-in-1", label: "Unified Platform" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 2s", label: "Sync Latency" },
];

const PLATFORM_FEATURES = [
  {
    icon: <Layers size={18} />,
    title: "Unified Inventory",
    desc: "One stock pool across restaurant, hotel, and bar — no double entries.",
  },
  {
    icon: <Users size={18} />,
    title: "Shared Guest Profiles",
    desc: "A hotel guest is also a restaurant regular. One CRM to know them both.",
  },
  {
    icon: <BarChart3 size={18} />,
    title: "Cross-Module Analytics",
    desc: "Revenue, occupancy, and F&B — all in one real-time dashboard.",
  },
  {
    icon: <RefreshCw size={18} />,
    title: "Live Sync",
    desc: "Room charges posted to the restaurant bill. Automatically.",
  },
  {
    icon: <Shield size={18} />,
    title: "Role-Based Access",
    desc: "Barstaff see bar. Front desk sees rooms. SharpIAM-powered.",
  },
  {
    icon: <Bell size={18} />,
    title: "Smart Alerts",
    desc: "Low stock, overdue checkout, delayed KDS orders — you'll know before it's a problem.",
  },
  {
    icon: <ClipboardList size={18} />,
    title: "Audit Trails",
    desc: "Every transaction logged. Every edit tracked. Compliant by default.",
  },
  {
    icon: <Boxes size={18} />,
    title: "Multi-Property",
    desc: "Manage 1 location or 100 from the same interface.",
  },
];

// ─── Restaurant SVG Visual ────────────────────────────────────────────────────

function RestaurantVisual() {
  const tables = [
    { x: 60, y: 80, w: 80, h: 54 },
    { x: 180, y: 80, w: 80, h: 54 },
    { x: 60, y: 175, w: 80, h: 54 },
    { x: 180, y: 175, w: 80, h: 54 },
  ];
  return (
    <svg viewBox="0 0 320 300" width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern
          id="rg"
          x="0"
          y="0"
          width="20"
          height="20"
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
      <rect width="320" height="300" fill="url(#rg)" />
      {/* KDS header */}
      <motion.rect
        x={20}
        y={16}
        width={280}
        height={38}
        rx={8}
        fill="hsl(var(--card))"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeOpacity="0.35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.text
        x={35}
        y={39}
        fill="hsl(var(--primary))"
        fontSize="10"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        KITCHEN DISPLAY · 4 ACTIVE ORDERS
      </motion.text>

      {/* Table cards */}
      {tables.map((t, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        >
          <rect
            x={t.x}
            y={t.y}
            width={t.w}
            height={t.h}
            rx={7}
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
          <text
            x={t.x + 8}
            y={t.y + 16}
            fill="hsl(var(--muted-foreground))"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            TBL {i + 1}
          </text>
          <text
            x={t.x + 8}
            y={t.y + 32}
            fill="hsl(var(--foreground))"
            fontSize="9.5"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="600"
          >
            {
              [
                "Pasta, Tiramisu",
                "Steak x2, Wine",
                "Salad, Espresso",
                "Pizza, Gelato",
              ][i]
            }
          </text>
          <circle
            cx={t.x + t.w - 14}
            cy={t.y + 14}
            r={5}
            fill={
              [
                "hsl(var(--primary))",
                "hsl(var(--muted-foreground))",
                "hsl(var(--primary))",
                "hsl(var(--muted-foreground))",
              ][i]
            }
            opacity="0.6"
          />
        </motion.g>
      ))}

      {/* Billing row */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <rect
          x={20}
          y={252}
          width={280}
          height={34}
          rx={8}
          fill="hsl(var(--primary))"
          fillOpacity="0.08"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
        <text
          x={35}
          y={273}
          fill="hsl(var(--muted-foreground))"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
        >
          REVENUE TODAY · ₹ 48,200 · 22 COVERS
        </text>
      </motion.g>
    </svg>
  );
}

// ─── Hotel Visual ─────────────────────────────────────────────────────────────

function HotelVisual() {
  const rooms = Array.from({ length: 12 }, (_, i) => ({
    x: 20 + (i % 4) * 70,
    y: 60 + Math.floor(i / 4) * 64,
    status: [
      "occ",
      "free",
      "occ",
      "clean",
      "occ",
      "free",
      "occ",
      "occ",
      "clean",
      "free",
      "occ",
      "occ",
    ][i],
    num: 101 + i,
  }));
  const colors: Record<string, string> = {
    occ: "hsl(var(--primary))",
    free: "hsl(var(--muted-foreground))",
    clean: "hsl(var(--border))",
  };
  return (
    <svg viewBox="0 0 320 300" width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern
          id="hg"
          x="0"
          y="0"
          width="20"
          height="20"
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
      <rect width="320" height="300" fill="url(#hg)" />
      <motion.text
        x={20}
        y={38}
        fill="hsl(var(--foreground))"
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ROOM STATUS · FLOOR 1–3
      </motion.text>
      {rooms.map((r, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${r.x + 28}px ${r.y + 22}px` }}
          transition={{ delay: 0.2 + i * 0.06 }}
        >
          <rect
            x={r.x}
            y={r.y}
            width={56}
            height={44}
            rx={7}
            fill="hsl(var(--card))"
            stroke={colors[r.status]}
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <text
            x={r.x + 28}
            y={r.y + 18}
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
          >
            {r.num}
          </text>
          <text
            x={r.x + 28}
            y={r.y + 32}
            textAnchor="middle"
            fill={colors[r.status]}
            fontSize="7.5"
            fontFamily="'DM Sans', sans-serif"
            opacity="0.7"
          >
            {r.status.toUpperCase()}
          </text>
        </motion.g>
      ))}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <rect
          x={20}
          y={260}
          width={280}
          height={28}
          rx={7}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        <text
          x={35}
          y={277}
          fill="hsl(var(--muted-foreground))"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
        >
          8 OCC · 2 CLEAN · 2 FREE · 75% OCCUPANCY
        </text>
      </motion.g>
    </svg>
  );
}

// ─── Bar Visual ───────────────────────────────────────────────────────────────

function BarVisual() {
  const bottles = [
    "Johnnie Walker",
    "Grey Goose",
    "Bacardi",
    "Hendrick's",
    "Patron",
    "Aperol",
  ];
  const pct = [78, 42, 91, 23, 67, 55];
  return (
    <svg viewBox="0 0 320 300" width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern
          id="bg2"
          x="0"
          y="0"
          width="20"
          height="20"
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
      <rect width="320" height="300" fill="url(#bg2)" />
      <motion.text
        x={20}
        y={36}
        fill="hsl(var(--foreground))"
        fontSize="11"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        STOCK LEVELS · BAR 1
      </motion.text>
      {bottles.map((name, i) => (
        <motion.g
          key={name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 + i * 0.1 }}
        >
          <text
            x={20}
            y={72 + i * 36}
            fill="hsl(var(--muted-foreground))"
            fontSize="9.5"
            fontFamily="'DM Sans', sans-serif"
          >
            {name}
          </text>
          {/* Bar track */}
          <rect
            x={130}
            y={60 + i * 36}
            width={155}
            height={10}
            rx={5}
            fill="hsl(var(--muted))"
          />
          <motion.rect
            x={130}
            y={60 + i * 36}
            width={0}
            height={10}
            rx={5}
            fill={
              pct[i] < 30
                ? "hsl(var(--destructive, 0 72% 51%))"
                : "hsl(var(--primary))"
            }
            fillOpacity="0.7"
            animate={{ width: (155 * pct[i]) / 100 }}
            transition={{
              delay: 0.5 + i * 0.1,
              duration: 0.7,
              ease: "easeOut",
            }}
          />
          <text
            x={294}
            y={70 + i * 36}
            fill="hsl(var(--muted-foreground))"
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
            textAnchor="end"
          >
            {pct[i]}%
          </text>
        </motion.g>
      ))}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <rect
          x={20}
          y={262}
          width={280}
          height={28}
          rx={7}
          fill="hsl(var(--primary))"
          fillOpacity="0.07"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <text
          x={35}
          y={279}
          fill="hsl(var(--muted-foreground))"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
        >
          WASTAGE THIS WEEK · 3.2L · ALERT: HENDRICK'S LOW
        </text>
      </motion.g>
    </svg>
  );
}

const VISUALS: Record<string, React.ReactNode> = {
  restaurant: <RestaurantVisual />,
  hotel: <HotelVisual />,
  bar: <BarVisual />,
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
        padding: "0 48px",
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
            letterSpacing: 1,
            color: "hsl(var(--foreground))",
          }}
        >
          Sharp<span style={{ color: "hsl(var(--primary))" }}>Hospitality</span>
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: 2,
            color: "hsl(var(--muted-foreground))",
            opacity: 0.5,
            marginLeft: 6,
          }}
        >
          by SharpNR
        </span>
      </div>

      <div style={{ display: "flex", gap: 28 }}>
        {["Features", "Modules", "Pricing", "Docs"].map((item) => (
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

      <Button size="sm" style={{ gap: 6 }}>
        Get Started <ChevronRight size={14} />
      </Button>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const pillars = [
    { icon: <UtensilsCrossed size={16} />, label: "Restaurant" },
    { icon: <Hotel size={16} />, label: "Hotel" },
    { icon: <Wine size={16} />, label: "Bar" },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 48px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border) / 0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(var(--background)) 90%)",
        }}
      />
      {/* Ambient warm glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "55%",
          zIndex: 1,
          width: 600,
          height: 500,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse, hsl(var(--primary) / 0.06), transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 36,
          }}
        >
          <Badge
            variant="outline"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              letterSpacing: 2.5,
            }}
          >
            SharpNR Suite
          </Badge>
          <div
            style={{ height: 1, width: 60, background: "hsl(var(--border))" }}
          />
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11.5,
                fontWeight: 500,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <span style={{ color: "hsl(var(--primary))", opacity: 0.7 }}>
                {p.icon}
              </span>
              {p.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(64px, 8.5vw, 118px)",
            fontWeight: 700,
            lineHeight: 0.93,
            letterSpacing: "-1px",
            color: "hsl(var(--foreground))",
            margin: "0 0 12px",
          }}
        >
          One Platform.
          <br />
          <motion.em
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontStyle: "italic",
              color: "hsl(var(--primary))",
            }}
          >
            Every Guest.
          </motion.em>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "min(520px, 80%)" }}
          transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          style={{
            height: 1,
            background: "hsl(var(--border))",
            marginBottom: 32,
            marginTop: 24,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.75,
                color: "hsl(var(--muted-foreground))",
                margin: "0 0 40px",
              }}
            >
              SharpHospitality unifies Restaurant, Hotel, and Bar operations
              under one intelligent platform — purpose-built for modern
              hospitality groups. Run them together or independently. Scale from
              one outlet to a hundred.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button
                size="lg"
                style={{
                  gap: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Launch Platform <ArrowRight size={17} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                View Documentation
              </Button>
            </div>
            {/* Compliance / trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                marginTop: 40,
                display: "flex",
                gap: 24,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {["GST Ready", "Multi-currency", "Offline Mode", "PCI-DSS"].map(
                (b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9.5,
                      letterSpacing: 1.5,
                      color: "hsl(var(--muted-foreground))",
                      opacity: 0.5,
                      borderBottom: "1px solid hsl(var(--border))",
                      paddingBottom: 2,
                    }}
                  >
                    {b}
                  </span>
                ),
              )}
            </motion.div>
          </motion.div>

          {/* Module pills stacked */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.65, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {MODULES.map((m) => (
              <motion.div
                key={m.id}
                whileHover={{ x: 6, borderColor: "hsl(var(--primary) / 0.4)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  padding: "20px 24px",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  background: "hsl(var(--card))",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "hsl(var(--primary) / 0.08)",
                    border: "1px solid hsl(var(--primary) / 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "hsl(var(--primary))",
                    flexShrink: 0,
                  }}
                >
                  {m.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 19,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      lineHeight: 1.2,
                    }}
                  >
                    {m.title}{" "}
                    <span
                      style={{
                        fontStyle: "italic",
                        fontSize: 15,
                        color: "hsl(var(--muted-foreground))",
                        fontWeight: 400,
                      }}
                    >
                      Management
                    </span>
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
                    {m.tag}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 36,
                    fontWeight: 700,
                    color: "hsl(var(--border))",
                    lineHeight: 1,
                  }}
                >
                  {m.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid hsl(var(--border))",
        borderBottom: "1px solid hsl(var(--border))",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: "0 48px",
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
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

// ─── Mode Toggle Section ──────────────────────────────────────────────────────

function ModeSection() {
  const [mode, setMode] = useState<"unified" | "independent">("unified");

  const content = {
    unified: {
      title: "One system. Every operation.",
      items: [
        "Shared inventory across all outlets",
        "Single guest profile for hotel, restaurant & bar",
        "Cross-module billing — room charges to restaurant tab",
        "Consolidated reporting across all verticals",
        "Live sync between kitchen, front desk, and bar",
      ],
    },
    independent: {
      title: "Each module on its own terms.",
      items: [
        "Standalone restaurant POS — no hotel required",
        "Hotel PMS without F&B complexity",
        "Bar management fully decoupled",
        "Simpler permissions, focused dashboards",
        "Upgrade to Unified anytime — zero migration",
      ],
    },
  };

  const c = content[mode];

  return (
    <section
      style={{
        padding: "110px 48px",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
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
          — Deployment Architecture
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
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
            margin: 0,
          }}
        >
          Your platform,{" "}
          <em style={{ color: "hsl(var(--primary))", fontStyle: "italic" }}>
            your rules.
          </em>
        </motion.h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        {/* Toggle cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(["unified", "independent"] as const).map((m) => (
            <motion.div
              key={m}
              onClick={() => setMode(m)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                padding: "28px 28px",
                border: `1px solid ${mode === m ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                borderRadius: 14,
                background:
                  mode === m
                    ? "hsl(var(--primary) / 0.04)"
                    : "hsl(var(--card))",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background:
                      mode === m
                        ? "hsl(var(--primary) / 0.12)"
                        : "hsl(var(--muted))",
                    border: `1px solid ${mode === m ? "hsl(var(--primary) / 0.3)" : "hsl(var(--border))"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color:
                      mode === m
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted-foreground))",
                    transition: "all 0.25s ease",
                  }}
                >
                  {m === "unified" ? (
                    <Layers size={16} />
                  ) : (
                    <Unplug size={16} />
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color:
                        mode === m
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {m === "unified" ? "Unified Mode" : "Independent Mode"}
                  </div>
                </div>
                {mode === m && (
                  <motion.div
                    layoutId="active-badge"
                    style={{
                      marginLeft: "auto",
                      padding: "3px 10px",
                      borderRadius: 100,
                      background: "hsl(var(--primary) / 0.12)",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 8.5,
                      letterSpacing: 1.5,
                      color: "hsl(var(--primary))",
                    }}
                  >
                    ACTIVE
                  </motion.div>
                )}
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "hsl(var(--muted-foreground))",
                  margin: 0,
                }}
              >
                {m === "unified"
                  ? "Connect all three modules. Share inventory, guests, billing, and analytics across your entire hospitality operation."
                  : "Run each module standalone. Ideal for single-vertical businesses. Connect more modules as you grow."}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right panel — animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            style={{
              padding: "36px 36px",
              border: "1px solid hsl(var(--border))",
              borderRadius: 14,
              background: "hsl(var(--card))",
            }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                letterSpacing: 2,
                color: "hsl(var(--primary))",
                margin: "0 0 20px",
                textTransform: "uppercase",
              }}
            >
              {mode === "unified"
                ? "— Unified Benefits"
                : "— Standalone Benefits"}
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.15,
                color: "hsl(var(--foreground))",
                margin: "0 0 28px",
              }}
            >
              {c.title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {c.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      background: "hsl(var(--primary) / 0.1)",
                      border: "1px solid hsl(var(--primary) / 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "hsl(var(--primary))",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Module Deep Dive ─────────────────────────────────────────────────────────

function ModulesSection() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];

  return (
    <section
      style={{
        padding: "110px 48px",
        borderTop: "1px solid hsl(var(--border))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: 0,
          width: 500,
          height: 500,
          background:
            "radial-gradient(ellipse, hsl(var(--primary) / 0.04), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ marginBottom: 64 }}>
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
          initial={{ opacity: 0, y: 20 }}
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
            margin: 0,
          }}
        >
          The three pillars.
        </motion.h2>
      </div>

      {/* Tab row */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 48,
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
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "12px 32px",
              background:
                active === i ? "hsl(var(--primary))" : "hsl(var(--card))",
              color:
                active === i
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--muted-foreground))",
              border: "none",
              borderRight: i < 2 ? "1px solid hsl(var(--border))" : undefined,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease",
            }}
          >
            {mod.icon}
            {mod.title}
          </motion.button>
        ))}
      </div>

      {/* Module content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Text side */}
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1,
                color: "hsl(var(--border))",
                marginBottom: 4,
              }}
            >
              {m.label}
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(34px, 4vw, 48px)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.3px",
                color: "hsl(var(--foreground))",
                margin: "0 0 8px",
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
                margin: "0 0 36px",
              }}
            >
              {m.description}
            </p>
            {/* Feature tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {m.features.map((f, i) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 100,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: "hsl(var(--muted-foreground))",
                    background: "hsl(var(--muted))",
                  }}
                >
                  {f}
                </motion.span>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <Button variant="outline" style={{ gap: 6 }}>
                Explore {m.title} Module <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Visual side */}
          <div
            style={{
              border: "1px solid hsl(var(--border))",
              borderRadius: 16,
              background: "hsl(var(--card))",
              padding: 24,
              height: 320,
              overflow: "hidden",
            }}
          >
            {VISUALS[m.visual]}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ─── Platform Features Grid ───────────────────────────────────────────────────

function PlatformFeaturesSection() {
  return (
    <section
      style={{
        padding: "110px 48px",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      <div style={{ marginBottom: 64 }}>
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
          — Platform Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
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
            margin: "0 0 16px",
          }}
        >
          Built for hospitality.
          <br />
          <em style={{ fontStyle: "italic", color: "hsl(var(--primary))" }}>
            Obsessed with operations.
          </em>
        </motion.h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid hsl(var(--border))",
          borderLeft: "1px solid hsl(var(--border))",
        }}
      >
        {PLATFORM_FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.07 }}
            whileHover={{ background: "hsl(var(--muted) / 0.6)" }}
            style={{
              padding: "32px 28px",
              borderRight: "1px solid hsl(var(--border))",
              borderBottom: "1px solid hsl(var(--border))",
              transition: "background 0.2s ease",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                background: "hsl(var(--primary) / 0.08)",
                border: "1px solid hsl(var(--primary) / 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "hsl(var(--primary))",
                marginBottom: 18,
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
                fontSize: 13,
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
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      style={{
        padding: "120px 48px",
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
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 400,
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
          — Ready to begin
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(56px, 8vw, 100px)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-1px",
            color: "hsl(var(--foreground))",
            margin: "0 auto 28px",
          }}
        >
          Hospitality,
          <br />
          <em style={{ fontStyle: "italic", color: "hsl(var(--primary))" }}>
            reimagined.
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
          From a single outlet to a multi-property group — SharpHospitality
          scales with your ambition. Set up in an afternoon. Run for years.
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
            Book a Demo
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
            fontSize: 10,
            letterSpacing: 1.5,
            color: "hsl(var(--muted-foreground))",
            opacity: 0.35,
          }}
        >
          SharpHospitality · A SharpNR Product · Powered by SharpIAM
        </motion.p>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function SharpHospitalityAboutPage() {
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
      <StatsBar />
      <ModeSection />
      <ModulesSection />
      <PlatformFeaturesSection />
      <CTASection />
    </div>
  );
}
