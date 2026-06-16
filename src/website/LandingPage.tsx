import { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const FEATURES = [
  {
    icon: "📄",
    title: "Docs",
    desc: "Rich text editing with real-time collaboration, comments, and version history.",
    color: "from-blue-500/20 to-blue-600/10",
    accent: "bg-blue-500",
    tag: "bg-blue-100 text-blue-700",
  },
  {
    icon: "📊",
    title: "Sheets",
    desc: "Powerful spreadsheets with formulas, pivot tables, and live data sync.",
    color: "from-emerald-500/20 to-emerald-600/10",
    accent: "bg-emerald-500",
    tag: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "🖥️",
    title: "Slides",
    desc: "Stunning presentations with animated transitions and built-in asset library.",
    color: "from-violet-500/20 to-violet-600/10",
    accent: "bg-violet-500",
    tag: "bg-violet-100 text-violet-700",
  },
  {
    icon: "✏️",
    title: "Whiteboard",
    desc: "Infinite canvas for brainstorming, diagrams, wireframes, and flowcharts.",
    color: "from-amber-500/20 to-amber-600/10",
    accent: "bg-amber-500",
    tag: "bg-amber-100 text-amber-700",
  },
  {
    icon: "📋",
    title: "PDF Editor",
    desc: "Annotate, fill, sign, and edit PDFs without leaving your workflow.",
    color: "from-rose-500/20 to-rose-600/10",
    accent: "bg-rose-500",
    tag: "bg-rose-100 text-rose-700",
  },
  {
    icon: "🎨",
    title: "Canvas",
    desc: "Design graphics, mockups, and visual content with a full creative toolkit.",
    color: "from-fuchsia-500/20 to-fuchsia-600/10",
    accent: "bg-fuchsia-500",
    tag: "bg-fuchsia-100 text-fuchsia-700",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "0",
    desc: "For individuals getting started",
    cta: "Get started",
    highlight: false,
    features: [
      "5 GB storage",
      "3 workspaces",
      "Docs, Sheets & Slides",
      "PDF viewer",
      "5 collaborators",
    ],
  },
  {
    name: "Pro",
    price: "9",
    desc: "For professionals & small teams",
    cta: "Start free trial",
    highlight: true,
    features: [
      "100 GB storage",
      "Unlimited workspaces",
      "All apps incl. Canvas",
      "PDF editor & signing",
      "Unlimited collaborators",
      "Version history (90 days)",
      "Priority support",
    ],
  },
  {
    name: "Team",
    price: "19",
    desc: "For organizations at scale",
    cta: "Contact sales",
    highlight: false,
    features: [
      "1 TB shared storage",
      "SSO & admin console",
      "Audit logs",
      "Custom branding",
      "SLA guarantee",
      "Version history (unlimited)",
      "Dedicated support",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Aisha Patel",
    role: "Product Designer, Verve",
    avatar: "AP",
    color: "bg-violet-100 text-violet-700",
    quote:
      "Folio's Canvas replaced three separate tools for our design team. The collaboration is genuinely instant.",
  },
  {
    name: "Marcus Chen",
    role: "CTO, Luminary Labs",
    avatar: "MC",
    color: "bg-blue-100 text-blue-700",
    quote:
      "We migrated our entire documentation from Notion and Google Workspace. The PDF editor alone saved us an entire subscription.",
  },
  {
    name: "Sofia Reyes",
    role: "Operations Lead, Nexus Co.",
    avatar: "SR",
    color: "bg-emerald-100 text-emerald-700",
    quote:
      "The Whiteboard is the best I've used. Infinite canvas, smart connectors, and your whole team can be in it at once.",
  },
];

export function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((p) => (p + 1) % FEATURES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans antialiased overflow-x-hidden">
      {/* ─── Google Fonts ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
        .glow-teal {
          box-shadow: 0 0 80px -20px rgba(20, 184, 166, 0.35);
        }
        @keyframes float-up {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-float-up { animation: float-up 0.7s ease forwards; }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 20%, #99f6e4 50%, #fff 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3.5s linear infinite;
        }
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px -10px rgba(0,0,0,0.5);
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      {/* ─── HEADER ─── */}
      <Header />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-28 px-6 text-center overflow-hidden noise grid-bg"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-body text-white/60 mb-8 animate-float-up">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Now in public beta — free forever plan available
          </div>

          {/* Heading */}
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-6 animate-float-up"
            style={{ animationDelay: "0.1s", opacity: 0 }}
          >
            One workspace for{" "}
            <span className="font-display italic shimmer-text">every idea</span>
          </h1>

          <p
            className="font-body text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed animate-float-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Docs, Sheets, Slides, PDFs, Whiteboard, and Canvas — all in one
            cloud suite built for how modern teams actually work.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-float-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <a
              href="#"
              className="w-full sm:w-auto font-body text-sm px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-semibold transition-all duration-150 glow-teal"
            >
              Start for free — no credit card
            </a>
            <a
              href="#"
              className="w-full sm:w-auto font-body text-sm px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all"
            >
              Watch demo ↗
            </a>
          </div>
        </div>

        {/* Hero app preview strip */}
        <div
          className="relative z-10 mt-20 max-w-5xl mx-auto animate-float-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#111118] shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#16161f] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="flex items-center gap-1 ml-4">
                {FEATURES.map((f, i) => (
                  <button
                    key={f.title}
                    onClick={() => setActiveFeature(i)}
                    className={`font-body text-xs px-3 py-1 rounded-md transition-all ${
                      activeFeature === i
                        ? "bg-white/10 text-white"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {f.icon} {f.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview content */}
            <div
              className={`h-72 bg-gradient-to-br ${FEATURES[activeFeature].color} relative overflow-hidden transition-all duration-500`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">
                    {FEATURES[activeFeature].icon}
                  </div>
                  <p className="font-body text-white/40 text-sm">
                    {FEATURES[activeFeature].desc}
                  </p>
                </div>
              </div>
              {/* Fake toolbar */}
              <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
                <div className="h-6 w-24 rounded bg-white/5" />
                <div className="h-6 w-16 rounded bg-white/5" />
                <div className="h-6 w-20 rounded bg-white/5" />
                <div className="flex-1" />
                <div className="h-7 w-20 rounded-lg bg-teal-500/30 border border-teal-500/40" />
              </div>
              {/* Fake doc lines */}
              <div className="absolute bottom-8 left-10 right-10 space-y-2">
                {[80, 65, 90, 55].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-full bg-white/8"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOGOS ─── */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-body text-xs text-white/25 text-center uppercase tracking-widest mb-6">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              "Verve",
              "Luminary",
              "Nexus Co.",
              "Artisan",
              "Stackform",
              "Driftwork",
            ].map((co) => (
              <span
                key={co}
                className="font-body text-base font-medium text-white/20 hover:text-white/40 transition-colors"
              >
                {co}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm text-teal-400 uppercase tracking-widest mb-3">
              Everything you need
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Six apps. One roof.
            </h2>
            <p className="font-body text-white/40 max-w-md mx-auto">
              Stop juggling subscriptions. Folio brings your entire document
              workflow under a single, beautifully unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`card-hover relative rounded-2xl bg-white/3 border border-white/8 p-6 overflow-hidden group`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-body font-semibold text-white text-lg mb-2">
                    {f.title}
                  </h3>
                  <p className="font-body text-sm text-white/45 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
                <div
                  className={`absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full ${f.accent} opacity-60`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLABORATION HIGHLIGHT ─── */}
      <section className="py-20 px-6 bg-[#0d0d14] border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-sm text-teal-400 uppercase tracking-widest mb-3">
              Real-time collaboration
            </p>
            <h2 className="font-display text-4xl text-white leading-snug mb-5">
              Your team, working{" "}
              <span className="font-display italic text-teal-300">
                together
              </span>
            </h2>
            <p className="font-body text-white/45 leading-relaxed mb-8">
              See cursors move, edits land, and comments thread in real-time.
              Whether you're on Docs or deep in a Whiteboard session —
              everyone's always in sync.
            </p>
            <ul className="space-y-3">
              {[
                "Live presence indicators & named cursors",
                "Inline comments with threaded replies",
                "Granular share permissions (view / comment / edit)",
                "Workspace-level org with folders & tags",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-sm text-white/60"
                >
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3 5.5L6.5 2.5"
                        stroke="#2dd4bf"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Collab visual mock */}
          <div className="relative">
            <div className="rounded-2xl bg-[#111118] border border-white/8 p-6 glow-teal">
              <div className="flex items-center gap-2 mb-5">
                <div className="font-body text-sm text-white/60">
                  📄 Q4 Strategy.doc
                </div>
                <div className="ml-auto flex -space-x-2">
                  {["AP", "MC", "SR", "+3"].map((a, i) => (
                    <div
                      key={a}
                      className={`w-7 h-7 rounded-full border-2 border-[#111118] flex items-center justify-center text-xs font-body font-medium ${
                        [
                          "bg-violet-500",
                          "bg-blue-500",
                          "bg-emerald-500",
                          "bg-white/20",
                        ][i]
                      } text-white`}
                    >
                      {a}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2.5 w-full rounded-full bg-white/8" />
                <div className="h-2.5 w-4/5 rounded-full bg-white/8" />
                <div className="relative h-2.5 w-3/4 rounded-full bg-white/8">
                  <div className="absolute -top-6 left-1/2 bg-violet-500 text-white text-xs font-body px-2 py-0.5 rounded-md whitespace-nowrap">
                    Aisha is editing
                  </div>
                  <div className="absolute left-1/2 top-0 w-0.5 h-full bg-violet-400" />
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/8" />
                <div className="h-2.5 w-2/3 rounded-full bg-white/8" />
              </div>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-body text-white flex-shrink-0">
                  M
                </div>
                <div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2 font-body text-xs text-white/60">
                  Should we split this section into two? The second half is a
                  different audience.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-sm text-teal-400 uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Simple, honest pricing
            </h2>
            <p className="font-body text-white/40 max-w-sm mx-auto">
              No seat-based surprises. One price, the whole team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`card-hover rounded-2xl p-7 border flex flex-col ${
                  plan.highlight
                    ? "bg-teal-500/10 border-teal-500/40 relative overflow-hidden"
                    : "bg-white/3 border-white/8"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
                )}
                {plan.highlight && (
                  <span className="self-start mb-3 font-body text-xs px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Most popular
                  </span>
                )}
                <h3 className="font-body font-semibold text-white text-lg mb-1">
                  {plan.name}
                </h3>
                <p className="font-body text-xs text-white/40 mb-5">
                  {plan.desc}
                </p>
                <div className="mb-6">
                  <span className="font-display text-4xl text-white">
                    ${plan.price}
                  </span>
                  <span className="font-body text-sm text-white/40">
                    /mo per user
                  </span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 font-body text-sm text-white/60"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="flex-shrink-0"
                      >
                        <circle
                          cx="7"
                          cy="7"
                          r="6"
                          fill={
                            plan.highlight
                              ? "rgba(45,212,191,0.2)"
                              : "rgba(255,255,255,0.07)"
                          }
                        />
                        <path
                          d="M4.5 7L6 8.5L9.5 5.5"
                          stroke={
                            plan.highlight ? "#2dd4bf" : "rgba(255,255,255,0.4)"
                          }
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`font-body text-sm font-medium py-3 rounded-xl text-center transition-all duration-150 ${
                    plan.highlight
                      ? "bg-teal-500 hover:bg-teal-400 text-black"
                      : "bg-white/6 hover:bg-white/12 text-white border border-white/10"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-6 bg-[#0d0d14] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-sm text-teal-400 uppercase tracking-widest text-center mb-10">
            What teams are saying
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="card-hover bg-white/3 border border-white/8 rounded-2xl p-6"
              >
                <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center font-body text-xs font-semibold`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-white">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-white/35">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-5">
            Ready to bring your work{" "}
            <span className="font-display italic text-teal-300">together?</span>
          </h2>
          <p className="font-body text-white/40 mb-9 leading-relaxed">
            Join thousands of teams using Folio to write, design, calculate, and
            collaborate — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#"
              className="w-full sm:w-auto font-body text-sm font-semibold px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black transition-all glow-teal"
            >
              Create free account
            </a>
            <a
              href="#"
              className="w-full sm:w-auto font-body text-sm px-7 py-3.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              See all features →
            </a>
          </div>
          <p className="mt-5 font-body text-xs text-white/25">
            No credit card required · Free plan forever · Cancel anytime
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
}
