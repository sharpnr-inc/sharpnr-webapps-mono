import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Network, LayoutGrid, Zap, Users, Building2 } from "lucide-react";
const CARDS = [
  {
    Icon: Network,
    title: "Built Around Real Operations",
    body: "Departments are connected by design. Accounting, inventory, HR, and customer data flow intelligently — no manual transfers, no data silos.",
    tag: "Interconnected by default",
  },
  {
    Icon: LayoutGrid,
    title: "One Platform, Multiple Solutions",
    body: "Restaurant, hotel, school, or enterprise — industry-specific tools with a consistent experience and shared data layer throughout.",
    tag: "12+ industry verticals",
  },
];

const ECOSYSTEM = [
  {
    Icon: Zap,
    title: "Business Operations",
    tags: [
      "Accounting",
      "Invoicing",
      "Inventory",
      "Payroll",
      "Analytics",
      "Automation",
    ],
  },
  {
    Icon: Users,
    title: "Customer Experience",
    tags: ["CRM", "Reservations", "Support", "Communication", "Engagement"],
  },
  {
    Icon: Building2,
    title: "Organization",
    tags: ["HR", "Scheduling", "Attendance", "Permissions", "Collaboration"],
  },
];

export function SharpnrIntroductionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reusable scroll trigger builder
      const st = (trigger: string | Element, start = "top 85%") => ({
        scrollTrigger: {
          trigger,
          start,
          toggleActions: "play none none reverse" as const,
        },
      });

      // ── Label ─────────────────────────────────────────────────────
      gsap.fromTo(
        ".intro-label",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          ...st(".intro-label", "top 88%"),
        },
      );

      // ── Heading ───────────────────────────────────────────────────
      gsap.fromTo(
        ".intro-heading",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power4.out",
          ...st(".intro-heading"),
        },
      );

      // ── Subtext ───────────────────────────────────────────────────
      gsap.fromTo(
        ".intro-subtext",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          ...st(".intro-subtext"),
        },
      );

      // ── Stats: fade in + count up ─────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((item, i) => {
        const numEl = item.querySelector<HTMLElement>(".stat-number");
        const targetVal = parseFloat(item.dataset.value ?? "0");
        const suffix = item.dataset.suffix ?? "";
        const isInt = Number.isInteger(targetVal);

        // Fade the card in
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.1,
            ...st(".intro-stats"),
          },
        );

        // Count up
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          delay: 0.3 + i * 0.1,
          ease: "power2.out",
          onUpdate() {
            if (numEl)
              numEl.textContent =
                (isInt ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          },
          scrollTrigger: { trigger: ".intro-stats", start: "top 85%" },
        });
      });

      // ── Feature cards ─────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".intro-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.15,
            ...st(".intro-cards-grid", "top 82%"),
          },
        );
      });

      // ── Ecosystem header ──────────────────────────────────────────
      gsap.fromTo(
        ".intro-eco-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          ...st(".intro-ecosystem", "top 83%"),
        },
      );

      // ── Ecosystem columns ─────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".intro-eco-col").forEach((col, i) => {
        gsap.fromTo(
          col,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: i * 0.12,
            ...st(".intro-ecosystem", "top 80%"),
          },
        );
      });

      // ── Closing ───────────────────────────────────────────────────
      gsap.fromTo(
        ".intro-closing",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          ...st(".intro-closing"),
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="space-y-24">
          {/* ── Header ─────────────────────────────────────── */}
          <div className="space-y-8">
            <span className="intro-label block text-xs font-mono uppercase tracking-[0.25em] text-teal-500">
              Introduction
            </span>
            <h2 className="intro-heading text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl text-slate-50">
              One platform.
              <br />
              <span className="text-slate-400">Every operation.</span>
            </h2>
            <p className="intro-subtext max-w-2xl text-lg leading-8 text-slate-400">
              Most businesses run on dozens of disconnected tools. Sharpnr
              replaces them with a single interconnected platform — where every
              department, workflow, and data point lives together.
            </p>
          </div>

          {/* ── Feature cards ──────────────────────────────── */}
          <div className="intro-cards-grid grid md:grid-cols-2 gap-5">
            {CARDS.map(({ Icon, title, body, tag }) => (
              <div
                key={title}
                className="intro-card rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
                    <Icon size={18} className="text-teal-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 border border-white/[0.08] rounded-full px-3 py-1">
                    {tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-50">
                    {title}
                  </h3>
                  <p className="text-slate-400 leading-7 text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Ecosystem ──────────────────────────────────── */}
          <div className="intro-ecosystem rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="intro-eco-header px-10 py-7 border-b border-white/[0.08] flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-50">
                The Sharpnr Ecosystem
              </h2>
              <span className="text-xs font-mono text-slate-500 hidden md:block">
                40+ modules across 3 pillars
              </span>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              {ECOSYSTEM.map(({ Icon, title, tags }) => (
                <div key={title} className="intro-eco-col p-8 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} className="text-teal-400" />
                    <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest">
                      {title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Closing ────────────────────────────────────── */}
          <div className="intro-closing border-t border-white/[0.06] pt-20 grid md:grid-cols-2 gap-10 items-start">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-50 leading-tight">
              Designed to grow
              <br />
              with your business.
            </h2>
            <p className="text-lg leading-8 text-slate-400">
              From small teams to large enterprises — Sharpnr adapts as your
              organization grows. One login, one platform, complete visibility
              across every part of your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
