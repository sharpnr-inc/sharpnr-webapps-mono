import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/apis/mutation";
import { config } from "@/configs/env";
import {
  Shield,
  UtensilsCrossed,
  Hotel,
  Wine,
  BarChart3,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

// ─── Font Loader ──────────────────────────────────────────────────────────────

function useFonts() {
  useEffect(() => {
    if (document.getElementById("sharpnr-login-fonts")) return;
    const l = document.createElement("link");
    l.id = "sharpnr-login-fonts";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ─── Product Slides Data ──────────────────────────────────────────────────────

const SLIDES = [
  {
    id: "iam",
    tag: "Identity & Access",
    title: "SharpIAM",
    subtitle: "One identity.\nEvery surface.",
    description:
      "Centralized SSO, MFA, RBAC, and audit trails for the entire SharpNR ecosystem.",
    icon: <Shield size={28} />,
    accent: "hsl(var(--primary))",
    stats: [
      { value: "10M+", label: "Identities" },
      { value: "99.99%", label: "Uptime" },
      { value: "150+", label: "Integrations" },
    ],
    Visual: IAMVisual,
  },
  {
    id: "hospitality",
    tag: "Operations Suite",
    title: "SharpHospitality",
    subtitle: "One platform.\nEvery guest.",
    description:
      "Restaurant, Hotel & Bar management — unified or independent. Built for scale.",
    icon: (
      <div style={{ display: "flex", gap: 6 }}>
        <UtensilsCrossed size={20} />
        <Hotel size={20} />
        <Wine size={20} />
      </div>
    ),
    accent: "hsl(var(--primary))",
    stats: [
      { value: "3-in-1", label: "Modules" },
      { value: "10K+", label: "Outlets" },
      { value: "< 2s", label: "Sync" },
    ],
    Visual: HospitalityVisual,
  },
  {
    id: "analytics",
    tag: "Business Intelligence",
    title: "SharpAnalytics",
    subtitle: "Every metric.\nOne view.",
    description:
      "Real-time dashboards and cross-product insights across your entire SharpNR stack.",
    icon: <BarChart3 size={28} />,
    accent: "hsl(var(--primary))",
    stats: [
      { value: "Live", label: "Data Sync" },
      { value: "100+", label: "Report Types" },
      { value: "∞", label: "History" },
    ],
    Visual: AnalyticsVisual,
  },
];

// ─── SVG Visuals ──────────────────────────────────────────────────────────────

function IAMVisual() {
  const nodes = [
    { y: 45, label: "Users" },
    { y: 120, label: "Devices" },
    { y: 195, label: "Apps" },
  ];
  return (
    <svg viewBox="0 0 280 250" width="100%" height="100%" aria-hidden>
      <defs>
        <pattern
          id="lg"
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
            fill="hsl(var(--primary-foreground))"
            opacity="0.07"
          />
        </pattern>
      </defs>
      <rect width="280" height="250" fill="url(#lg)" />
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          <rect
            x={16}
            y={n.y}
            width={72}
            height={30}
            rx={7}
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.08"
            stroke="hsl(var(--primary-foreground))"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <text
            x={52}
            y={n.y + 20}
            textAnchor="middle"
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.7"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
          >
            {n.label}
          </text>
          <motion.line
            x1={88}
            y1={n.y + 15}
            x2={128}
            y2={118}
            stroke="hsl(var(--primary-foreground))"
            strokeOpacity="0.2"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
          />
        </motion.g>
      ))}
      {[1, 2, 3].map((r) => (
        <motion.circle
          key={r}
          cx={148}
          cy={118}
          r={22 + r * 18}
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeOpacity="0.06"
          strokeWidth="1"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ delay: 1 + r * 0.4, duration: 3, repeat: Infinity }}
        />
      ))}
      <motion.g
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "148px 118px" }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <circle
          cx={148}
          cy={118}
          r={30}
          fill="hsl(var(--primary-foreground))"
          fillOpacity="0.1"
          stroke="hsl(var(--primary-foreground))"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <text
          x={148}
          y={112}
          textAnchor="middle"
          fill="hsl(var(--primary-foreground))"
          fontSize="10"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="700"
          letterSpacing="1"
        >
          SHARP
        </text>
        <text
          x={148}
          y={128}
          textAnchor="middle"
          fill="hsl(var(--primary-foreground))"
          fillOpacity="0.7"
          fontSize="10"
          fontFamily="'Cormorant Garamond', serif"
          fontStyle="italic"
        >
          IAM
        </text>
      </motion.g>
      {[
        { x: 188, y: 58, label: "Dashboard" },
        { x: 188, y: 118, label: "API" },
        { x: 188, y: 178, label: "Audit" },
      ].map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
        >
          <motion.line
            x1={178}
            y1={118}
            x2={188}
            y2={n.y + 15}
            stroke="hsl(var(--primary-foreground))"
            strokeOpacity="0.15"
            strokeDasharray="3 3"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
          />
          <rect
            x={188}
            y={n.y}
            width={76}
            height={30}
            rx={7}
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.06"
            stroke="hsl(var(--primary-foreground))"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
          <text
            x={226}
            y={n.y + 20}
            textAnchor="middle"
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.6"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function HospitalityVisual() {
  const items = [
    { label: "Table 4 · Pasta, Wine", status: "LIVE" },
    { label: "Room 204 · Check-out 11AM", status: "SOON" },
    { label: "Bar Tab · Patron x3", status: "OPEN" },
    { label: "Kitchen · 6 Orders Active", status: "BUSY" },
  ];
  return (
    <svg viewBox="0 0 280 250" width="100%" height="100%" aria-hidden>
      <defs>
        <pattern
          id="hg2"
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
            fill="hsl(var(--primary-foreground))"
            opacity="0.07"
          />
        </pattern>
      </defs>
      <rect width="280" height="250" fill="url(#hg2)" />
      <motion.text
        x={16}
        y={32}
        fill="hsl(var(--primary-foreground))"
        fillOpacity="0.5"
        fontSize="9"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        LIVE OPERATIONS
      </motion.text>
      {items.map((item, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.12 }}
        >
          <rect
            x={16}
            y={46 + i * 48}
            width={248}
            height={36}
            rx={8}
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.07"
            stroke="hsl(var(--primary-foreground))"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
          <text
            x={28}
            y={46 + i * 48 + 23}
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.8"
            fontSize="11"
            fontFamily="'DM Sans', sans-serif"
          >
            {item.label}
          </text>
          <motion.rect
            x={216}
            y={46 + i * 48 + 10}
            width={36}
            height={16}
            rx={4}
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.12"
            animate={{ fillOpacity: [0.08, 0.18, 0.08] }}
            transition={{ delay: 1 + i * 0.2, duration: 2.5, repeat: Infinity }}
          />
          <text
            x={234}
            y={46 + i * 48 + 22}
            textAnchor="middle"
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.6"
            fontSize="7.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            {item.status}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function AnalyticsVisual() {
  const bars = [55, 72, 48, 88, 63, 91, 70];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const maxH = 120;
  return (
    <svg viewBox="0 0 280 250" width="100%" height="100%" aria-hidden>
      <defs>
        <pattern
          id="ag"
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
            fill="hsl(var(--primary-foreground))"
            opacity="0.07"
          />
        </pattern>
      </defs>
      <rect width="280" height="250" fill="url(#ag)" />
      <motion.text
        x={16}
        y={32}
        fill="hsl(var(--primary-foreground))"
        fillOpacity="0.5"
        fontSize="9"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        WEEKLY REVENUE
      </motion.text>
      {bars.map((pct, i) => {
        const h = (pct / 100) * maxH;
        const x = 24 + i * 34;
        const y = 180 - h;
        return (
          <motion.g key={i}>
            <motion.rect
              x={x}
              y={y}
              width={22}
              height={h}
              rx={4}
              fill="hsl(var(--primary-foreground))"
              fillOpacity={i === 5 ? 0.35 : 0.15}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${x + 11}px 180px` }}
              transition={{
                delay: 0.4 + i * 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
            />
            <text
              x={x + 11}
              y={195}
              textAnchor="middle"
              fill="hsl(var(--primary-foreground))"
              fillOpacity="0.35"
              fontSize="8.5"
              fontFamily="'JetBrains Mono', monospace"
            >
              {days[i]}
            </text>
          </motion.g>
        );
      })}
      {/* Trend line */}
      <motion.polyline
        points={bars
          .map((pct, i) => `${24 + i * 34 + 11},${180 - (pct / 100) * maxH}`)
          .join(" ")}
        fill="none"
        stroke="hsl(var(--primary-foreground))"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <rect
          x={16}
          y={210}
          width={248}
          height={28}
          rx={7}
          fill="hsl(var(--primary-foreground))"
          fillOpacity="0.07"
          stroke="hsl(var(--primary-foreground))"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        <text
          x={28}
          y={228}
          fill="hsl(var(--primary-foreground))"
          fillOpacity="0.5"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
        >
          TOTAL ₹ 3,24,800 · ↑ 18.4% vs LAST WEEK
        </text>
      </motion.g>
    </svg>
  );
}

// ─── Left Panel — Product Carousel ───────────────────────────────────────────

function ProductCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(id);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // const slide = SLIDES[current];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "hsl(var(--primary))",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary-foreground) / 0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 40% 60%, transparent 30%, hsl(var(--primary)) 85%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "44px 48px",
        }}
      >
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: "auto",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              fontWeight: 700,
              color: "hsl(var(--primary-foreground))",
              letterSpacing: 0.5,
            }}
          >
            Sharp<span style={{ fontStyle: "italic", opacity: 0.7 }}>NR</span>
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8.5,
              letterSpacing: 2,
              color: "hsl(var(--primary-foreground))",
              opacity: 0.35,
            }}
          >
            SUITE
          </span>
        </motion.div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          style={{ width: "100%" }}
        >
          <CarouselContent>
            {SLIDES.map((s) => (
              <CarouselItem key={s.id}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45 }}
                  >
                    {/* Visual */}
                    <div
                      style={{ height: 210, marginBottom: 32, opacity: 0.9 }}
                    >
                      <s.Visual />
                    </div>

                    {/* Tag */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "4px 12px",
                        borderRadius: 100,
                        border:
                          "1px solid hsl(var(--primary-foreground) / 0.2)",
                        background: "hsl(var(--primary-foreground) / 0.07)",
                        marginBottom: 20,
                      }}
                    >
                      <span
                        style={{
                          color: "hsl(var(--primary-foreground))",
                          opacity: 0.6,
                        }}
                      >
                        {s.icon}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9,
                          letterSpacing: 2,
                          color: "hsl(var(--primary-foreground))",
                          opacity: 0.55,
                        }}
                      >
                        {s.tag.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 44,
                        fontWeight: 700,
                        lineHeight: 0.95,
                        letterSpacing: "-0.5px",
                        color: "hsl(var(--primary-foreground))",
                        margin: "0 0 6px",
                      }}
                    >
                      {s.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 20,
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "hsl(var(--primary-foreground))",
                        opacity: 0.6,
                        margin: "0 0 16px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {s.subtitle}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13.5,
                        lineHeight: 1.65,
                        color: "hsl(var(--primary-foreground))",
                        opacity: 0.55,
                        margin: "0 0 28px",
                        maxWidth: 340,
                      }}
                    >
                      {s.description}
                    </p>

                    {/* Mini stats */}
                    <div style={{ display: "flex", gap: 28 }}>
                      {s.stats.map((st) => (
                        <div key={st.label}>
                          <div
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: 24,
                              fontWeight: 700,
                              color: "hsl(var(--primary-foreground))",
                              lineHeight: 1,
                            }}
                          >
                            {st.value}
                          </div>
                          <div
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 8.5,
                              letterSpacing: 1.5,
                              color: "hsl(var(--primary-foreground))",
                              opacity: 0.4,
                              marginTop: 3,
                            }}
                          >
                            {st.label.toUpperCase()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8, marginTop: 36 }}>
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => api?.scrollTo(i)}
              animate={{
                width: i === current ? 24 : 6,
                opacity: i === current ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              style={{
                height: 6,
                borderRadius: 3,
                background: "hsl(var(--primary-foreground))",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Right Panel — Login Form ─────────────────────────────────────────────────

function LoginForm() {
  const navigate = useNavigate();
  const loginUser = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: ({ value }) => {
      loginUser.mutateAsync(value, {
        onError: () => {
          toast.error("Invalid Email or Password ❌");
          form.reset();
        },

        onSuccess: () => {
          toast.success("Logged In successfully");
          window.location.replace(config.iamAppUrl);
        },
      });
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "48px 64px",
        background: "hsl(var(--background))",
        position: "relative",
      }}
    >
      {/* Faint dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border) / 0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 20%, hsl(var(--background)) 80%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Header */}
          <div style={{ marginBottom: 44 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                letterSpacing: 2.5,
                color: "hsl(var(--primary))",
                margin: "0 0 14px",
              }}
            >
              — SHARPNR ACCOUNT
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.3px",
                color: "hsl(var(--foreground))",
                margin: "0 0 10px",
              }}
            >
              Welcome back.
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: "hsl(var(--muted-foreground))",
                margin: 0,
              }}
            >
              Sign in to access your workspace and all SharpNR products.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            {/* Email */}
            <form.Field name="email">
              {({ state, handleBlur, handleChange }) => (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ marginBottom: 20 }}
                >
                  <Label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      display: "block",
                      marginBottom: 8,
                      letterSpacing: 0.2,
                    }}
                  >
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    className={cn(
                      state.meta.isTouched &&
                        state.meta.errors.length > 0 &&
                        "border-red-500! ring-red-500!",
                    )}
                    style={{
                      height: 46,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      borderRadius: 10,
                    }}
                  />
                </motion.div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {({ state, handleBlur, handleChange }) => (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  style={{ marginBottom: 12 }}
                >
                  <Label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      display: "block",
                      marginBottom: 8,
                      letterSpacing: 0.2,
                    }}
                  >
                    Password
                  </Label>
                  <div style={{ position: "relative" }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                      style={{
                        height: 46,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        borderRadius: 10,
                        paddingRight: 44,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: "hsl(var(--muted-foreground))",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </form.Field>

            {/* Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: 28 }}
            >
              <Button
                variant="link"
                style={{
                  padding: 0,
                  height: "auto",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                Forgot your password?
              </Button>
            </motion.div>

            {/* Submit */}
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
                email: state.values.email,
                password: state.values.password,
              })}
              children={({ canSubmit, isSubmitting, email, password }) => {
                const isDisabled =
                  !canSubmit ||
                  isSubmitting ||
                  !email?.trim() ||
                  !password?.trim();
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Button
                      type="submit"
                      disabled={isDisabled}
                      style={{
                        width: "100%",
                        height: 48,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        opacity: isDisabled ? 0.5 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            width: 16,
                            height: 16,
                            border:
                              "2px solid hsl(var(--primary-foreground) / 0.3)",
                            borderTopColor: "hsl(var(--primary-foreground))",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <>
                          Sign In <ArrowRight size={16} />
                        </>
                      )}
                    </Button>
                  </motion.div>
                );
              }}
            />
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              margin: "28px 0",
            }}
          >
            <div
              style={{ flex: 1, height: 1, background: "hsl(var(--border))" }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                letterSpacing: 1.5,
                color: "hsl(var(--muted-foreground))",
                opacity: 0.5,
              }}
            >
              OR
            </span>
            <div
              style={{ flex: 1, height: 1, background: "hsl(var(--border))" }}
            />
          </motion.div>

          {/* Sign up */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                textAlign: "center",
                margin: "0 0 12px",
              }}
            >
              Don't have an account?
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/signup" })}
              style={{
                width: "100%",
                height: 46,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14.5,
                fontWeight: 500,
                borderRadius: 10,
              }}
            >
              Create a SharpNR Account
            </Button>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: 1,
              color: "hsl(var(--muted-foreground))",
              opacity: 0.35,
              textAlign: "center",
              marginTop: 36,
            }}
          >
            Secured by SharpIAM · SOC2 Compliant
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export function LoginPage(): React.JSX.Element {
  useFonts();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left — Product Showcase */}
      <div style={{ height: "100vh", position: "sticky", top: 0 }}>
        <ProductCarousel />
      </div>

      {/* Right — Login */}
      <div style={{ minHeight: "100vh", overflowY: "auto" }}>
        <LoginForm />
      </div>
    </div>
  );
}
