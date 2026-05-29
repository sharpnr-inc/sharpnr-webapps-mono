"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { animate } from "animejs";
import { heroSectionItems } from "./Herosection_apps";
import type { LucideIcon } from "lucide-react";

// ── Monochrome Palette ──────────────────────────────────────────────────────
const MONOCHROME = {
  bg: "rgba(255,255,255,.03)",
  border: "rgba(255,255,255,.12)",
  icon: "#f8fafc",
  glow: "rgba(255,255,255,.15)",
};

const COL_CFG: { speed: number; dir: -1 | 1 }[] = [
  { speed: 26, dir: -1 },
  { speed: 19, dir: 1 },
  { speed: 33, dir: -1 },
  { speed: 22, dir: 1 },
];

const COLS_DATA = [0, 3, 6, 9].map((off) => {
  const rotated = [
    ...heroSectionItems.slice(off),
    ...heroSectionItems.slice(0, off),
  ];
  return [...rotated, ...rotated];
});

function AppCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    const glow = glowRef.current;
    if (!card || !icon || !glow) return;

    const pulse = animate(icon, {
      scale: [1, 1.22],
      duration: 1700 + Math.random() * 900,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      delay: Math.random() * 1100,
    });

    const onEnter = () => {
      gsap.to(card, {
        scale: 1.065,
        duration: 0.22,
        ease: "power3.out",
        boxShadow: `0 0 32px ${MONOCHROME.glow}, 0 0 0 1px ${MONOCHROME.border}`,
      });
      gsap.to(glow, { opacity: 1, duration: 0.28 });
      gsap.to(icon, {
        y: -5,
        rotate: 10,
        duration: 0.28,
        ease: "back.out(2.5)",
      });
    };
    const onLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.65,
        ease: "elastic.out(1,.4)",
        clearProps: "boxShadow",
      });
      gsap.to(glow, { opacity: 0, duration: 0.38 });
      gsap.to(icon, {
        y: 0,
        rotate: 0,
        duration: 0.5,
        ease: "elastic.out(1,.4)",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      pulse.pause();
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="app-tile relative mb-3 rounded-2xl p-3 cursor-default"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background:
          "linear-gradient(148deg, rgba(2,6,23,0.92) 0%, rgba(15,23,42,0.82) 100%)",
        backdropFilter: "blur(16px)",
        willChange: "transform",
      }}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle at 38% 42%, ${MONOCHROME.bg} 0%, transparent 68%)`,
        }}
      />
      <div className="relative z-10 flex items-center gap-2.5">
        <div
          ref={iconRef}
          className="shrink-0 p-2 rounded-xl"
          style={{
            background: MONOCHROME.bg,
            border: `1px solid ${MONOCHROME.border}`,
            boxShadow: `0 0 14px ${MONOCHROME.glow}`,
          }}
        >
          <Icon size={14} style={{ color: MONOCHROME.icon }} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-100 leading-tight truncate">
            {title}
          </p>
          <p className="text-[9px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AppBrickWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const tweens = useRef<(gsap.core.Tween | null)[]>([]);

  useLayoutEffect(() => {
    tweens.current = COLS_DATA.map((_, i) => {
      const col = colRefs.current[i];
      if (!col) return null;
      const halfH = col.scrollHeight / 2;
      const { speed, dir } = COL_CFG[i];
      return dir === -1
        ? gsap.to(col, { y: -halfH, duration: speed, ease: "none", repeat: -1 })
        : gsap.fromTo(
            col,
            { y: -halfH },
            { y: 0, duration: speed, ease: "none", repeat: -1 },
          );
    });
    return () => tweens.current.forEach((t) => t?.kill());
  }, []);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const onMove = (e: MouseEvent) => {
      const r = wall.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(wall, {
        rotateY: nx * 10,
        rotateX: -ny * 6,
        transformPerspective: 1400,
        duration: 0.6,
        ease: "power2.out",
      });
      tweens.current.forEach(
        (t) => t && gsap.to(t, { timeScale: 0.28, duration: 0.5 }),
      );
    };
    const onLeave = () => {
      gsap.to(wall, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.4,
        ease: "elastic.out(1,.35)",
      });
      tweens.current.forEach(
        (t) => t && gsap.to(t, { timeScale: 1, duration: 0.9 }),
      );
    };
    wall.addEventListener("mousemove", onMove);
    wall.addEventListener("mouseleave", onLeave);
    return () => {
      wall.removeEventListener("mousemove", onMove);
      wall.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const ping = () => {
      const tiles = wallRef.current?.querySelectorAll<HTMLElement>(".app-tile");
      if (!tiles?.length) return;
      const el = tiles[Math.floor(Math.random() * tiles.length)];
      gsap.to(el, {
        boxShadow:
          "0 0 32px rgba(255,255,255,.25), 0 0 0 1px rgba(255,255,255,.2)",
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        onComplete() {
          gsap.set(el, { clearProps: "boxShadow" });
        },
      });
    };
    const id = setInterval(ping, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={wallRef}
      className="relative w-full h-[560px] select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-x-0 top-0 h-32 z-20 pointer-events-none" />
      <div
        className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #020617 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-4 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #020617, transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-4 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to left, #020617, transparent)" }}
      />

      <div
        className="absolute left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          opacity: 0,
          background:
            "linear-gradient(to right, transparent 0%, rgba(255,255,255,.15) 30%, rgba(255,255,255,.6) 50%, rgba(255,255,255,.15) 70%, transparent 100%)",
          animation: "sharpnrScan 5s linear infinite",
        }}
      />

      <div className="flex gap-3 h-full overflow-hidden">
        {COLS_DATA.map((colItems, ci) => (
          <div key={ci} className="flex-1 min-w-0 overflow-hidden">
            <div
              ref={(el) => {
                colRefs.current[ci] = el;
              }}
              className="flex flex-col py-2"
            >
              {colItems.map((item, idx) => (
                <AppCard
                  key={`col${ci}-i${idx}`}
                  title={item.title}
                  description={item.description}
                  Icon={item.logo}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes sharpnrScan {
          0%   { top: 5%;  opacity: 0; }
          5%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
