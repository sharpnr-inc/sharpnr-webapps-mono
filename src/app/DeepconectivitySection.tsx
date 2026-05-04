"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  Users,
  BarChart3,
  Zap,
  LayoutDashboard,
  MessageSquare,
  FileText,
  HardDrive,
  ShoppingBag,
  Fingerprint,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Product {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  colorClass: string;
  rgb: [number, number, number];
  description: string;
}

interface CanvasNode {
  x: number;
  y: number;
  angle: number;
  r: number;
  pulse: number;
}

interface Particle {
  from: number;
  to: number;
  t: number;
  speed: number;
  dead: boolean;
  color: [number, number, number];
  size: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
  label: string;
}

/* ─────────────────────────────────────────────
   Product data (with RGB for canvas drawing)
───────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: "hr",
    name: "Sharp-HR",
    tagline: "Your people, fully managed.",
    icon: Users,
    colorClass: "text-blue-400",
    rgb: [96, 165, 250],
    description:
      "The people operations backbone. Payroll, recruitment, and lifecycle management in one place.",
  },
  {
    id: "marketing",
    name: "Sharp-Marketing",
    tagline: "Campaigns that connect.",
    icon: BarChart3,
    colorClass: "text-pink-400",
    rgb: [244, 114, 182],
    description:
      "Growth engine for modern teams. Multi-channel campaigns and CRM that actually works.",
  },
  {
    id: "accounting",
    name: "Sharp-Accounting",
    tagline: "The numbers, always right.",
    icon: Zap,
    colorClass: "text-emerald-400",
    rgb: [52, 211, 153],
    description:
      "Financial operating system. Bookkeeping, invoicing, and real-time reporting.",
  },
  {
    id: "orchestrator",
    name: "Sharp-Orchestrator",
    tagline: "Command everything.",
    icon: LayoutDashboard,
    colorClass: "text-violet-400",
    rgb: [167, 139, 250],
    description:
      "The mission control room. Monitor, configure, and govern your entire fleet of apps.",
  },
  {
    id: "cable",
    name: "Sharp-Cable",
    tagline: "Your team, always connected.",
    icon: MessageSquare,
    colorClass: "text-orange-400",
    rgb: [251, 146, 60],
    description:
      "Real-time communication layer. Deeply wired into your HR and project data.",
  },
  {
    id: "folio",
    name: "Sharp-Folio",
    tagline: "Write together. Think together.",
    icon: FileText,
    colorClass: "text-cyan-400",
    rgb: [34, 211, 238],
    description:
      "Collaborative document editor with live data embeds from across the platform.",
  },
  {
    id: "silo",
    name: "Sharp-Silo",
    tagline: "Every file. Always there.",
    icon: HardDrive,
    colorClass: "text-slate-400",
    rgb: [148, 163, 184],
    description:
      "Secure, centralized file storage layer for the entire ecosystem.",
  },
  {
    id: "marketplace",
    name: "Sharp-Marketplace",
    tagline: "Extend Sharpnr. Your way.",
    icon: ShoppingBag,
    colorClass: "text-yellow-400",
    rgb: [250, 204, 21],
    description:
      "The ecosystem extension layer. Discover and install third-party integrations.",
  },
  {
    id: "iam",
    name: "SharpIAM",
    tagline: "One identity. Every door.",
    icon: Fingerprint,
    colorClass: "text-red-400",
    rgb: [248, 113, 113],
    description:
      "Identity and access management backbone. Single sign-on for every product.",
  },
];

/* Directed edges: [fromIdx, toIdx, eventLabel] */
const EDGES: [number, number, string][] = [
  [0, 8, "provision"], // HR → IAM
  [0, 2, "payroll"], // HR → Accounting
  [0, 4, "notify"], // HR → Cable
  [0, 5, "docs"], // HR → Folio
  [8, 0, "auth"], // IAM → HR
  [8, 3, "access"], // IAM → Orchestrator
  [8, 6, "token"], // IAM → Silo
  [2, 1, "revenue"], // Accounting → Marketing
  [2, 3, "report"], // Accounting → Orchestrator
  [1, 4, "campaign"], // Marketing → Cable
  [1, 7, "extend"], // Marketing → Marketplace
  [3, 2, "budget"], // Orchestrator → Accounting
  [3, 5, "publish"], // Orchestrator → Folio
  [4, 5, "thread"], // Cable → Folio
  [5, 6, "attach"], // Folio → Silo
  [6, 8, "secure"], // Silo → IAM
  [7, 3, "plugin"], // Marketplace → Orchestrator
  [7, 6, "asset"], // Marketplace → Silo
  [3, 4, "alert"], // Orchestrator → Cable
];

/* ─────────────────────────────────────────────
   Canvas particle helpers
───────────────────────────────────────────── */
function createParticle(
  fromIdx: number,
  toIdx: number,
  label: string,
  products: Product[],
): Particle {
  return {
    from: fromIdx,
    to: toIdx,
    label,
    t: 0,
    speed: 0.005 + Math.random() * 0.007,
    dead: false,
    color: [...products[fromIdx].rgb] as [number, number, number],
    size: 2.5 + Math.random() * 2,
    trail: [],
  };
}

function particlePos(
  p: Particle,
  t: number,
  canvasNodes: CanvasNode[],
): { x: number; y: number } {
  const a = canvasNodes[p.from];
  const b = canvasNodes[p.to];
  if (!a || !b) return { x: 0, y: 0 };
  const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.22;
  const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.22;
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * mx + t * t * b.x,
    y: u * u * a.y + 2 * u * t * my + t * t * b.y,
  };
}

/* ─────────────────────────────────────────────
   HUD counter component
───────────────────────────────────────────── */
function HUDCounter({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: color }}
      />
      <div>
        <div className="text-lg font-mono font-medium text-slate-100 leading-none">
          {value}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-0.5">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tooltip / detail card
───────────────────────────────────────────── */
function ProductCard({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  if (!product) return null;
  const Icon = product.icon;
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-72 pointer-events-auto"
    >
      <div className="bg-slate-900/95 border border-slate-700/60 rounded-2xl p-4 backdrop-blur-xl shadow-2xl">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700/50">
              <Icon size={16} className={product.colorClass} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100 leading-none">
                {product.name}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                {product.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-400 transition-colors mt-0.5 text-lg leading-none"
          >
            ×
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: `rgb(${product.rgb.join(",")})` }}
          />
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            Active · Syncing
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export function DeepConnectivitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  const canvasNodesRef = useRef<CanvasNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const activeNodeRef = useRef<number>(-1);
  const hoveredNodeRef = useRef<number>(-1);
  const lastSpawnRef = useRef<number>(0);
  const dimRef = useRef({ W: 0, H: 0, cx: 0, cy: 0, radius: 0 });

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [eventsPerSec, setEventsPerSec] = useState(34);
  const [latency, setLatency] = useState(11);
  const [isReady, setIsReady] = useState(false);

  /* GSAP entrance animation */
  useEffect(() => {
    if (!isInView || !sectionRef.current) return;
    const el = sectionRef.current;
    gsap.fromTo(
      el.querySelectorAll(".gsap-fade"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      },
    );
  }, [isInView]);

  /* HUD ticker */
  useEffect(() => {
    const id = setInterval(() => {
      setEventsPerSec(28 + Math.floor(Math.random() * 16));
      setLatency(9 + Math.floor(Math.random() * 8));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  /* Canvas resize + layout */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const W = wrap.clientWidth;
    const H = Math.min(W * 0.85, 680);
    canvas.width = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.36;
    dimRef.current = { W, H, cx, cy, radius };

    canvasNodesRef.current = PRODUCTS.map((_, i) => {
      const angle = (i / PRODUCTS.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        angle,
        r: Math.max(22, Math.min(W, H) * 0.046),
        pulse: Math.random() * Math.PI * 2,
      };
    });
    setIsReady(true);
  }, []);

  /* Main render loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function drawEdge(
      ctx: CanvasRenderingContext2D,
      ai: number,
      bi: number,
      active: boolean,
    ) {
      const {} = dimRef.current;
      const a = canvasNodesRef.current[ai];
      const b = canvasNodesRef.current[bi];
      if (!a || !b) return;
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.22;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.22;
      const hasActive = activeNodeRef.current >= 0;
      const alpha = active ? 0.2 : hasActive ? 0.035 : 0.07;
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(mx, my, b.x, b.y);
      ctx.strokeStyle = active
        ? `rgba(120,130,255,0.38)`
        : `rgba(148,163,184,${alpha})`;
      ctx.lineWidth = active ? 1.2 : 0.7;
      ctx.stroke();
      ctx.restore();
    }

    function drawNode(
      ctx: CanvasRenderingContext2D,
      n: CanvasNode,
      i: number,
      ts: number,
    ) {
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const p = PRODUCTS[i];
      const [r, g, b] = p.rgb;
      const isActive = activeNodeRef.current === i;
      const isHovered = hoveredNodeRef.current === i;
      const pulse = Math.sin(n.pulse + ts * 0.0018) * 0.5 + 0.5;

      /* Outer pulse ring */
      if (isActive || isHovered) {
        const ringR = n.r + 10 + pulse * 7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.15 + pulse * 0.08})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      /* Ambient glow */
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.6);
      glow.addColorStop(
        0,
        `rgba(${r},${g},${b},${0.1 + (isActive ? 0.12 : 0) + pulse * 0.04})`,
      );
      glow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      /* Circle bg */
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(8,18,36,0.92)";
      ctx.fill();

      /* Border */
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.strokeStyle = isActive
        ? `rgba(${r},${g},${b},0.9)`
        : isHovered
          ? `rgba(${r},${g},${b},0.6)`
          : `rgba(${r},${g},${b},0.28)`;
      ctx.lineWidth = isActive ? 1.8 : 1.1;
      ctx.stroke();

      /* Inner tint ring */
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r - 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${b},0.06)`;
      ctx.lineWidth = 5;
      ctx.stroke();

      /* Label */
      const labelOffset = n.r + 17;
      const lx = n.x + Math.cos(n.angle) * labelOffset;
      const ly = n.y + Math.sin(n.angle) * labelOffset;
      const fontSize = Math.max(9.5, n.r * 0.36);
      ctx.font = `500 ${fontSize}px 'Inter', system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle =
        isActive || isHovered ? "#f1f5f9" : `rgba(${r},${g},${b},0.65)`;
      ctx.fillText(p.name, lx, ly);

      ctx.restore();
    }

    function drawCenter(ctx: CanvasRenderingContext2D, ts: number) {
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const { cx, cy, radius } = dimRef.current;
      const pulse = Math.sin(ts * 0.0012) * 0.5 + 0.5;

      /* Dashed orbit rings */
      [0.45, 0.67, 0.84].forEach((s) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * s, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,0.04)`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 9]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      /* Hub */
      const hr = Math.min(dimRef.current.W, dimRef.current.H) * 0.055;
      const ghub = ctx.createRadialGradient(cx, cy, 0, cx, cy, hr * 2.2);
      ghub.addColorStop(0, `rgba(59,130,246,${0.15 + pulse * 0.07})`);
      ghub.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, hr * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = ghub;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, hr, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(8,18,36,0.96)";
      ctx.fill();
      ctx.strokeStyle = `rgba(59,130,246,${0.28 + pulse * 0.18})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const fs = Math.max(9, hr * 0.38);
      ctx.font = `600 ${fs}px 'Inter', system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(148,163,184,0.75)";
      ctx.fillText("SHARP", cx, cy - hr * 0.18);
      ctx.font = `300 ${Math.max(7.5, hr * 0.28)}px 'Inter', system-ui, sans-serif`;
      ctx.fillStyle = "rgba(99,149,220,0.5)";
      ctx.fillText("PLATFORM", cx, cy + hr * 0.28);

      ctx.restore();
    }

    function drawParticle(ctx: CanvasRenderingContext2D, part: Particle) {
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const [r, g, b] = part.color;

      /* Trail */
      part.trail.forEach((tp, ti) => {
        const tr = part.size * (ti / part.trail.length) * 0.65;
        if (tr < 0.5) return;
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${tp.alpha})`;
        ctx.fill();
      });

      /* Head */
      const { x, y } = particlePos(part, part.t, canvasNodesRef.current);
      ctx.beginPath();
      ctx.arc(x, y, part.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},1)`;
      ctx.fill();

      /* Glow */
      const pg = ctx.createRadialGradient(x, y, 0, x, y, part.size * 4.5);
      pg.addColorStop(0, `rgba(${r},${g},${b},0.38)`);
      pg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, part.size * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = pg;
      ctx.fill();

      ctx.restore();
    }

    function spawnParticle(ts: number) {
      if (ts - lastSpawnRef.current < 260 + Math.random() * 180) return;
      const hasActive = activeNodeRef.current >= 0;
      const pool = hasActive
        ? EDGES.filter(
            ([a, b]) =>
              a === activeNodeRef.current || b === activeNodeRef.current,
          )
        : EDGES;
      const [a, b, label] = pool[Math.floor(Math.random() * pool.length)];
      const flip = Math.random() < 0.25;
      particlesRef.current.push(
        createParticle(flip ? b : a, flip ? a : b, label, PRODUCTS),
      );
      lastSpawnRef.current = ts;
    }

    function loop(ts: number) {
      const { W, H } = dimRef.current;
      ctx.clearRect(0, 0, W * devicePixelRatio, H * devicePixelRatio);

      spawnParticle(ts);

      /* Edges */
      EDGES.forEach(([ai, bi]) => {
        const hi =
          activeNodeRef.current >= 0 &&
          (activeNodeRef.current === ai || activeNodeRef.current === bi);
        drawEdge(ctx, ai, bi, hi);
      });

      drawCenter(ctx, ts);

      /* Update + draw particles */
      particlesRef.current.forEach((p) => {
        const prev = particlePos(p, p.t, canvasNodesRef.current);
        p.trail.push({ ...prev, alpha: 1 });
        if (p.trail.length > 16) p.trail.shift();
        p.trail.forEach((tp, ti) => {
          tp.alpha = (ti / p.trail.length) * 0.45;
        });
        p.t += p.speed;
        if (p.t >= 1) p.dead = true;
        drawParticle(ctx, p);
      });
      particlesRef.current = particlesRef.current.filter((p) => !p.dead);

      /* Nodes */
      canvasNodesRef.current.forEach((n, i) => drawNode(ctx, n, i, ts));

      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  /* Hit detection */
  const getNodeAt = useCallback((mx: number, my: number): number => {
    for (let i = 0; i < canvasNodesRef.current.length; i++) {
      const n = canvasNodesRef.current[i];
      const dx = mx - n.x;
      const dy = my - n.y;
      if (dx * dx + dy * dy < (n.r + 14) * (n.r + 14)) return i;
    }
    return -1;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const sx = dimRef.current.W / rect.width;
      const sy = dimRef.current.H / rect.height;
      hoveredNodeRef.current = getNodeAt(
        (e.clientX - rect.left) * sx,
        (e.clientY - rect.top) * sy,
      );
      canvasRef.current!.style.cursor =
        hoveredNodeRef.current >= 0 ? "pointer" : "default";
    },
    [getNodeAt],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const sx = dimRef.current.W / rect.width;
      const sy = dimRef.current.H / rect.height;
      const hit = getNodeAt(
        (e.clientX - rect.left) * sx,
        (e.clientY - rect.top) * sy,
      );

      if (hit === activeNodeRef.current) {
        activeNodeRef.current = -1;
        setActiveProduct(null);
        return;
      }

      activeNodeRef.current = hit;
      setActiveProduct(hit >= 0 ? PRODUCTS[hit] : null);

      /* Burst particles from clicked node */
      if (hit >= 0) {
        const outEdges = EDGES.filter(([a, b]) => a === hit || b === hit);
        outEdges.forEach(([a, b, label]) => {
          particlesRef.current.push(
            createParticle(hit, a === hit ? b : a, label, PRODUCTS),
          );
        });
      }
    },
    [getNodeAt],
  );

  const handleMouseLeave = useCallback(() => {
    hoveredNodeRef.current = -1;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden bg-slate-950"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 55%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center px-6 mb-16 lg:mb-20">
        <motion.p
          className="gsap-fade font-mono text-[11px] tracking-[0.2em] uppercase text-blue-400/70 mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          Platform Infrastructure
        </motion.p>

        <motion.h2
          className="gsap-fade text-4xl lg:text-6xl xl:text-7xl font-light text-slate-50 tracking-tight leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Deep{" "}
          <span className="font-semibold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
            Connectivity.
          </span>
        </motion.h2>

        <motion.p
          className="gsap-fade text-slate-400 max-w-lg mx-auto leading-relaxed text-[15px] font-light"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.7 }}
        >
          Data flows freely between products. Hire in Sharp-HR and they're
          provisioned in SharpIAM — payroll flows to Sharp-Accounting
          automatically.
        </motion.p>
      </div>

      {/* Canvas */}
      <motion.div
        ref={wrapRef}
        className="relative z-10 w-full max-w-3xl mx-auto px-4 lg:px-8"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="w-full block"
        />

        {/* Product detail card */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          <AnimatePresence>
            {activeProduct && (
              <ProductCard
                product={activeProduct}
                onClose={() => {
                  activeNodeRef.current = -1;
                  setActiveProduct(null);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* HUD bar */}
      <motion.div
        className="relative z-10 mt-8 flex items-center justify-center gap-8 px-6 flex-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <HUDCounter
          value={`${eventsPerSec}`}
          label="Events / sec"
          color="rgb(96,165,250)"
        />
        <div className="w-px h-7 bg-slate-800" />
        <HUDCounter
          value={`${PRODUCTS.length}`}
          label="Live services"
          color="rgb(167,139,250)"
        />
        <div className="w-px h-7 bg-slate-800" />
        <HUDCounter value="99.99%" label="Uptime" color="rgb(52,211,153)" />
        <div className="w-px h-7 bg-slate-800" />
        <HUDCounter
          value={`${latency}ms`}
          label="Avg latency"
          color="rgb(251,146,60)"
        />
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="relative z-10 mt-4 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-slate-600">
          All systems operational · Click any service to inspect flow
        </span>
      </motion.div>
    </section>
  );
}
