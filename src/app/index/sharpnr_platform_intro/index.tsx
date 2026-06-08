import { useRef } from "react";
import { useSharpnrPlatformIntro } from "./useSharpnrPlatformIntro";

const CARDS = [
  {
    label: "CRM",
    desc: "Track every deal, contact, and pipeline stage in one unified view.",
  },
  {
    label: "HRMS",
    desc: "Manage your people — from onboarding to payroll — without the chaos.",
  },
  {
    label: "Accounting",
    desc: "Real-time financials built for teams that move fast and need precision.",
  },
];

const STATS = [
  { label: "Businesses", value: 4200 },
  { label: "Hours saved / mo", value: 18000 },
  { label: "Integrations", value: 120 },
  { label: "Uptime %", value: 99 },
];

const SharpnrPlatformIntro = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bottomCopyRef = useRef<HTMLDivElement>(null);

  useSharpnrPlatformIntro({
    mainContainerRef,
    stickyContainerRef,
    headingWrapRef,
    headingRef,
    subtitleRef,
    cardsRef,
    statsRef,
    imageRef,
    bottomCopyRef,
  });

  return (
    <div
      ref={mainContainerRef}
      style={{ height: "500vh", position: "relative" }}
    >
      <div
        ref={stickyContainerRef}
        className="h-screen w-full overflow-hidden"
        style={{ display: "grid", gridTemplateRows: "1fr auto" }}
      >
        {/* ── top: heading + image ── */}
        <div className="flex items-center justify-between px-12 pt-24 gap-12">
          <div
            ref={headingWrapRef}
            className="will-change-transform"
            style={{
              transformOrigin: "top left",
              flex: "0 0 auto",
              maxWidth: "55%",
            }}
          >
            <h1
              ref={headingRef}
              className="text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[1.05] tracking-tight"
              style={{ overflow: "hidden", color: "var(--color-text)" }}
            >
              Sharpnr platform intro
            </h1>
          </div>

          <div
            ref={imageRef}
            className="flex-1 rounded-2xl flex items-center justify-center"
            style={{
              height: "42vh",
              clipPath: "inset(100% 0% 0% 0%)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <span
              className="text-xs font-mono tracking-widest uppercase border"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Platform preview
            </span>
          </div>
        </div>

        {/* ── bottom: cards + stats ── */}
        <div className="px-12 pb-10 flex flex-col gap-8">
          <div ref={cardsRef} className="flex gap-4">
            {CARDS.map((card) => (
              <div
                key={card.label}
                data-card
                className="flex-1 rounded-xl p-5"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <span
                  className="block text-[0.65rem] font-mono tracking-[0.2em] uppercase mb-2 bg-amber-300"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {card.label}
                </span>
                <p
                  className="text-sm leading-snug"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom container */}
          <div className="flex items-end justify-between">
            {/* Stats segment starts */}
            <div ref={statsRef} className="flex gap-10">
              {STATS.map((stat) => (
                <div key={stat.label} data-stat className="flex flex-col">
                  <span
                    className="text-3xl font-bold tabular-nums"
                    data-stat-value={stat.value}
                    style={{ color: "var(--color-text)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[0.65rem] font-mono tracking-wider uppercase mt-1"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Stats segment ends */}

            <div ref={bottomCopyRef} className="text-right">
              <p
                className="text-xs leading-relaxed font-mono"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Trusted by 4,200+ businesses worldwide.
                <br />
                Enterprise-grade. Startup-friendly.
              </p>
            </div>
          </div>
          {/* Bottom container */}
        </div>
      </div>
    </div>
  );
};

export default SharpnrPlatformIntro;
