import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="w-full p-4">
      <div className="relative h-[calc(100svh-8.5rem)] bg-primary rounded-3xl overflow-hidden flex flex-col justify-between p-12">
        {/* Ambient orb — subtle depth */}
        <div className="pointer-events-none absolute -top-20 -right-16 w-[420px] h-[420px] rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Top content block */}
        <div className="relative z-10 flex flex-col">
          {/* Eyebrow badge */}
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-300">
            <span className="size-1.5 rounded-full bg-indigo-400" />
            Enterprise Suite
          </span>

          {/* Headline */}
          <h1 className="text-6xl font-semibold leading-[1.08] tracking-tight text-slate-50">
            One Platform,
            <br />
            <span className="text-indigo-400">Every Business.</span>
          </h1>

          {/* Sub-copy */}
          <p className="max-w-md mt-4 text-base leading-relaxed text-slate-400">
            CRM, HRMS, Accounting, and more — unified under a single intelligent
            platform built for modern enterprises.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-10">
            <button
              onClick={() => navigate({ to: "/" })}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-600 active:scale-[0.98]"
            >
              Get Started
              <ArrowRight className="size-4" />
            </button>

            <button
              onClick={() => navigate({ to: "/products" })}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/30 hover:bg-white/5"
            >
              <Play className="size-4 opacity-70" />
              Explore Products
            </button>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="relative z-10 flex gap-8 border-t border-white/[0.08] pt-8">
          {[
            { num: "10+", label: "Product modules" },
            { num: "1 API", label: "Unified backend" },
            { num: "Multi-tenant", label: "Enterprise-ready" },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-xl font-semibold tracking-tight text-slate-100">
                {num}
              </span>
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
