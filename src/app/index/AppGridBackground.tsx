"use client";
import { useRef, useEffect } from "react";
import { APPS } from "./heroApps";

const SZ   = 90;
const GAP  = 2;
const STEP = SZ + GAP;
const HOVER_R = 140;

type Cell = {
  c: number;
  r: number;
  app: (typeof APPS)[number];
};

export function AppGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const scroll    = useRef(0);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const cv  = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;

    let W = 0, H = 0, cols = 0, rows = 0, grid: Cell[] = [];
    let lastT = 0;

    function resize() {
      const parent = cv!.parentElement!;
      W = parent.clientWidth;
      H = parent.clientHeight;
      cv!.width  = Math.round(W * devicePixelRatio);
      cv!.height = Math.round(H * devicePixelRatio);
      cv!.style.width  = W + "px";
      cv!.style.height = H + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
      cols = Math.ceil(W / STEP) + 2;
      rows = Math.ceil(H / STEP) + 3;
      grid = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          grid.push({ c, r, app: APPS[(r * cols + c) % APPS.length] });
    }

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

    function drawIcon(d: string, cx: number, cy: number, size: number, alpha: number, color: string) {
      const scale = size / 24;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-12, -12);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.8 / scale;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      d.split(" M").forEach((seg, i) => {
        ctx.stroke(new Path2D((i === 0 ? "" : " M") + seg));
      });
      ctx.restore();
    }

    function draw(ts: number) {
      const dt = Math.min(ts - lastT, 50);
      lastT = ts;
      scroll.current = (scroll.current + dt * 0.018) % STEP;

      ctx.clearRect(0, 0, W, H);

      for (const cell of grid) {
        const x = cell.c * STEP - (scroll.current % STEP);
        const y = cell.r * STEP - scroll.current;
        if (x > W + STEP || x + STEP < -STEP || y > H + STEP || y + STEP < -STEP) continue;

        const cx   = x + SZ / 2;
        const cy   = y + SZ / 2;
        const dx   = mouse.current.x - cx;
        const dy   = mouse.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - dist / HOVER_R);
        const t    = prox * prox * (3 - 2 * prox); // smoothstep

        const col = cell.app.color;

        // fill
        ctx.save();
        ctx.globalAlpha = 0.03 + t * 0.38;
        ctx.fillStyle   = col;
        rr(x + GAP, y + GAP, SZ - GAP, SZ - GAP, 8);
        ctx.fill();
        ctx.restore();

        // border
        ctx.save();
        ctx.globalAlpha  = 0.06 + t * 0.35;
        ctx.strokeStyle  = col;
        ctx.lineWidth    = 0.75;
        rr(x + GAP, y + GAP, SZ - GAP, SZ - GAP, 8);
        ctx.stroke();
        ctx.restore();

        // icon
        drawIcon(
          cell.app.icon,
          cx,
          cy - (t > 0.2 ? 12 : 0),
          20 + t * 4,
          0.1 + t * 0.75,
          t > 0.1 ? col : "#94a3b8"
        );

        // label on hover
        if (t > 0.08) {
          ctx.save();
          ctx.globalAlpha  = Math.max(0, (t - 0.08) / 0.5);
          ctx.fillStyle    = "#e2e8f0";
          ctx.font         = "500 9px sans-serif";
          ctx.textAlign    = "center";
          ctx.textBaseline = "top";
          const label = cell.app.short.length > 11
            ? cell.app.short.slice(0, 10) + "…"
            : cell.app.short;
          ctx.fillText(label, cx, cy + 6);
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const r = cv!.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function onMouseLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }
    function onResize() {
      cancelAnimationFrame(rafRef.current);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
      rafRef.current = requestAnimationFrame(draw);
    }

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
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
