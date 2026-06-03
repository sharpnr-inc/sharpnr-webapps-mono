"use client";
import { WobbleCard } from "@/components/ui/wobble-card";
import { WindowFrame } from "./WindowFrame";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

function FeatureButtons({
  onLearnMore,
  onSeeGuides,
}: {
  onLearnMore?: () => void;
  onSeeGuides?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 mt-5">
      {onLearnMore && (
        <motion.button
          onClick={onLearnMore}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg
                     text-[0.78rem] font-semibold text-slate-900
                     bg-white hover:bg-slate-100
                     border-none cursor-pointer transition-colors duration-150"
        >
          Learn More
          <ArrowRight size={13} strokeWidth={2.5} />
        </motion.button>
      )}
      {onSeeGuides && (
        <motion.button
          onClick={onSeeGuides}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg
                     text-[0.78rem] font-semibold text-white/70
                     hover:text-white hover:bg-white/[0.1]
                     bg-transparent border border-white/20
                     cursor-pointer transition-all duration-150"
        >
          <BookOpen size={13} strokeWidth={2} />
          See Guides
        </motion.button>
      )}
    </div>
  );
}

export default function WobbleCardDemo() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto w-full px-10">
      {/* ── Card 1: Sharp-Marketing — wide ── */}
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-pink-800 min-h-[420px]">
        <div
          className="flex flex-col justify-between h-full gap-6
                        lg:flex-row lg:items-center"
        >
          {/* text */}
          <div className="flex flex-col shrink-0 max-w-xs">
            <span
              className="mb-3 w-fit px-2.5 py-1 rounded-md
                             text-[0.65rem] font-semibold tracking-widest uppercase
                             bg-white/10 text-pink-200 border border-white/10"
            >
              CRM & Marketing
            </span>
            <h2
              className="text-balance text-2xl lg:text-3xl font-semibold
                           tracking-tight text-white leading-snug"
            >
              Sharp-Marketing: Scale Your Growth
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Automate your sales funnel, manage customer relationships, and
              drive revenue with our integrated CRM solution.
            </p>
            <FeatureButtons
              onLearnMore={() => navigate({ to: "/" })}
              onSeeGuides={() =>
                window.open(
                  "https://docs.sharpnr.com/sharp-marketing",
                  "_blank",
                )
              }
            />
          </div>

          {/* window */}
          <div className="w-full lg:max-w-sm xl:max-w-md shrink-0">
            <WindowFrame title="Sharp-Marketing · CRM">
              <img
                src="/test.png"
                alt="Sharp-Marketing Dashboard"
                className="w-full block"
              />
            </WindowFrame>
          </div>
        </div>
      </WobbleCard>

      {/* ── Card 2: Sharp-HR — single ── */}
      <WobbleCard containerClassName="col-span-1 min-h-[420px]">
        <div className="flex flex-col h-full gap-4">
          <div className="shrink-0">
            <span
              className="mb-3 inline-block px-2.5 py-1 rounded-md
                             text-[0.65rem] font-semibold tracking-widest uppercase
                             bg-white/10 text-purple-200 border border-white/10"
            >
              HRMS
            </span>
            <h2
              className="text-balance text-2xl lg:text-3xl font-semibold
                           tracking-tight text-white leading-snug"
            >
              Sharp-HR: Modern HRMS
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Streamline payroll, attendance, and employee lifecycle management
              with our comprehensive HRMS.
            </p>
            <FeatureButtons
              onLearnMore={() => navigate({ to: "/" })}
              onSeeGuides={() =>
                window.open("https://docs.sharpnr.com/sharp-hr", "_blank")
              }
            />
          </div>

          <div className="mt-auto">
            <WindowFrame title="Sharp-HR · People">
              <img
                src="/test.png"
                alt="Sharp-HR Dashboard"
                className="w-full block"
              />
            </WindowFrame>
          </div>
        </div>
      </WobbleCard>

      {/* ── Card 3: Sharp-Accounting — full width ── */}
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[340px]">
        <div
          className="flex flex-col justify-between h-full gap-6
                        lg:flex-row lg:items-center"
        >
          {/* text */}
          <div className="flex flex-col shrink-0 max-w-sm">
            <span
              className="mb-3 w-fit px-2.5 py-1 rounded-md
                             text-[0.65rem] font-semibold tracking-widest uppercase
                             bg-white/10 text-blue-200 border border-white/10"
            >
              Finance
            </span>
            <h2
              className="text-balance text-2xl lg:text-3xl font-semibold
                           tracking-tight text-white leading-snug"
            >
              Sharp-Accounting: Precision Financial Management
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Real-time bookkeeping, automated invoicing, and tax compliance
              built directly into your enterprise workflow.
            </p>
            <FeatureButtons
              onLearnMore={() => navigate({ to: "/" })}
              onSeeGuides={() =>
                window.open(
                  "https://docs.sharpnr.com/sharp-accounting",
                  "_blank",
                )
              }
            />
          </div>

          {/* window — wider on the full-span card */}
          <div className="w-full lg:max-w-xl shrink-0">
            <WindowFrame title="Sharp-Accounting · Ledger">
              <img
                src="/test.png"
                alt="Sharp-Accounting Dashboard"
                className="w-full block"
              />
            </WindowFrame>
          </div>
        </div>
      </WobbleCard>
    </div>
  );
}
