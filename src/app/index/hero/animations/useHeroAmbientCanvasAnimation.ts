import { useGSAP } from "@gsap/react";
import { gsap } from "@/configs/gsap";
import type { RefObject } from "react";

interface HeroAmbientCanvasAnimationRefs {
  wrapperRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

interface Mote {
  x: number;
  y: number;
  r: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
  accent: boolean;
}

/**
 * Ambient "data motes" drifting upward behind the hero — drawn on a
 * canvas, driven by gsap.ticker so it stays inside the GSAP world.
 */
export function useHeroAmbientCanvasAnimation(
  refs: HeroAmbientCanvasAnimationRefs,
) {
  const { wrapperRef, canvasRef } = refs;

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;
      if (!canvas || !wrapper) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Resolve palette from design tokens — canvas can't use var()
      const rootStyle = getComputedStyle(document.documentElement);
      const accentColor =
        rootStyle.getPropertyValue("--color-accent").trim() ||
        "oklch(0.68 0.13 230)";
      const primaryColor =
        rootStyle.getPropertyValue("--color-primary").trim() ||
        "oklch(0.225 0.146 265.82)";

      let width = 0;
      let height = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const resize = () => {
        width = wrapper.clientWidth;
        height = wrapper.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();

      const observer = new ResizeObserver(resize);
      observer.observe(wrapper);

      // ── Phase 1: Seed the field ────────────────────────────────
      const motes: Mote[] = Array.from({ length: 46 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 1 + Math.random() * 1.8,
        speed: 8 + Math.random() * 14,
        sway: 6 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.06 + Math.random() * 0.16,
        accent: Math.random() < 0.45,
      }));

      // ── Phase 2: Drift loop on the GSAP ticker ─────────────────
      let elapsed = 0;
      const render = (_time: number, deltaMS: number) => {
        const dt = deltaMS / 1000;
        elapsed += dt;
        ctx.clearRect(0, 0, width, height);

        for (const m of motes) {
          m.y -= (m.speed * dt) / height;
          if (m.y < -0.02) {
            m.y = 1.02;
            m.x = Math.random();
          }
          const px =
            m.x * width + Math.sin(elapsed * 0.5 + m.phase) * m.sway;
          const py = m.y * height;

          ctx.globalAlpha = m.alpha;
          ctx.fillStyle = m.accent ? accentColor : primaryColor;
          ctx.beginPath();
          ctx.arc(px, py, m.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };

      gsap.ticker.add(render);

      return () => {
        gsap.ticker.remove(render);
        observer.disconnect();
      };
    },
    { scope: wrapperRef },
  );
}
