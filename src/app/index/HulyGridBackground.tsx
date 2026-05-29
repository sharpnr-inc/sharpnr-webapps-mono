import { useState, useEffect, type MouseEvent } from "react";
import { heroSectionItems } from "./Herosection_apps";
import type { LucideIcon } from "lucide-react";

export function HulyGridBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [icons, setIcons] = useState<(LucideIcon | null)[]>([]);

  useEffect(() => {
    // Generated on mount to avoid server/client hydration mismatches
    const grid = Array.from({ length: 450 }).map(() => {
      // 25% chance for a cell to contain a background icon
      const hasIcon = Math.random() > 0.75;
      return hasIcon
        ? heroSectionItems[Math.floor(Math.random() * heroSectionItems.length)]
            .logo
        : null;
    });
    setIcons(grid);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
    >
      {/* ── Base Structural Grid ── */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Ambient Cursor Glow ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 50%)`,
        }}
      />

      {/* ── Masked Icons Revealing on Hover ── */}
      <div
        className="absolute inset-0 pointer-events-none flex flex-wrap"
        style={{
          WebkitMaskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 70%)`,
          maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 70%)`,
        }}
      >
        {icons.map((Icon, i) => (
          <div
            key={i}
            className="w-[64px] h-[64px] flex items-center justify-center"
          >
            {Icon && <Icon size={20} className="text-slate-500/40" />}
          </div>
        ))}
      </div>
    </div>
  );
}
