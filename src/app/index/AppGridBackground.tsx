import { useRef, useEffect } from "react";
import { heroSectionItems } from "./Herosection_apps";

// ── Per-app accent palette (same order as heroSectionItems) ──────────────────
const PALETTE = [
  "#f59e0b", // amber     – Hospitality
  "#60a5fa", // blue      – Accounting
  "#f87171", // red       – Healthcare
  "#22d3ee", // cyan      – Silo
  "#c084fc", // violet    – Folio
  "#fb923c", // orange    – IAM
  "#4ade80", // green     – HRMS
  "#818cf8", // indigo    – Cortex
  "#facc15", // yellow    – Marketplace
  "#f472b6", // pink      – Marketing
  "#38bdf8", // sky       – Orchestrator
  "#34d399", // emerald   – Cables
  "#fb7185", // rose      – Bar
  "#fdba74", // peach     – Kitchen
] as const;

// ── Grid geometry ─────────────────────────────────────────────────────────────
const SZ = 78; // cell size in px
const GAP = 14; // gap between cells
const STEP = SZ + GAP; // grid stride
const HOVER_R = 185; // mouse influence radius

// ── Types ─────────────────────────────────────────────────────────────────────
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Cell {
  c: number;
  r: number;
  idx: number; // maps to heroSectionItems index
  phase: number; // idle animation phase offset
}

// ── Component ─────────────────────────────────────────────────────────────────
export function AppGridBackground() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const hidRef = useRef<HTMLDivElement>(null);

  // All mutable state lives in refs — no re-renders triggered
  const mouse = useRef({ x: -9999, y: -9999 });
  const scroll = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const sparks = useRef<Spark[]>([]);
  const grid = useRef<Cell[]>([]);
  const sz = useRef({ W: 0, H: 0 });

  useEffect(() => {
    const cv = cvRef.current;
    const hid = hidRef.current;
    if (!cv || !hid) return;

    const ctx = cv.getContext("2d", { alpha: true })!;
    let lastT = 0;

    // ── Build the repeating cell grid ──────────────────────────────────────────
    function buildGrid() {
      const p = cv!.parentElement!;
      const W = p.clientWidth;
      const H = p.clientHeight;
      sz.current = { W, H };

      cv!.width = Math.round(W * devicePixelRatio);
      cv!.height = Math.round(H * devicePixelRatio);
      cv!.style.width = `${W}px`;
      cv!.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const cols = Math.ceil(W / STEP) + 4;
      const rows = Math.ceil(H / STEP) + 4;
      const N = heroSectionItems.length;
      grid.current = [];

      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          grid.current.push({
            c,
            r,
            idx: (r * cols + c) % N,
            phase: Math.random() * Math.PI * 2,
          });
    }

    // ── Extract Lucide SVGs from hidden DOM, colorise, load as Images ──────────
    function loadIcons(cb: () => void) {
      const svgEls = Array.from(hid!.querySelectorAll<SVGSVGElement>("svg"));
      if (!svgEls.length) {
        cb();
        return;
      }

      imgs.current = new Array(svgEls.length).fill(null);
      let loaded = 0;

      svgEls.forEach((svg, i) => {
        const color = PALETTE[i % PALETTE.length];

        // Deep-clone and stamp the accent colour
        const clone = svg.cloneNode(true) as SVGSVGElement;
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        clone.setAttribute("width", "24");
        clone.setAttribute("height", "24");

        for (const el of [
          clone as Element,
          ...Array.from(clone.querySelectorAll<Element>("*")),
        ]) {
          if (el.getAttribute("stroke") === "currentColor")
            el.setAttribute("stroke", color);
          if (el.getAttribute("fill") === "currentColor")
            el.setAttribute("fill", color);
        }

        const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
          URL.revokeObjectURL(url);
          imgs.current[i] = img;
          if (++loaded === svgEls.length) cb();
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          if (++loaded === svgEls.length) cb();
        };
        img.src = url;
      });
    }

    // ── Rounded-rect path helper ────────────────────────────────────────────────
    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    // ── Spawn a glowing spark particle ─────────────────────────────────────────
    function spawnSpark(cx: number, cy: number, color: string) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 1.4;
      sparks.current.push({
        x: cx + (Math.random() - 0.5) * 18,
        y: cy + (Math.random() - 0.5) * 18,
        vx: Math.cos(angle) * speed * 0.4,
        vy: Math.sin(angle) * speed - 1.3,
        life: 1,
        maxLife: 40 + Math.random() * 30,
        color,
      });
      if (sparks.current.length > 260) sparks.current.splice(0, 80);
    }

    // ── Main draw loop ──────────────────────────────────────────────────────────
    function draw(ts: number) {
      const dt = Math.min(ts - lastT, 50);
      lastT = ts;

      const { W, H } = sz.current;

      // Diagonal drift
      scroll.current.x += dt * 0.011;
      scroll.current.y += dt * 0.016;

      const offX = scroll.current.x % STEP;
      const offY = scroll.current.y % STEP;
      const now = ts * 0.001;
      const mouseX = mouse.current.x;
      const mouseY = mouse.current.y;

      ctx.clearRect(0, 0, W, H);

      // Soft ambient radial glow tracking the mouse
      if (mouseX > -100) {
        const g = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          HOVER_R * 1.8,
        );
        g.addColorStop(0, "rgba(255,255,255,0.013)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Cells ────────────────────────────────────────────────────────────────
      for (const cell of grid.current) {
        const x = cell.c * STEP - offX;
        const y = cell.r * STEP - offY;

        // Cull off-screen cells
        if (x > W + STEP || x + SZ < 0 || y > H + STEP || y + SZ < 0) continue;

        const cx = x + SZ / 2;
        const cy = y + SZ / 2;
        const dist = Math.hypot(mouseX - cx, mouseY - cy);
        const prox = Math.max(0, 1 - dist / HOVER_R);
        const t = prox * prox * (3 - 2 * prox); // smoothstep ease
        const color = PALETTE[cell.idx % PALETTE.length];

        // Slow per-cell breathing
        const idle = (Math.sin(now * 1.3 + cell.phase) * 0.5 + 0.5) * 0.044;

        // Diagonal shimmer wave that sweeps across the grid
        const wRaw = Math.sin(now * 0.33 + (cx + cy) / (STEP * 7));
        const wave = Math.pow(Math.max(0, wRaw), 10) * 0.12;

        const glow = Math.max(t, wave, idle);

        // ─ Fill + baseline border (single save block)
        ctx.save();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.03 + glow * 0.36;
        rr(x + 2, y + 2, SZ - 4, SZ - 4, 10);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 0.7;
        ctx.globalAlpha = 0.06 + idle * 0.55 + wave * 0.35;
        rr(x + 2, y + 2, SZ - 4, SZ - 4, 10);
        ctx.stroke();
        ctx.restore();

        // ─ Hover glow ring with shadow bloom
        if (t > 0.04) {
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1 + t * 0.9;
          ctx.globalAlpha = t * 0.72;
          ctx.shadowBlur = 18 * t;
          ctx.shadowColor = color;
          rr(x + 2, y + 2, SZ - 4, SZ - 4, 10);
          ctx.stroke();
          ctx.restore();
        }

        // ─ Icon image (drawn with lift + optional shadow bloom)
        const img = imgs.current[cell.idx];
        if (img) {
          const lift = 9 * t;
          const iSz = 24 + t * 8;
          const iAlpha = Math.min(0.92, 0.1 + idle * 4 + wave * 2.5 + t * 0.82);

          ctx.save();
          ctx.globalAlpha = iAlpha;
          if (t > 0.06) {
            ctx.shadowBlur = 20 * t;
            ctx.shadowColor = color;
          }
          ctx.drawImage(img, cx - iSz / 2, cy - iSz / 2 - 2 - lift, iSz, iSz);
          ctx.restore();
        }

        // ─ Label revealed on hover
        if (t > 0.1) {
          const la = Math.min(1, (t - 0.1) / 0.28);
          const lift = 9 * t;
          let label = heroSectionItems[cell.idx].title.replace("Sharp-", "");
          if (label.length > 12) label = label.slice(0, 11) + "…";

          ctx.save();
          ctx.globalAlpha = la * 0.9;
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "600 8px system-ui,sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.shadowBlur = 10;
          ctx.shadowColor = color;
          ctx.fillText(label, cx, cy + 14 - lift * 0.3);
          ctx.restore();
        }

        // ─ Burst sparks on deep hover
        if (t > 0.65 && Math.random() < 0.07) spawnSpark(cx, cy, color);
      }

      // ── Spark particle tick ───────────────────────────────────────────────────
      const alive: Spark[] = [];
      for (const sp of sparks.current) {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.028; // gentle gravity
        sp.life -= 1 / sp.maxLife;
        if (sp.life <= 0) continue;
        alive.push(sp);

        ctx.save();
        ctx.globalAlpha = sp.life * 0.8;
        ctx.fillStyle = sp.color;
        ctx.shadowBlur = 6 * sp.life;
        ctx.shadowColor = sp.color;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 1.4 * sp.life + 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      sparks.current = alive;

      raf.current = requestAnimationFrame(draw);
    }

    // ── Event listeners ────────────────────────────────────────────────────────
    const parent = cv.parentElement!;

    const onMouseMove = (e: MouseEvent) => {
      const r = cv!.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const r = cv!.getBoundingClientRect();
      mouse.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    const onResize = () => {
      cancelAnimationFrame(raf.current);
      buildGrid();
      raf.current = requestAnimationFrame(draw);
    };

    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);
    parent.addEventListener("touchmove", onTouchMove, { passive: true });
    parent.addEventListener("touchend", onMouseLeave);
    window.addEventListener("resize", onResize);

    // ── Init: build grid → load icons → start loop ─────────────────────────────
    buildGrid();

    let started = false;
    const start = () => {
      if (!started) {
        started = true;
        raf.current = requestAnimationFrame(draw);
      }
    };
    loadIcons(start);
    setTimeout(start, 500); // fallback if SVG serialisation is slow

    return () => {
      cancelAnimationFrame(raf.current);
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
      parent.removeEventListener("touchmove", onTouchMove);
      parent.removeEventListener("touchend", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Transparent canvas — sits on top of whatever background the parent has */}
      <canvas
        ref={cvRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/*
       * Hidden render sink — React outputs Lucide SVGs here so we can
       * clone + serialise them into coloured Blob images for the canvas.
       * `display:none` keeps them out of layout/paint while still in the DOM.
       */}
      <div ref={hidRef} aria-hidden="true" style={{ display: "none" }}>
        {heroSectionItems.map((item, i) => {
          const Icon = item.logo;
          return <Icon key={i} size={24} strokeWidth={1.5} />;
        })}
      </div>
    </>
  );
}
