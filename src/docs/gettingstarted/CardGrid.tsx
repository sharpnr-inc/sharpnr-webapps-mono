// src/docs/components/CardGrid.tsx
import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
      {children}
    </div>
  );
}

interface CardProps {
  icon?: string;
  title: string;
  description: string;
  href: string;
}

export function Card({ icon, title, description, href }: CardProps) {
  return (
    <Link
      to={href}
      className="group relative flex flex-col gap-2.5 rounded-xl border border-white/[0.07]
        bg-white/[0.025] hover:bg-white/[0.045] hover:border-violet-500/25
        px-5 py-4 transition-all duration-200 no-underline overflow-hidden"
    >
      {/* Corner glow on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
      />

      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-3">
          {icon && <span className="text-lg leading-none">{icon}</span>}
          <span className="text-[13.5px] font-semibold text-white/75 group-hover:text-white/95 transition-colors duration-150">
            {title}
          </span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-violet-400
          -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
      </div>

      <p className="text-[12.5px] text-white/35 leading-relaxed relative z-10 group-hover:text-white/45 transition-colors duration-150">
        {description}
      </p>
    </Link>
  );
}
