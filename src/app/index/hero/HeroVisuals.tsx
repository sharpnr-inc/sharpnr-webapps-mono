import { useEffect, useRef, useCallback } from "react";
import { gsap, useGSAP } from "@/animations/gsap";

// ─── types ───────────────────────────────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

interface NodeConfig {
  label: string;
  icon: string; // emoji/char used as icon
  accent: string; // tailwind bg class for the glow dot
  accentHex: string; // raw hex for GSAP glow strokes
}

// ─── data ────────────────────────────────────────────────────────────────────

const LEFT_NODES: NodeConfig[] = [
  {
    label: "Analytics",
    icon: "◈",
    accent: "bg-violet-500",
    accentHex: "#8b5cf6",
  },
  { label: "Auth", icon: "⬡", accent: "bg-sky-400", accentHex: "#38bdf8" },
  {
    label: "Storage",
    icon: "◉",
    accent: "bg-emerald-400",
    accentHex: "#34d399",
  },
  { label: "Billing", icon: "◆", accent: "bg-amber-400", accentHex: "#fbbf24" },
];

const RIGHT_NODES: NodeConfig[] = [
  { label: "Webhooks", icon: "⟡", accent: "bg-rose-400", accentHex: "#fb7185" },
  {
    label: "Reports",
    icon: "◈",
    accent: "bg-violet-500",
    accentHex: "#8b5cf6",
  },
  { label: "API", icon: "⬡", accent: "bg-sky-400", accentHex: "#38bdf8" },
  { label: "Email", icon: "◉", accent: "bg-emerald-400", accentHex: "#34d399" },
  { label: "Search", icon: "◆", accent: "bg-amber-400", accentHex: "#fbbf24" },
];

// ─── helpers ─────────────────────────────────────────────────────────────────

const SVG_NS = "http://www.w3.org/2000/svg";

function edgePoint(
  el: HTMLElement,
  container: HTMLElement,
  side: "left" | "right",
): Point {
  const cr = container.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return {
    x: er.left - cr.left + (side === "right" ? er.width : 0),
    y: er.top - cr.top + er.height / 2,
  };
}

function cubicPath(from: Point, to: Point): string {
  const dx = Math.abs(to.x - from.x) * 0.5;
  return `M${from.x},${from.y} C${from.x + dx},${from.y} ${to.x - dx},${to.y} ${to.x},${to.y}`;
}

// ─── sub-components ──────────────────────────────────────────────────────────

function Node({
  node,
  side,
}: {
  node: NodeConfig;
  side: "left" | "right" | "center";
}) {
  const isCenter = side === "center";

  if (isCenter) {
    return (
      <div
        data-node="center"
        className="relative h-16 w-full rounded-2xl flex items-center justify-center overflow-hidden cursor-default select-none"
        style={{
          background: "linear-gradient(135deg, #1e1e2e 0%, #16162a 100%)",
          border: "1px solid rgba(139,92,246,0.5)",
          boxShadow:
            "0 0 0 1px rgba(139,92,246,0.15), 0 0 32px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Animated shimmer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(139,92,246,0.35) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
        <span
          className="relative z-10 text-sm font-semibold tracking-widest uppercase"
          style={{ color: "#c4b5fd", letterSpacing: "0.15em" }}
        >
          Sharpnr
        </span>
        {/* Corner accents */}
        <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-violet-400 opacity-60" />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-400 opacity-60" />
        <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-violet-400 opacity-60" />
        <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-400 opacity-60" />
      </div>
    );
  }

  return (
    <div
      data-node={side}
      className="group relative h-14 w-full rounded-xl flex items-center gap-3 px-4 cursor-default select-none overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at ${side === "left" ? "0%" : "100%"} 50%, ${node.accentHex}18 0%, transparent 70%)`,
        }}
      />

      {/* Icon badge */}
      <div
        className="relative z-10 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs"
        style={{
          background: `${node.accentHex}18`,
          border: `1px solid ${node.accentHex}30`,
          color: node.accentHex,
        }}
      >
        {node.icon}
      </div>

      {/* Label */}
      <span
        className="relative z-10 text-sm font-medium tracking-wide"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        {node.label}
      </span>

      {/* Live indicator dot */}
      <div className="relative z-10 ml-auto flex-shrink-0">
        <span
          className={`block w-1.5 h-1.5 rounded-full ${node.accent}`}
          style={{ boxShadow: `0 0 6px ${node.accentHex}` }}
        />
      </div>
    </div>
  );
}

// ─── component ───────────────────────────────────────────────────────────────

const HeroVisuals = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // ── build SVG paths from live DOM positions ────────────────────────────────
  const buildLines = useCallback(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    overlay
      .querySelectorAll(".noodle, .noodle-glow, .pulse-dot")
      .forEach((el) => el.remove());

    const centerEl = container.querySelector<HTMLElement>(
      "[data-node='center']",
    );
    if (!centerEl) return;

    const leftEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-node='left']"),
    );
    const rightEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-node='right']"),
    );
    const allNodes = [...LEFT_NODES, ...RIGHT_NODES];

    const cLeft = edgePoint(centerEl, container, "left");
    const cRight = edgePoint(centerEl, container, "right");

    const addPath = (d: string, nodeIdx: number, isLeft: boolean) => {
      const node = allNodes[isLeft ? nodeIdx : LEFT_NODES.length + nodeIdx];

      // Glow layer (blurred duplicate)
      const glow = document.createElementNS(SVG_NS, "path");
      glow.setAttribute("d", d);
      glow.setAttribute("class", "noodle-glow");
      glow.setAttribute("fill", "none");
      glow.setAttribute("stroke", node.accentHex);
      glow.setAttribute("stroke-width", "4");
      glow.setAttribute("stroke-linecap", "round");
      glow.setAttribute("opacity", "0");
      glow.style.filter = "blur(4px)";
      overlay.appendChild(glow);

      // Sharp layer
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "noodle");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", node.accentHex);
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("opacity", "0");
      overlay.appendChild(path);

      return { path, glow };
    };

    // Store path data on elements so GSAP can reference them
    leftEls.forEach((el, i) => {
      const d = cubicPath(edgePoint(el, container, "right"), cLeft);
      const { path, glow } = addPath(d, i, true);
      path.dataset.lineIdx = String(i);
      glow.dataset.lineIdx = String(i);
    });

    rightEls.forEach((el, i) => {
      const d = cubicPath(cRight, edgePoint(el, container, "left"));
      const { path, glow } = addPath(d, i, false);
      path.dataset.lineIdx = String(leftEls.length + i);
      glow.dataset.lineIdx = String(leftEls.length + i);
    });
  }, []);

  // ── resize → rebuild ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      buildLines();
      animateLines();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildLines]);

  // ── GSAP timeline ─────────────────────────────────────────────────────────
  const animateLines = useCallback(() => {
    tlRef.current?.kill();

    const noodles = gsap.utils.toArray<SVGPathElement>(".noodle");
    const glows = gsap.utils.toArray<SVGPathElement>(".noodle-glow");
    if (!noodles.length) return;

    const tl = gsap.timeline();
    tlRef.current = tl;

    // 1. Draw-on with stagger
    noodles.forEach((path, i) => {
      const len = path.getTotalLength?.() ?? 800;
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 1,
      });
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power3.out",
        },
        i * 0.12,
      );
    });

    // 2. Sync glow fade-in
    glows.forEach((glow, i) => {
      gsap.set(glow, { opacity: 0 });
      tl.to(
        glow,
        { opacity: 0.35, duration: 1.0, ease: "power2.out" },
        i * 0.12 + 0.4,
      );
    });

    // 3. After all drawn: gentle idle pulse on each line independently
    const totalDraw = noodles.length * 0.12 + 1.4;
    noodles.forEach((path, i) => {
      tl.to(
        path,
        {
          opacity: 0.2,
          duration: 1.8 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        totalDraw + i * 0.3,
      );
    });
    glows.forEach((glow, i) => {
      tl.to(
        glow,
        {
          opacity: 0.12,
          duration: 1.8 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        totalDraw + i * 0.3,
      );
    });

    // 4. Traveling pulse dots along each path, looping
    const runPulse = () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      noodles.forEach((path, i) => {
        const allNodes = [...LEFT_NODES, ...RIGHT_NODES];
        const node = allNodes[i] ?? LEFT_NODES[0];
        const dot = document.createElementNS(SVG_NS, "circle");
        dot.setAttribute("r", "3");
        dot.setAttribute("fill", node.accentHex);
        dot.setAttribute("class", "pulse-dot");
        dot.style.filter = `drop-shadow(0 0 4px ${node.accentHex})`;
        overlay.appendChild(dot);

        const len = path.getTotalLength?.() ?? 800;
        const progress = { t: 0 };

        gsap.fromTo(
          progress,
          { t: 0 },
          {
            t: 1,
            duration: 1.8,
            ease: "power1.inOut",
            delay: totalDraw + 0.5 + i * 0.25,
            repeat: -1,
            repeatDelay: 3 + i * 0.4,
            onUpdate() {
              const pt = path.getPointAtLength(progress.t * len);
              dot.setAttribute("cx", String(pt.x));
              dot.setAttribute("cy", String(pt.y));
            },
            onRepeat() {
              gsap.fromTo(
                dot,
                { opacity: 1 },
                { opacity: 0, duration: 0.2, delay: 1.5 },
              );
              setTimeout(() => gsap.set(dot, { opacity: 1 }), 2200);
            },
          },
        );
      });
    };

    // Delay pulse start until lines are drawn
    setTimeout(runPulse, (totalDraw + 0.3) * 1000);
  }, []);

  // ── mount ─────────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      buildLines();
      setTimeout(animateLines, 0);
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <>
      <div
        ref={containerRef}
        className="relative p-6 rounded-3xl overflow-hidden w-7xl"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Radial ambient glow behind center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />

        {/* SVG overlay for noodles */}
        <svg
          ref={overlayRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          style={{ zIndex: 1 }}
        />

        {/* Node grid */}
        <div
          className="grid grid-cols-3 gap-8 items-center relative"
          style={{ zIndex: 2 }}
        >
          {/* Left column */}
          <div className="flex flex-col gap-2.5">
            {LEFT_NODES.map((node) => (
              <Node key={node.label} node={node} side="left" />
            ))}
          </div>

          {/* Center */}
          <div className="flex justify-center">
            <Node
              node={{
                label: "Sharpnr",
                icon: "◈",
                accent: "bg-violet-500",
                accentHex: "#8b5cf6",
              }}
              side="center"
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-2.5">
            {RIGHT_NODES.map((node) => (
              <Node key={node.label} node={node} side="right" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroVisuals;
