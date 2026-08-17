import { motion } from "framer-motion";
import {
  MessageSquare,
  Hash,
  Zap,
  Shield,
  Layers,
  Command,
  ArrowRight,
  Terminal,
  Globe,
  Users,
} from "lucide-react";
import { Button } from "@sharpnr/ui";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CablesMark } from "./BrandMark";

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

const CHANNELS = [
  { name: "general", active: false },
  { name: "backend", active: true },
  { name: "frontend", active: false },
  { name: "deploys", active: false },
  { name: "incidents", active: false },
  { name: "standup", active: false },
];

const MESSAGES = [
  {
    avatar: "MR",
    name: "Marcus R.",
    time: "9:41",
    msg: "PR #247 is ready for review — refactored the auth middleware",
    tone: "bg-port text-paper",
  },
  {
    avatar: "AP",
    name: "Aisha P.",
    time: "9:43",
    msg: "On it. Also — the latency regression in staging is fixed",
    tone: "bg-signal text-paper",
  },
  {
    avatar: "KA",
    name: "Kashif A.",
    time: "9:45",
    msg: "Nice. Deploying to prod after standup ✓",
    tone: "bg-patch text-ink",
  },
];

// ─── Main component ────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="min-h-screen bg-ink font-mono text-paper selection:bg-patch/30 selection:text-paper">
      {/* ─── Brand-scoped styles ─── */}
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Patch bay: a field of unused ports behind the hero. */
        .port-field {
          background-image: radial-gradient(circle at center, rgba(63,58,52,0.55) 1.5px, transparent 1.6px);
          background-size: 28px 28px;
        }
        /* Thin patch-orange caret, scaled off the headline's font size */
        .cursor-blink::after {
          content: '';
          display: inline-block;
          width: 0.075em;
          height: 0.74em;
          margin-left: 0.14em;
          vertical-align: -0.04em;
          background: #D9762F;
          animation: blink 1.1s step-end infinite;
        }
        .cable-rule {
          background: linear-gradient(90deg, transparent, rgba(217,118,47,0.55), transparent);
        }
      `}</style>

      <Header />

      <main className="pt-16">
        {/* ═══════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════ */}
        <section className="port-field relative overflow-hidden">
          {/* Warm patch-orange bloom, kept low so the ink ground stays dominant */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-patch/8 blur-[120px]" />
          <div className="pointer-events-none absolute top-52 left-1/4 h-72 w-72 rounded-full bg-signal/10 blur-[100px]" />
          {/* Fade the port field out toward the fold */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

          <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="flex flex-col items-center gap-7 text-center"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-raised/90 px-3.5 py-1.5 text-[11px] tracking-[0.18em] text-paper-muted uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-bright" />
                  cables.chat
                  <span className="text-port">/</span>
                  now in open beta
                </span>
              </motion.div>

              {/* Animated mark */}
              <motion.div variants={fadeUp}>
                <CablesMark animated className="h-16 w-16 md:h-20 md:w-20" />
              </motion.div>

              {/* Headline — the brand line from the launch card */}
              <motion.div variants={fadeUp} className="max-w-4xl">
                <h1 className="text-4xl leading-[1.02] font-bold tracking-tight text-paper md:text-6xl lg:text-[76px]">
                  Channels that talk{" "}
                  {/* Break only where there's room for the full line */}
                  <br className="hidden md:inline" />
                  to <span className="text-patch">each other</span>
                  <span className="cursor-blink" />
                </h1>
              </motion.div>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="max-w-xl text-sm leading-relaxed text-paper-dim md:text-base"
              >
                A high-bandwidth chat platform bridging structured enterprise
                workspace and fluid community interaction. Patch your people in
                — built for speed, logic, and scale.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="h-12 bg-patch px-8 text-ink shadow-[0_0_40px_-10px_rgba(217,118,47,0.7)] transition-colors duration-150 hover:bg-patch/85"
                >
                  Download for Desktop
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-ink-line px-8 text-paper-dim transition-colors hover:border-port hover:bg-ink-raised hover:text-paper"
                >
                  Open in Browser
                </Button>
              </motion.div>

              {/* App preview */}
              <motion.div variants={fadeUp} className="mt-10 w-full max-w-5xl">
                <div className="overflow-hidden rounded-lg border border-ink-line bg-ink-raised shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9)]">
                  {/* Window chrome — ports, not traffic lights */}
                  <div className="flex h-10 items-center gap-2 border-b border-ink-line px-4">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-port" />
                      <span className="h-2.5 w-2.5 rounded-full bg-port" />
                      <span className="h-2.5 w-2.5 rounded-full bg-patch/70" />
                    </div>
                    <span className="mx-auto text-[10px] tracking-[0.18em] text-paper-muted uppercase">
                      cables.chat/engineering
                    </span>
                  </div>

                  <div className="flex h-80 bg-ink">
                    {/* Org rail */}
                    <div className="flex w-14 flex-col items-center gap-3 border-r border-ink-line bg-ink-sunken py-4">
                      <CablesMark className="h-9 w-9" />
                      <div className="h-4 w-px bg-ink-line" />
                      {["E", "D", "M"].map((l, i) => (
                        <div
                          key={l}
                          className={`flex h-9 w-9 items-center justify-center text-xs font-bold ${
                            i === 0
                              ? "rounded-lg border border-patch/40 bg-patch/15 text-patch"
                              : "rounded-full bg-ink-raised text-paper-muted"
                          }`}
                        >
                          {l}
                        </div>
                      ))}
                      <div className="mt-auto flex h-9 w-9 items-center justify-center rounded-full bg-signal text-[10px] font-bold text-paper">
                        KA
                      </div>
                    </div>

                    {/* Channel sidebar */}
                    <div className="flex w-44 flex-col border-r border-ink-line bg-ink-raised/60">
                      <div className="border-b border-ink-line px-3 py-3">
                        <p className="text-xs font-semibold tracking-wide text-paper">
                          ENGINEERING
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-[10px] text-paper-muted">
                          <span className="h-1 w-1 rounded-full bg-signal-bright" />
                          12 members online
                        </p>
                      </div>
                      <div className="flex-1 space-y-0.5 p-2">
                        {CHANNELS.map(({ name, active }) => (
                          <div
                            key={name}
                            className={`relative cursor-pointer rounded px-2 py-1 text-[11px] ${
                              active
                                ? "bg-ink text-paper"
                                : "text-paper-muted hover:bg-ink/60 hover:text-paper-dim"
                            }`}
                          >
                            {active && (
                              <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-patch" />
                            )}
                            <span className="text-port">#</span> {name}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chat area */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex h-10 items-center gap-2 border-b border-ink-line px-4">
                        <Hash size={13} className="text-port" />
                        <span className="text-xs text-paper-dim">backend</span>
                        <span className="ml-auto text-[10px] text-paper-muted">
                          ⌘K command
                        </span>
                      </div>

                      <div className="flex-1 space-y-4 overflow-hidden p-4">
                        {MESSAGES.map(({ avatar, name, time, msg, tone }) => (
                          <div key={name} className="flex items-start gap-3">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${tone}`}
                            >
                              {avatar}
                            </div>
                            <div className="text-left">
                              <div className="mb-0.5 flex items-baseline gap-2">
                                <span className="text-[11px] font-semibold text-paper-dim">
                                  {name}
                                </span>
                                <span className="text-[10px] text-port">
                                  {time}
                                </span>
                              </div>
                              <p className="text-[11px] leading-relaxed text-paper-muted">
                                {msg}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="px-4 pb-4">
                        <div className="flex h-9 items-center gap-2 rounded border border-ink-line bg-ink-raised/60 px-3">
                          <span className="text-[11px] text-paper-muted">
                            Message #backend
                          </span>
                          <span className="ml-auto text-[10px] text-port">
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
          className="border-y border-ink-line bg-ink-raised/40"
        >
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {INFRA_POINTS.map(({ icon: Icon, label, sub }, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 px-4 py-6 md:px-8 ${
                    i < INFRA_POINTS.length - 1 ? "md:border-r md:border-ink-line" : ""
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-ink-line bg-ink">
                    <Icon size={15} className="text-patch" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-paper">{label}</p>
                    <p className="text-[11px] text-paper-muted">{sub}</p>
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
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 max-w-xl">
              <p className="mb-3 text-xs tracking-[0.2em] text-patch uppercase">
                ── Core modules
              </p>
              <h2 className="text-3xl leading-tight font-bold tracking-tight text-paper md:text-4xl">
                Engineered for Momentum
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                Everything you need from Slack, with the velocity of Discord.
                None of the compromise.
              </p>
            </div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 gap-px bg-ink-line md:grid-cols-2 lg:grid-cols-3"
            >
              {FEATURES.map(({ icon: Icon, title, desc, tag }) => (
                <motion.div
                  key={title}
                  variants={cardVariant}
                  className="group relative overflow-hidden bg-ink p-7 transition-colors duration-200 hover:bg-ink-raised"
                >
                  {/* Patch cable lights up along the top edge on hover */}
                  <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-patch transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded border border-ink-line bg-ink-sunken transition-colors group-hover:border-patch/40">
                      <Icon
                        size={16}
                        className="text-paper-muted transition-colors group-hover:text-patch"
                      />
                    </div>
                    <span className="rounded-sm border border-ink-line px-2 py-0.5 text-[10px] tracking-widest text-port uppercase">
                      {tag}
                    </span>
                  </div>

                  <h3 className="mb-2 text-base font-semibold tracking-tight text-paper">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-paper-dim">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            HOW IT WORKS — the patch bay
        ═══════════════════════════════════════════════════ */}
        <section className="border-t border-ink-line bg-ink-raised/30 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs tracking-[0.2em] text-patch uppercase">
                ── Protocol
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-paper md:text-4xl">
                Plug in. Go live.
              </h2>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3">
              {/* The cable that patches the three steps together */}
              <svg
                className="pointer-events-none absolute inset-x-0 top-2 hidden h-28 w-full md:block"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M200 60 C 320 6, 480 114, 600 60 C 720 6, 880 114, 1000 60"
                  stroke="#D9762F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>

              {STEPS.map(({ num, title, desc }) => (
                <div
                  key={num}
                  className="relative flex flex-col items-center px-8 py-6 text-center"
                >
                  {/* Port */}
                  <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-ink-line bg-ink">
                    <span className="text-lg font-bold text-patch">{num}</span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold tracking-tight text-paper">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-paper-dim">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CTA — paper ground, mirroring the launch card
        ═══════════════════════════════════════════════════ */}
        <section className="border-t border-ink-line py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative overflow-hidden rounded-lg bg-paper p-12 text-center md:p-16">
              {/* Corner ports */}
              <span className="absolute top-6 left-6 h-3 w-3 rounded-full bg-paper-dim" />
              <span className="absolute top-6 right-6 h-3 w-3 rounded-full bg-ink" />
              <span className="absolute bottom-6 left-6 h-3 w-3 rounded-full bg-ink" />
              <span className="absolute right-6 bottom-6 h-3 w-3 rounded-full bg-paper-dim" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <CablesMark
                  ground="paper"
                  className="mx-auto mb-6 h-12 w-12"
                />
                <p className="mb-4 text-xs tracking-[0.2em] text-patch uppercase">
                  ── Patch your people in
                </p>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-ink md:text-5xl">
                  Ready to plug in?
                </h2>
                <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-ink/70">
                  Join the alpha. Help us build the future of technical
                  communication. First 1,000 workspaces are free forever.
                </p>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 bg-ink px-10 text-paper transition-colors duration-150 hover:bg-patch hover:text-ink"
                  >
                    Create Workspace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-ink/25 px-10 text-ink transition-colors hover:border-ink hover:bg-ink/5 hover:text-ink"
                  >
                    Read the Docs
                  </Button>
                </div>

                <p className="mt-6 text-[11px] text-ink/60">
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
