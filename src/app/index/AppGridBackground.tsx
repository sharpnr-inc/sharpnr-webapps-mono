"use client";

import { useRef, useEffect } from "react";
import { APPS } from "./heroApps";

const BASE = 80;
const GAP = 10;
const UNIT = BASE + GAP;
const HOVER_R = 160;
const SCROLL_SPEED = 0.012;

type Cell = {
  baseX: number;
  baseY: number;
  w: number;
  h: number;
  app: (typeof APPS)[number];
};

// Bento pattern inside a 4×3 grid block
const PATTERN: { cx: number; cy: number; cw: number; ch: number }[] = [
  { cx: 0, cy: 0, cw: 2, ch: 2 }, // large square
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
    const ctx = cv.getContext("2d")!;

    let W = 0,
      H = 0,
      cells: Cell[] = [],
      lastT = 0;

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
      ctx.lineWidth = 1.6 / s;
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

      ctx.clearRect(0, 0, W, H);

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
        const t = prox * prox * (3 - 2 * prox); // smoothstep

        const col = cell.app.color;
        const isBig = cell.w > UNIT;
        const rad = isBig ? 12 : 8;

        // fill — barely visible at rest
        ctx.save();
        ctx.globalAlpha = 0.01 + t * 0.22;
        ctx.fillStyle = col;
        rr(x, y, cell.w, cell.h, rad);
        ctx.fill();
        ctx.restore();

        // border
        ctx.save();
        ctx.globalAlpha = 0.05 + t * 0.18;
        ctx.strokeStyle = col;
        ctx.lineWidth = 0.5;
        rr(x, y, cell.w, cell.h, rad);
        ctx.stroke();
        ctx.restore();

        // icon
        const iconSz = isBig ? 20 + t * 8 : 14 + t * 5;
        const iconY = t > 0.15 && isBig ? cy - 14 : cy;
        drawIcon(
          cell.app.icon,
          cx,
          iconY,
          iconSz,
          0.07 + t * 0.6,
          t > 0.08 ? col : "#475569",
        );

        // label — fades in on hover
        if (t > 0.06) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, (t - 0.06) / 0.45);
          ctx.fillStyle = "#94a3b8";
          ctx.font = `${isBig ? "500 10px" : "400 8.5px"} sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const label =
            cell.app.short.length > 12
              ? cell.app.short.slice(0, 11) + "…"
              : cell.app.short;
          ctx.fillText(label, cx, isBig && t > 0.15 ? cy + 2 : cy + 8);
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
