"use client";

import { useRef, useEffect } from "react";
import { APPS } from "./heroApps";

const BASE = 90;
const GAP = 12;
const UNIT = BASE + GAP;
const HOVER_R = 180;
const SCROLL_SPEED = 0.006; // Significantly slowed down

type Cell = {
  baseX: number;
  baseY: number;
  w: number;
  h: number;
  app: (typeof APPS)[number];
};

type Pulse = {
  x: number;
  y: number;
  dir: "h" | "v";
  speed: number;
  len: number;
  color: string;
};

const PATTERN: { cx: number; cy: number; cw: number; ch: number }[] = [
  { cx: 0, cy: 0, cw: 2, ch: 2 },
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
      H = 0,
      cells: Cell[] = [],
      lastT = 0;
    const pulses: Pulse[] = [];

    function buildBento() {
      cells = [];
      const tilesX = Math.ceil(W / (PW * UNIT)) + 2;
      const tilesY = Math.ceil(H / (PH * UNIT)) + 2;
      let appIdx = 0;
      for (let ty = 0; ty < tilesY; ty++) {
        for (let tx = 0; tx < tilesX; tx++) {
          for (const p of PATTERN) {
            cells.push({
              baseX: (tx * PW + p.cx) * UNIT - UNIT,
              baseY: (ty * PH + p.cy) * UNIT - UNIT,
              w: p.cw * UNIT - GAP,
              h: p.ch * UNIT - GAP,
              app: APPS[appIdx % APPS.length],
            });
            appIdx++;
          }
        }
      }
    }

    function createPulse() {
      if (pulses.length > 8) return;
      const isH = Math.random() > 0.5;
      const app = APPS[Math.floor(Math.random() * APPS.length)];
      pulses.push({
        x: isH ? -100 : Math.random() * W,
        y: isH ? Math.random() * H : -100,
        dir: isH ? "h" : "v",
        speed: 0.6 + Math.random() * 0.8, // Slower pulses
        len: 120 + Math.random() * 180,
        color: app.color,
      });
    }

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

    function drawIcon(
      d: string,
      cx: number,
      cy: number,
      size: number,
      alpha: number,
      color: string,
    ) {
      const s = size / 24;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);
      ctx.translate(-12, -12);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8 / s;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      d.split(" M").forEach((seg, i) => {
        ctx.stroke(new Path2D((i === 0 ? "" : " M") + seg));
      });
      ctx.restore();
    }

    function draw(ts: number) {
      const dt = Math.min(ts - lastT, 50);
      lastT = ts;
      scroll.current = (scroll.current + dt * SCROLL_SPEED) % UNIT;

      if (Math.random() < 0.01) createPulse();

      ctx.clearRect(0, 0, W, H);

      // 1. Clean Dot Grid
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "#475569";
      for (let x = 20; x < W; x += 40) {
        for (let y = 20; y < H; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 2. Data Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (p.dir === "h") {
          p.x += p.speed;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.len, p.y);
        } else {
          p.y += p.speed;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y - p.len);
        }
        ctx.stroke();
        ctx.restore();
        if (p.x > W + 200 || p.y > H + 200) pulses.splice(i, 1);
      }

      // 3. Simple Cells
      for (const cell of cells) {
        const x = cell.baseX - (scroll.current % UNIT);
        const y = cell.baseY - scroll.current;

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
        const prox = Math.max(0, 1 - dist / HOVER_R);
        const t = prox * prox * (3 - 2 * prox);

        const col = cell.app.color;
        const isBig = cell.w > UNIT;
        const rad = 12;

        // Clean border on hover
        if (t > 0.05) {
          ctx.save();
          ctx.globalAlpha = t * 0.15;
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          rr(x, y, cell.w, cell.h, rad);
          ctx.stroke();

          ctx.globalAlpha = t * 0.03;
          ctx.fillStyle = col;
          ctx.fill();
          ctx.restore();
        }

        // Icon
        const iconSz = isBig ? 24 : 18;
        const iconY = isBig && t > 0.3 ? cy - 10 : cy;
        drawIcon(
          cell.app.icon,
          cx,
          iconY,
          iconSz,
          0.08 + t * 0.7,
          t > 0.1 ? col : "#64748b",
        );

        // Label
        if (t > 0.25) {
          ctx.save();
          ctx.globalAlpha = Math.min(1, (t - 0.25) * 2);
          ctx.fillStyle = "#94a3b8";
          ctx.font = `500 ${isBig ? "11px" : "9px"} Inter, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(cell.app.short, cx, iconY + iconSz / 2 + 8);
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const r = cv!.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      mouse.current = { x: mx, y: my };
    }
    function onMouseLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }
    function onResize() {
      cancelAnimationFrame(rafRef.current);
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
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}
