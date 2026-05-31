import { useRef, useEffect } from "react";
import { APPS } from "./heroApps";

// ─── Layout constants ────────────────────────────────────────────────────────
const BASE = 88;
const GAP = 14;
const UNIT = BASE + GAP;
const HOVER_R = 200; // reveal radius
const SCROLL_SPEED = 0.004; // very slow diagonal drift

// ─── Bento pattern (4-col × 3-row tile) ─────────────────────────────────────
const PATTERN: { cx: number; cy: number; cw: number; ch: number }[] = [
  { cx: 0, cy: 0, cw: 2, ch: 2 }, // large 2×2
  { cx: 2, cy: 0, cw: 1, ch: 1 },
  { cx: 3, cy: 0, cw: 1, ch: 1 },
  { cx: 2, cy: 1, cw: 2, ch: 1 },
  { cx: 0, cy: 2, cw: 1, ch: 1 },
  { cx: 1, cy: 2, cw: 1, ch: 1 },
  { cx: 2, cy: 2, cw: 1, ch: 1 },
  { cx: 3, cy: 2, cw: 1, ch: 1 },
];
const PW = 4;
const PH = 3;

// ─── Cell type ───────────────────────────────────────────────────────────────
type Cell = {
  baseX: number;
  baseY: number;
  w: number;
  h: number;
  app: (typeof APPS)[number];
  imgKey: string; // slug for simple-icons CDN
};

// ─── Shimmer line type ───────────────────────────────────────────────────────
type Shimmer = {
  x: number;
  y: number;
  dir: "h" | "v";
  speed: number;
  len: number;
  alpha: number;
  color: string;
};

// ─── Icon slug derivation ─────────────────────────────────────────────────────
// APPS entries have a `name` like "Sharp-Hospitality". We strip "Sharp-" and
// map the remainder to the correct simple-icons slug (all lowercase, no spaces).
// Entries not in this map fall back to: strip "Sharp-", lowercase, remove spaces.
const SLUG_MAP: Record<string, string> = {
  hospitality: "airbnb",
  flights: "googleflights",
  hotels: "booking-com", // simple-icons slug
  food: "ubereats",
  grocery: "instacart",
  rides: "uber",
  bus: "busbud",
  payments: "stripe",
  wallet: "paypal",
  shopping: "shopify",
  deals: "amazondotcom",
  services: "thumbtack",
  home: "homedepot",
};

function deriveSlug(name: string): string {
  // Strip "Sharp-" prefix, lowercase, remove spaces & hyphens
  const key = name
    .replace(/^Sharp-/i, "")
    .toLowerCase()
    .replace(/[\s-]+/g, "");
  return SLUG_MAP[key] ?? key;
}

// ─── Simple-icons CDN helper ─────────────────────────────────────────────────
// Cache loaded Image objects at module level so they survive React re-renders.
const imgCache = new Map<string, HTMLImageElement | "loading" | "error">();
// Offscreen canvas pool — one per icon size to avoid per-frame allocation
const offscreenPool = new Map<number, HTMLCanvasElement>();

function getOffscreen(size: number): HTMLCanvasElement {
  if (!offscreenPool.has(size)) {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    offscreenPool.set(size, c);
  }
  return offscreenPool.get(size)!;
}

function loadIcon(slug: string): HTMLImageElement | null {
  const cached = imgCache.get(slug);
  if (cached === "loading" || cached === "error") return null;
  if (cached instanceof HTMLImageElement) return cached;

  imgCache.set(slug, "loading");
  const img = new Image();
  // simple-icons via jsDelivr — on the CDN allowlist
  img.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
  img.onload = () => imgCache.set(slug, img);
  img.onerror = () => imgCache.set(slug, "error");
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AppGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const scroll = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true })!;

    let W = 0,
      H = 0;
    let cells: Cell[] = [];
    let lastT = 0;
    const shimmers: Shimmer[] = [];

    // ── Build grid ─────────────────────────────────────────────────────────
    function buildBento() {
      cells = [];
      const tilesX = Math.ceil(W / (PW * UNIT)) + 2;
      const tilesY = Math.ceil(H / (PH * UNIT)) + 2;
      let appIdx = 0;
      for (let ty = 0; ty < tilesY; ty++) {
        for (let tx = 0; tx < tilesX; tx++) {
          for (const p of PATTERN) {
            const app = APPS[appIdx % APPS.length];
            cells.push({
              baseX: (tx * PW + p.cx) * UNIT - UNIT,
              baseY: (ty * PH + p.cy) * UNIT - UNIT,
              w: p.cw * UNIT - GAP,
              h: p.ch * UNIT - GAP,
              app,
              imgKey: deriveSlug(app.name),
            });
            appIdx++;
          }
        }
      }
    }

    // ── Shimmer creation ───────────────────────────────────────────────────
    function spawnShimmer() {
      if (shimmers.length > 6) return;
      const isH = Math.random() > 0.5;
      const app = APPS[Math.floor(Math.random() * APPS.length)];
      shimmers.push({
        x: isH ? -160 : Math.random() * W,
        y: isH ? Math.random() * H : -160,
        dir: isH ? "h" : "v",
        speed: 0.5 + Math.random() * 0.7,
        len: 140 + Math.random() * 160,
        alpha: 0.06 + Math.random() * 0.06,
        color: app.color,
      });
    }

    // ── Resize handler ─────────────────────────────────────────────────────
    function resize() {
      const parent = cv!.parentElement!;
      W = parent.clientWidth;
      H = parent.clientHeight;
      cv!.width = Math.round(W * devicePixelRatio);
      cv!.height = Math.round(H * devicePixelRatio);
      cv!.style.width = W + "px";
      cv!.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
      buildBento();
    }

    // ── Rounded rect helper ─────────────────────────────────────────────────
    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    // ── Main draw loop ──────────────────────────────────────────────────────
    function draw(ts: number) {
      const dt = Math.min(ts - lastT, 50);
      lastT = ts;
      // Diagonal drift: shift both x and y together for a gentle parallax feel
      scroll.current = (scroll.current + dt * SCROLL_SPEED) % UNIT;

      if (Math.random() < 0.008) spawnShimmer();

      ctx.clearRect(0, 0, W, H);

      // ── 1. Ghost dot lattice (barely visible) ────────────────────────────
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = "#94a3b8";
      for (let gx = 20; gx < W; gx += 44) {
        for (let gy = 20; gy < H; gy += 44) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.65, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // ── 2. Shimmer streaks ────────────────────────────────────────────────
      for (let i = shimmers.length - 1; i >= 0; i--) {
        const s = shimmers[i];
        ctx.save();

        if (s.dir === "h") {
          s.x += s.speed;
          const grad = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.5, s.color + "28");
          grad.addColorStop(1, "transparent");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s.x - s.len, s.y);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        } else {
          s.y += s.speed;
          const grad = ctx.createLinearGradient(s.x, s.y - s.len, s.x, s.y);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.5, s.color + "28");
          grad.addColorStop(1, "transparent");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - s.len);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        }
        ctx.restore();

        if (s.x > W + 200 || s.y > H + 200) shimmers.splice(i, 1);
      }

      // ── 3. Bento cells ────────────────────────────────────────────────────
      for (const cell of cells) {
        // Diagonal scroll: shift x and y by same amount for uniform drift
        const ox = scroll.current;
        const oy = scroll.current;
        const x = cell.baseX - ox;
        const y = cell.baseY - oy;

        // Cull off-screen
        if (
          x > W + 200 ||
          x + cell.w < -200 ||
          y > H + 200 ||
          y + cell.h < -200
        )
          continue;

        const cx = x + cell.w / 2;
        const cy = y + cell.h / 2;
        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Smooth easing: 0 when outside radius, 1 at center
        const raw = Math.max(0, 1 - dist / HOVER_R);
        const t = raw * raw * (3 - 2 * raw); // smoothstep

        // Nothing to draw when not hovered
        if (t < 0.01) continue;

        const col = cell.app.color;
        const isBig = cell.w > UNIT;
        const rad = isBig ? 16 : 12;

        // ── Cell background fill ─────────────────────────────────────────
        ctx.save();
        rr(x, y, cell.w, cell.h, rad);
        ctx.globalAlpha = t * 0.07;
        ctx.fillStyle = col;
        ctx.fill();
        ctx.restore();

        // ── Cell border ──────────────────────────────────────────────────
        ctx.save();
        rr(x, y, cell.w, cell.h, rad);
        ctx.globalAlpha = t * 0.25;
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // ── Colored icon ─────────────────────────────────────────────────
        const img = loadIcon(cell.imgKey);
        const iconSz = isBig ? 28 : 20;
        // Shift icon up a bit when label is visible
        const iconY = isBig && t > 0.4 ? cy - 12 : cy;

        if (img && img.complete && img.naturalWidth > 0) {
          const half = iconSz / 2;
          // Use pooled offscreen canvas — avoids per-frame allocation
          const off = getOffscreen(iconSz * 2);
          const offCtx = off.getContext("2d")!;
          offCtx.clearRect(0, 0, iconSz * 2, iconSz * 2);
          offCtx.drawImage(img, 0, 0, iconSz * 2, iconSz * 2);
          // Tint with brand color using source-in composite
          offCtx.globalCompositeOperation = "source-in";
          offCtx.fillStyle = col;
          offCtx.fillRect(0, 0, iconSz * 2, iconSz * 2);
          offCtx.globalCompositeOperation = "source-over";

          ctx.save();
          ctx.globalAlpha = t * 0.9;
          ctx.drawImage(off, cx - half, iconY - half, iconSz, iconSz);
          ctx.restore();
        } else {
          // Fallback: draw a small colored dot while image loads / missing
          ctx.save();
          ctx.globalAlpha = t * 0.3;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(cx, iconY, iconSz * 0.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // ── Label ────────────────────────────────────────────────────────
        if (t > 0.35) {
          const labelAlpha = Math.min(1, (t - 0.35) * 3);
          ctx.save();
          ctx.globalAlpha = labelAlpha * 0.75;
          ctx.fillStyle = col;
          ctx.font = `500 ${isBig ? "11px" : "9.5px"} Inter, system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(cell.app.short, cx, iconY + iconSz / 2 + 6);
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    // ── Event handlers ──────────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      const r = cv!.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function onMouseLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }
    function onResize() {
      cancelAnimationFrame(rafRef.current);
      resize();
      rafRef.current = requestAnimationFrame(draw);
    }

    // ── Init ────────────────────────────────────────────────────────────────
    resize();
    rafRef.current = requestAnimationFrame(draw);

    const parent = cv.parentElement!;
    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}
