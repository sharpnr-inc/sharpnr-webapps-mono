import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="w-full px-4 pb-4">
      {/* Full-bleed hero card — Cloudflare style */}
      <div className="relative mx-auto max-w-7xl rounded-2xl overflow-hidden bg-primary min-h-[560px] flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Warm radial glow rising from bottom — the Cloudflare signature */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,220,120,0.28) 0%, rgba(255,180,60,0.10) 50%, transparent 80%)",
          }}
        />

        {/* Subtle dot-grid texture — same as Cloudflare's hero */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.07] tracking-tight text-white">
            Everything built to power
            <br />
            modern enterprises—yours by default.
          </h1>

          <p className="max-w-xl mt-6 text-lg leading-relaxed text-white/70">
            CRM, HRMS, Accounting, and more — unified under one intelligent
            platform. Build, automate, and scale without the overhead.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <button
              onClick={() => {
                window.location.href = "/signup";
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-white/90 active:scale-[0.98] transition-all duration-150 shadow-sm"
            >
              Start building for free
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
