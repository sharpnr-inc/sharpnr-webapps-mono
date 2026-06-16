import { motion } from "framer-motion";
import {
  MessageSquare,
  Hash,
  Zap,
  Shield,
  Layers,
  Command,
  ChevronRight,
  Terminal,
  Globe,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { Footer } from "./Footer";

// ─── Animation variants ────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" },
};

// ─── Feature data ─────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Hash,
    title: "Structured Channels",
    desc: "Organize by topic, project, or department with granular permission trees and topic threading.",
    tag: "Workspace",
  },
  {
    icon: MessageSquare,
    title: "Threaded Clarity",
    desc: "Keep the main feed clean. Deep threads branch off without losing the signal in the noise.",
    tag: "Messaging",
  },
  {
    icon: Layers,
    title: "Multi-tenant Engines",
    desc: "Switch between orgs and communities in one unified shell. No browser tabs, no context loss.",
    tag: "Architecture",
  },
  {
    icon: Command,
    title: "Power-user Driven",
    desc: "Keyboard-first. Command palette. Every action two keystrokes or fewer. Built for velocity.",
    tag: "UX",
  },
  {
    icon: Shield,
    title: "Secure Orchestration",
    desc: "End-to-end encrypted payloads. Data sovereignty controls. SOC-2 compliant by design.",
    tag: "Security",
  },
  {
    icon: Zap,
    title: "Sub-10ms Latency",
    desc: "A custom binary protocol built for real-time sync. Not WebSocket polling — true push.",
    tag: "Performance",
  },
];

const INFRA_POINTS = [
  { icon: Globe, label: "12 edge regions", sub: "globally distributed" },
  { icon: Terminal, label: "Open protocol", sub: "self-hostable" },
  { icon: Users, label: "10M+ concurrent", sub: "peak capacity" },
  { icon: Zap, label: "99.99% uptime", sub: "SLA guaranteed" },
];

const STEPS = [
  {
    num: "01",
    title: "Create a workspace",
    desc: "Spin up in 30 seconds. Invite your team via link.",
  },
  {
    num: "02",
    title: "Structure your channels",
    desc: "Define topics, projects, and permission scopes.",
  },
  {
    num: "03",
    title: "Plug in your stack",
    desc: "Connect GitHub, Linear, Jira, or any webhook source.",
  },
];

// ─── Main component ────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono selection:bg-cyan-400/30 selection:text-cyan-100">
      {/* ─── Custom global styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

        .font-display { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono    { font-family: 'IBM Plex Mono', monospace; }

        @keyframes scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        .scanline {
          position: absolute;
          inset-x-0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.08), transparent);
          animation: scan 6s linear infinite;
          pointer-events: none;
        }
        .cursor-blink::after {
          content: '▋';
          animation: blink 1s step-end infinite;
          color: rgb(6,182,212);
        }
        .grid-overlay {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .hex-border {
          position: relative;
        }
        .hex-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(6,182,212,0.4), transparent 40%, transparent 60%, rgba(6,182,212,0.15));
          border-radius: inherit;
          z-index: 0;
        }
        .cable-line {
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent);
        }
      `}</style>

      <Header />

      <main className="pt-16">
        {/* ═══════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden grid-overlay">
          {/* Scanline effect */}
          <div className="scanline" />

          {/* Glow spot */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 left-1/4 w-75 h-75 bg-cyan-400/4 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 py-28 md:py-36">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="flex flex-col items-center text-center gap-7"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 text-xs font-mono border border-zinc-700 bg-zinc-900/80 text-zinc-400 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  v1.0.0-alpha · Now in open beta
                  <ChevronRight size={12} className="text-zinc-600" />
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} className="max-w-4xl">
                <h1 className="font-display text-5xl md:text-7xl lg:text-[82px] font-bold leading-[0.95] tracking-tight text-white">
                  The{" "}
                  <span className="text-zinc-500 italic">Orchestration</span>
                  <br />
                  of Human{" "}
                  <span className="relative inline-block">
                    <span className="text-cyan-400 cursor-blink">
                      Connection
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="font-display max-w-xl text-base md:text-lg text-zinc-400 leading-relaxed font-light"
              >
                A high-bandwidth chat platform bridging structured enterprise
                workspace and fluid community interaction. Built for speed,
                logic, and scale.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  size="lg"
                  className="h-12 px-8 font-mono text-sm bg-white text-zinc-950 hover:bg-cyan-400 hover:text-zinc-950 rounded font-semibold transition-colors duration-150 shadow-[0_0_32px_-8px_rgba(6,182,212,0.5)]"
                >
                  Download for Desktop
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 font-mono text-sm border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-500 rounded transition-all"
                >
                  Open in Browser
                </Button>
              </motion.div>

              {/* Terminal mockup */}
              <motion.div variants={fadeUp} className="w-full max-w-5xl mt-10">
                <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)]">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 px-4 h-10 bg-zinc-900 border-b border-zinc-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors cursor-pointer" />
                    </div>
                    <span className="mx-auto text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
                      cables://workspace/engineering
                    </span>
                  </div>

                  {/* App layout */}
                  <div className="flex h-80 bg-zinc-950">
                    {/* Server icons sidebar */}
                    <div className="w-14 border-r border-zinc-900 flex flex-col items-center py-4 gap-3 bg-[#0d0d10]">
                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                        <Zap
                          size={14}
                          className="text-zinc-950 fill-zinc-950"
                        />
                      </div>
                      <div className="w-px h-4 bg-zinc-800" />
                      {["E", "D", "M"].map((l, i) => (
                        <div
                          key={l}
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                            i === 0
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg"
                              : "bg-zinc-900 text-zinc-600"
                          }`}
                        >
                          {l}
                        </div>
                      ))}
                      <div className="mt-auto w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono flex items-center justify-center">
                        KA
                      </div>
                    </div>

                    {/* Channel sidebar */}
                    <div className="w-44 border-r border-zinc-900 flex flex-col bg-[#101015]">
                      <div className="px-3 py-3 border-b border-zinc-900">
                        <p className="text-xs font-mono font-semibold text-zinc-300 tracking-wide">
                          ENGINEERING
                        </p>
                        <p className="text-[10px] text-zinc-600 mt-0.5">
                          12 members online
                        </p>
                      </div>
                      <div className="flex-1 p-2 space-y-0.5">
                        {[
                          { name: "# general", active: false },
                          { name: "# backend", active: true },
                          { name: "# frontend", active: false },
                          { name: "# deploys", active: false },
                          { name: "# incidents", active: false },
                          { name: "## standup", active: false },
                        ].map(({ name, active }) => (
                          <div
                            key={name}
                            className={`px-2 py-1 rounded text-[11px] font-mono cursor-pointer ${
                              active
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900"
                            }`}
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main chat area */}
                    <div className="flex-1 flex flex-col">
                      {/* Channel header */}
                      <div className="h-10 px-4 flex items-center gap-2 border-b border-zinc-900">
                        <Hash size={13} className="text-zinc-600" />
                        <span className="text-xs font-mono text-zinc-400">
                          backend
                        </span>
                        <span className="ml-auto text-[10px] font-mono text-zinc-700">
                          ↑K command
                        </span>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 p-4 space-y-4 overflow-hidden">
                        {[
                          {
                            avatar: "MR",
                            name: "Marcus R.",
                            time: "9:41 AM",
                            msg: "PR #247 is ready for review — refactored the auth middleware",
                            color: "bg-blue-500",
                          },
                          {
                            avatar: "AP",
                            name: "Aisha P.",
                            time: "9:43 AM",
                            msg: "On it. Also — the latency regression in staging is fixed",
                            color: "bg-violet-500",
                          },
                          {
                            avatar: "KA",
                            name: "Kashif A.",
                            time: "9:45 AM",
                            msg: "Nice. Deploying to prod after standup ✓",
                            color: "bg-cyan-500",
                          },
                        ].map(({ avatar, name, time, msg, color }) => (
                          <div key={name} className="flex items-start gap-3">
                            <div
                              className={`w-7 h-7 rounded-full ${color} flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0`}
                            >
                              {avatar}
                            </div>
                            <div>
                              <div className="flex items-baseline gap-2 mb-0.5">
                                <span className="text-[11px] font-mono font-semibold text-zinc-300">
                                  {name}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-700">
                                  {time}
                                </span>
                              </div>
                              <p className="text-[11px] font-mono text-zinc-500 leading-relaxed">
                                {msg}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Input bar */}
                      <div className="px-4 pb-4">
                        <div className="h-9 rounded border border-zinc-800 bg-zinc-900/50 flex items-center px-3 gap-2">
                          <span className="text-[11px] font-mono text-zinc-700">
                            Message #backend
                          </span>
                          <span className="ml-auto text-[10px] font-mono text-zinc-800">
                            ↑ to edit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            INFRASTRUCTURE STATS
        ═══════════════════════════════════════════════════ */}
        <section
          id="infrastructure"
          className="border-y border-zinc-800/60 bg-zinc-900/30"
        >
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {INFRA_POINTS.map(({ icon: Icon, label, sub }, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 px-8 py-6 ${
                    i < INFRA_POINTS.length - 1
                      ? "border-r border-zinc-800/60"
                      : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-white">
                      {label}
                    </p>
                    <p className="font-mono text-[11px] text-zinc-600">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FEATURES
        ═══════════════════════════════════════════════════ */}
        <section id="features" className="py-28">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section header */}
            <div className="mb-16 max-w-xl">
              <p className="font-mono text-xs text-cyan-500 tracking-[0.2em] uppercase mb-3">
                ── Core modules
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                Engineered for Momentum
              </h2>
              <p className="mt-3 font-mono text-sm text-zinc-500 leading-relaxed">
                Everything you need from Slack, with the velocity of Discord.
                None of the compromise.
              </p>
            </div>

            {/* Feature grid */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/40"
            >
              {FEATURES.map(({ icon: Icon, title, desc, tag }) => (
                <motion.div
                  key={title}
                  variants={cardVariant}
                  className="bg-zinc-950 p-7 group hover:bg-zinc-900/60 transition-colors duration-200 relative overflow-hidden"
                >
                  {/* top accent line on hover */}
                  <div className="absolute top-0 inset-x-0 h-px bg-cyan-400/0 group-hover:bg-cyan-400/50 transition-all duration-300" />

                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded border border-zinc-800 group-hover:border-cyan-500/40 bg-zinc-900 flex items-center justify-center transition-colors">
                      <Icon
                        size={16}
                        className="text-zinc-400 group-hover:text-cyan-400 transition-colors"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded-sm tracking-widest uppercase">
                      {tag}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-base text-white mb-2">
                    {title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-500 leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            HOW IT WORKS
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-zinc-800/60 bg-zinc-900/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-14 text-center">
              <p className="font-mono text-xs text-cyan-500 tracking-[0.2em] uppercase mb-3">
                ── Protocol
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Plug in. Go live.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
              {/* Connecting cable line */}
              <div className="absolute top-8 left-1/6 right-1/6 h-px cable-line hidden md:block" />

              {STEPS.map(({ num, title, desc }) => (
                <div
                  key={num}
                  className="flex flex-col items-center text-center px-8 py-6 relative"
                >
                  <div className="w-16 h-16 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center mb-5 relative z-10">
                    <span className="font-mono text-xl font-bold text-cyan-400">
                      {num}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CTA BANNER
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 border-t border-zinc-800/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative rounded-lg border border-zinc-700/60 bg-zinc-900 overflow-hidden p-12 md:p-16 text-center">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-cyan-500/20" />
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-cyan-500/20" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-r border-t border-cyan-500/20" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-cyan-500/20" />

              {/* Background glow */}
              <div className="absolute inset-0 bg-cyan-400/3 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-xs text-cyan-500 tracking-[0.2em] uppercase mb-4">
                  ── Initialize
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                  Ready to plug in?
                </h2>
                <p className="font-mono text-sm text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed">
                  Join the alpha. Help us build the future of technical
                  communication. First 1,000 workspaces are free forever.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    size="lg"
                    className="h-12 px-10 font-mono text-sm bg-white text-zinc-950 hover:bg-cyan-400 hover:text-zinc-950 rounded font-bold transition-colors duration-150 shadow-[0_0_48px_-8px_rgba(6,182,212,0.6)]"
                  >
                    Create Workspace
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-10 font-mono text-sm border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-all"
                  >
                    Read the Docs
                  </Button>
                </div>

                <p className="mt-6 font-mono text-[11px] text-zinc-700">
                  No credit card · Self-host option available · Open protocol
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
