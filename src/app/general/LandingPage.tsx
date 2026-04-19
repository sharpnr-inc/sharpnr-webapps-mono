"use client";

import { useNavigate } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ── Icons (inline SVG to avoid deps) ───────────────────────────────────────
const Icon = {
  hexagon: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
    </svg>
  ),
  grid: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  zap: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  signal: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <path
        d="M2 20h.01M7 20v-4M12 20V10M17 20V4M22 20V2"
        strokeLinecap="round"
      />
    </svg>
  ),
  cpu: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path
        d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"
        strokeLinecap="round"
      />
    </svg>
  ),
  route: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12" />
    </svg>
  ),
  terminal: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  arrowRight: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-4 h-4"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  activity: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-5 h-5"
    >
      <polyline
        points="22 12 18 12 15 21 9 3 6 12 2 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// ── Products ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "alpha",
    label: "Sharpnr Alpha",
    sub: "Data Intelligence",
    icon: Icon.signal,
    status: "nominal",
    uptime: "99.97%",
  },
  {
    id: "relay",
    label: "Sharpnr Relay",
    sub: "Event Streaming",
    icon: Icon.zap,
    status: "nominal",
    uptime: "99.99%",
  },
  {
    id: "vault",
    label: "Sharpnr Vault",
    sub: "Secret Management",
    icon: Icon.shield,
    status: "nominal",
    uptime: "100%",
  },
  {
    id: "grid",
    label: "Sharpnr Grid",
    sub: "Compute Distribution",
    icon: Icon.cpu,
    status: "degraded",
    uptime: "98.31%",
  },
  {
    id: "router",
    label: "Sharpnr Router",
    sub: "Traffic Orchestration",
    icon: Icon.route,
    status: "nominal",
    uptime: "99.95%",
  },
  {
    id: "console",
    label: "Sharpnr Console",
    sub: "Developer Interface",
    icon: Icon.terminal,
    status: "nominal",
    uptime: "99.88%",
  },
];

const STATUS_COLOR: Record<string, string> = {
  nominal: "hsl(var(--primary))",
  degraded: "hsl(var(--destructive))",
  offline: "hsl(var(--muted-foreground))",
};

// ── Reusable Animated Pulse Dot ─────────────────────────────────────────────
function PulseDot({ status }: { status: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: STATUS_COLOR[status] }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ backgroundColor: STATUS_COLOR[status] }}
      />
    </span>
  );
}

// ── Animated scanline grid background ──────────────────────────────────────
function GridBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Moving scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary)/0.3), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ── Corner bracket decoration ───────────────────────────────────────────────
function CornerBrackets({ className = "" }: { className?: string }) {
  const s = "absolute w-3 h-3 border-[hsl(var(--border))]";
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <span className={`${s} top-0 left-0 border-t border-l`} />
      <span className={`${s} top-0 right-0 border-t border-r`} />
      <span className={`${s} bottom-0 left-0 border-b border-l`} />
      <span className={`${s} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

// ── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ▌
        </motion.span>
      )}
    </span>
  );
}

// ── Product Card ────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      <div
        className="relative border border-border bg-card/50 backdrop-blur-sm p-5 overflow-hidden transition-all duration-300"
        style={{
          boxShadow: hovered
            ? "0 0 0 1px hsl(var(--primary)/0.4), inset 0 0 24px hsl(var(--primary)/0.04)"
            : "none",
        }}
      >
        <CornerBrackets />

        {/* Background glow on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)/0.07), transparent 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
              {product.icon}
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                {product.sub}
              </p>
            </div>
          </div>
          <PulseDot status={product.status} />
        </div>

        <h3 className="font-semibold text-foreground text-sm tracking-tight mb-3">
          {product.label}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-muted-foreground">
              UPTIME
            </span>
            <span className="text-xs font-mono text-foreground font-medium">
              {product.uptime}
            </span>
          </div>
          <motion.div
            className="text-muted-foreground group-hover:text-primary transition-colors"
            animate={hovered ? { x: 3 } : { x: 0 }}
          >
            {Icon.arrowRight}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: "hsl(var(--primary))" }}
          initial={{ width: "0%" }}
          animate={hovered ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ── Stats ticker ────────────────────────────────────────────────────────────
function StatBar() {
  const stats = [
    { label: "Services Online", value: "6/6" },
    { label: "Avg Latency", value: "4ms" },
    { label: "Events / sec", value: "142k" },
    { label: "Regions", value: "9" },
    { label: "API Calls Today", value: "2.1B" },
  ];

  return (
    <motion.div
      className="border-b border-border/60 bg-muted/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-8 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <PulseDot status="nominal" />
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            ALL SYSTEMS
          </span>
        </div>
        <div className="w-px h-4 bg-border shrink-0" />
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-muted-foreground">
              {s.label}
            </span>
            <span className="text-xs font-mono text-foreground font-semibold">
              {s.value}
            </span>
            {i < stats.length - 1 && (
              <span className="text-border ml-2">·</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Feature row ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Icon.grid,
    title: "Unified Control Surface",
    body: "One interface to observe, configure, and command every Sharpnr service. Context switches eliminated. Cognitive load reduced.",
  },
  {
    icon: Icon.zap,
    title: "Real-Time Event Bus",
    body: "Cross-product events flow through a shared fabric. React to system state changes in under 5 ms across all products simultaneously.",
  },
  {
    icon: Icon.activity,
    title: "Telemetry Fusion",
    body: "Metrics, traces, and logs from all services correlated into a single timeline. Root-cause in seconds, not hours.",
  },
];

function FeatureRow() {
  return (
    <div className="grid md:grid-cols-3 gap-px bg-border">
      {FEATURES.map((f, i) => (
        <motion.div
          key={i}
          className="bg-background p-8 relative group"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="text-muted-foreground group-hover:text-primary transition-colors mb-4">
            {f.icon}
          </div>
          <h4 className="font-semibold text-foreground mb-2 text-sm">
            {f.title}
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {f.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Orbit visualizer (hero decoration) ─────────────────────────────────────
function OrbitRing({
  radius,
  duration,
  offset = 0,
}: {
  radius: number;
  duration: number;
  offset?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border border-border/30"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: `calc(50% - ${radius}px)`,
        left: `calc(50% - ${radius}px)`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay: offset }}
    >
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
        style={{ top: -3, left: "50%", transform: "translateX(-50%)" }}
      />
    </motion.div>
  );
}

// ── Main Landing ────────────────────────────────────────────────────────────
export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const nav = useNavigate();

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden"
    >
      {/* ── Nav ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-7 h-7 border border-primary/60 text-primary">
              {Icon.hexagon}
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-foreground">
                SHARPNR
              </span>
              <span className="text-muted-foreground text-sm">
                {" "}
                / ORCHESTRATOR
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {["Products", "Architecture", "Changelog", "Docs"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </nav>
          <motion.button
            className="text-xs font-mono border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors relative overflow-hidden group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">LAUNCH CONSOLE →</span>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Status bar ── */}
      <div className="pt-14">
        <StatBar />
      </div>

      {/* ── Hero ── */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <GridBackground />

        {/* Radial gradient backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, hsl(var(--primary)/0.06), transparent)",
          }}
        />

        {/* Orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <OrbitRing radius={120} duration={22} />
          <OrbitRing radius={180} duration={34} offset={1} />
          <OrbitRing radius={240} duration={52} offset={2} />
        </div>

        {/* Center icon */}
        <motion.div
          className="relative mb-10 flex items-center justify-center w-16 h-16 border border-primary/50 text-primary bg-background"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-primary/20"
            style={{ borderStyle: "dashed" }}
          />
          {Icon.hexagon}
        </motion.div>

        {/* Headline */}
        <div className="relative text-center px-6 max-w-3xl">
          <motion.p
            className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Sharpnr Headquarters
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            The Orchestrator
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            One command plane. Every Sharpnr product, policy, and signal—unified
            under a single pane of glass built for operators who move fast.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <motion.button
              className="relative border border-primary/60 bg-primary/10 text-primary font-mono text-xs px-6 py-3 tracking-widest uppercase overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                nav({
                  to: "/home",
                })
              }
            >
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative">Enter Control Panel</span>
            </motion.button>
            <button className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors px-6 py-3 border border-transparent hover:border-border">
              View Architecture →
            </button>
          </motion.div>
        </div>

        {/* Scroll nudge */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-xs font-mono text-muted-foreground/50 tracking-widest">
            SCROLL
          </span>
          <motion.div
            className="w-px h-8 bg-border"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.section>

      {/* ── Terminal banner ── */}
      <div className="border-y border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3 font-mono text-sm">
            <span className="text-muted-foreground/50 select-none">$</span>
            <span className="text-muted-foreground">
              <Typewriter
                text="sharpnr orchestrate --connect-all --region=global --watch"
                delay={300}
              />
            </span>
          </div>
        </div>
      </div>

      {/* ── Products grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="mb-12 flex items-end justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
              Connected Services
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Your product fleet
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <PulseDot status="nominal" />
            <span>5 nominal · 1 degraded</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── Feature strip ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
            Why Orchestrator
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Built for the whole stack
          </h2>
        </motion.div>
        <FeatureRow />
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-24 text-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 50% 100%, hsl(var(--primary)/0.06), transparent)",
            }}
          />
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4">
            Ready to deploy
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Command everything.
            <br />
            From one place.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            Orchestrator is your HQ. Ship with confidence knowing every Sharpnr
            product is under your control.
          </p>
          <motion.button
            className="relative border border-primary/60 bg-primary/10 text-primary font-mono text-xs px-8 py-4 tracking-widest uppercase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Access →
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-5 h-5 text-primary">{Icon.hexagon}</div>
            <span className="font-bold text-xs tracking-tight text-foreground">
              SHARPNR
            </span>
            <span className="text-xs text-muted-foreground">© 2025</span>
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            ORCHESTRATOR v1.0.0 · build 3a7f92c
          </p>
        </div>
      </footer>

      {/* DM Serif Display font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        .scrollbar-none { scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
