import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/app/shared/SectionIntro";
import { StatusBadge } from "@/app/shared/StatusBadge";
import { useIndustriesStripAnimation } from "./animations/useIndustriesStripAnimation";

const industries = [
  { name: "Hospitality", available: true },
  { name: "Healthcare", available: false },
  { name: "Retail", available: false },
  { name: "Education", available: false },
  { name: "Professional Services", available: false },
  { name: "Manufacturing", available: false },
  { name: "More to come", available: false, open: true },
] as const;

/**
 * Section 06 — Built for Every Business. One continuous platform line
 * runs beneath every industry: workflows differ, the foundation
 * doesn't. Hospitality is honestly marked as what exists today.
 */
export function IndustriesStripSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useIndustriesStripAnimation({ sectionRef, introRef });

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div ref={introRef}>
          <SectionIntro
            align="center"
            eyebrow="Industries"
            heading="Built for Every Business."
            lede="Different industries operate differently. The foundation should not. Sharpnr pairs industry-specific operations with one connected platform, so every organization gets software designed for its business."
          />
        </div>

        {/* One platform beneath every industry */}
        <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          {/* Desktop baseline */}
          <div className="absolute inset-x-0 top-[7px] hidden h-px bg-slate-200 md:block">
            <div className="strip-fill-x h-full w-full origin-left scale-x-0 bg-blue/60" />
          </div>
          {/* Mobile baseline */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200 md:hidden">
            <div className="strip-fill-y h-full w-full origin-top scale-y-0 bg-blue/60" />
          </div>

          <ol className="relative flex flex-col gap-7 md:flex-row md:justify-between md:gap-2">
            {industries.map((industry) => (
              <li
                key={industry.name}
                className="strip-station flex items-center gap-4 md:flex-col md:gap-3 md:text-center"
              >
                <span
                  className={`relative z-10 block rounded-full ${
                    industry.available
                      ? "size-[15px] bg-blue ring-4 ring-ice"
                      : "size-[11px] border border-slate-300 bg-white md:mt-0.5"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 md:flex-col md:gap-2">
                  <span
                    className={`text-sm font-medium ${
                      industry.available ? "text-navy" : "text-slate-500"
                    } ${"open" in industry && industry.open ? "italic text-slate-400" : ""}`}
                  >
                    {industry.name}
                    {"open" in industry && industry.open ? "…" : ""}
                  </span>
                  {industry.available && <StatusBadge kind="available" />}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-sm text-slate-500">
            Hospitality is available today. The platform is designed to grow —
            one connected industry at a time.
          </p>
          <Link
            to="/industries"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue transition-colors hover:text-blue-deep"
          >
            Explore industries
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
