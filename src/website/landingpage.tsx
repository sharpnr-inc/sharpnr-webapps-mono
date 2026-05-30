"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

const features = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <path
          d="M3 14c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"
          opacity=".5"
        />
      </svg>
    ),
    title: "Distributed File Storage",
    desc: "S3-compatible object storage with multi-region replication, versioning, and lifecycle policies — designed for org-wide access at any scale.",
    tag: "Storage",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" opacity=".5" />
      </svg>
    ),
    title: "Hosted PostgreSQL & MariaDB",
    desc: "Spin up managed Postgres 16 or MariaDB 11 instances in minutes. Point-in-time recovery, read replicas, and connection pooling included.",
    tag: "Database",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Fine-Grain Access Control",
    desc: "RBAC and ABAC policies down to the row and column level. Define exactly who can read, write, or execute — per team, per project, per resource.",
    tag: "Security",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" opacity=".5" />
      </svg>
    ),
    title: "Browser-Based Data Console",
    desc: "Run SQL queries, browse tables, manage schemas, and inspect storage buckets — all from a secure web console with full audit logging.",
    tag: "Console",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          opacity=".5"
        />
      </svg>
    ),
    title: "Team & Org Namespaces",
    desc: "Isolate data across departments, subsidiaries, or client orgs with namespace-level quotas, billing separation, and SSO per domain.",
    tag: "Multi-Tenant",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Observability Built In",
    desc: "Query performance insights, storage I/O metrics, and access pattern analytics — exportable to Grafana, Datadog, or your own stack via OpenTelemetry.",
    tag: "Monitoring",
  },
];

const dbEngines = [
  {
    name: "PostgreSQL",
    version: "16.x",
    icon: "🐘",
    note: "Full extension support",
  },
  {
    name: "MariaDB",
    version: "11.x",
    icon: "🦭",
    note: "Galera cluster ready",
  },
];

const plans = [
  {
    name: "Team",
    price: "$299",
    period: "/mo",
    desc: "For growing teams that need reliable, managed data infrastructure.",
    features: [
      "2 TB storage",
      "3 DB instances",
      "RBAC access control",
      "Daily backups",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Business",
    price: "$899",
    period: "/mo",
    desc: "Advanced controls, higher limits, and priority support.",
    features: [
      "20 TB storage",
      "Unlimited DB instances",
      "ABAC + Row-level security",
      "PITR (30 days)",
      "SSO / SAML",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Dedicated infrastructure, custom SLAs, and white-glove onboarding.",
    features: [
      "Unlimited storage",
      "Dedicated compute",
      "Custom retention",
      "Air-gap / on-prem option",
      "24/7 SRE support",
      "Custom contracts",
    ],
    cta: "Talk to Sales",
    highlight: false,
  },
];

export function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("PostgreSQL");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#050812] text-slate-100 font-sans overflow-x-hidden">
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,210,255,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(0,100,200,0.06),transparent)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        <div
          className={`relative z-10 max-w-4xl text-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-cyan-400/5 border border-cyan-400/15 font-mono text-[11px] text-cyan-400/70 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
            Enterprise Data Infrastructure by SharpNR
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight text-slate-50 mb-6">
            YOUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              DATA.
            </span>
            <br />
            YOUR RULES.
          </h1>

          <p className="text-[clamp(1rem,2vw,1.15rem)] text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Silo is a self-hosted, organization-grade platform for file storage,
            object storage, and managed RDBMS — with fine-grain access control
            built for complex org structures.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:-translate-y-0.5 text-sm tracking-wide">
              Deploy Free Instance
              <span className="text-xs">→</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-400 border border-slate-700/60 hover:border-slate-600 hover:text-slate-200 rounded-lg transition-all bg-white/[0.02]">
              <span className="text-xs opacity-60">▷</span> Watch 3-min Demo
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-700 tracking-wider">
            {[
              "Self-hosted or cloud",
              "SOC 2 Type II",
              "End-to-end encrypted",
              "Open API",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-cyan-400/50">✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-6 py-24 border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase mb-2">
                Capabilities
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight leading-none text-slate-50">
                EVERYTHING YOUR
                <br />
                DATA NEEDS
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              One platform for file storage, object store, and managed databases
              — deeply integrated with org-level access control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-white/[0.04] border border-white/[0.04] rounded-xl overflow-hidden">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 bg-[#050812] hover:bg-slate-900/40 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_0%,rgba(0,210,255,0.04),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-cyan-400">{f.icon}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 border border-slate-800 text-slate-600 rounded tracking-wider">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATABASE ENGINES ── */}
      <section className="px-6 py-24 bg-[#02040D] border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase mb-2">
              Managed RDBMS
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight leading-none text-slate-50 mb-4">
              PICK YOUR
              <br />
              DATABASE ENGINE
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Provision a fully managed Postgres or MariaDB instance in under 60
              seconds. We handle patching, backups, and HA so your team doesn't
              have to.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-8">
            {dbEngines.map((db) => (
              <button
                key={db.name}
                onClick={() => setActiveTab(db.name)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg border transition-all font-mono tracking-wide
                  ${
                    activeTab === db.name
                      ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-300"
                      : "border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                  }`}
              >
                {db.icon} {db.name}
              </button>
            ))}
          </div>

          {/* DB details panel */}
          {dbEngines
            .filter((db) => db.name === activeTab)
            .map((db) => (
              <div
                key={db.name}
                className="rounded-xl border border-cyan-400/10 bg-[#050812] overflow-hidden"
              >
                {/* Fake terminal header */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  <span className="ml-3 font-mono text-xs text-slate-600 tracking-wider">
                    silo — {db.name.toLowerCase()} @ prod-cluster-01
                  </span>
                </div>
                <div className="p-6 font-mono text-sm text-slate-400 space-y-2">
                  <p>
                    <span className="text-cyan-400">$</span> silo db create
                    --engine={db.name.toLowerCase()} --version={db.version}{" "}
                    --tier=business
                  </p>
                  <p className="text-slate-600">
                    → Provisioning instance{" "}
                    <span className="text-slate-400">db-prod-7f3a</span>...
                  </p>
                  <p className="text-slate-600">
                    → Configuring HA with 2 read replicas...
                  </p>
                  <p className="text-slate-600">
                    → Enabling PITR (retention: 30 days)...
                  </p>
                  <p className="text-emerald-400">
                    ✓ Ready in 42s —{" "}
                    <span className="text-slate-400">
                      db-prod-7f3a.silo.internal:5432
                    </span>
                  </p>
                  <p className="text-slate-600 text-xs pt-2">
                    // {db.note} · Automated backups enabled · TLS enforced
                  </p>
                </div>
              </div>
            ))}

          {/* Key DB features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Point-in-time Recovery", sub: "Up to 30-day window" },
              { label: "Connection Pooling", sub: "PgBouncer included" },
              { label: "Read Replicas", sub: "Up to 5 per instance" },
              { label: "Automated Failover", sub: "< 30s RTO" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-lg border border-slate-800/60 bg-white/[0.01]"
              >
                <div className="text-xs font-semibold text-slate-300 mb-1">
                  {item.label}
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESS CONTROL ── */}
      <section className="px-6 py-24 border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase mb-2">
              Access Control
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight leading-none text-slate-50 mb-5">
              FINE-GRAIN
              <br />
              PERMISSIONS
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-md">
              Silo's permission model goes beyond simple RBAC. Define policies
              at the org, team, project, database, table, row, and column level.
              Works with your existing SSO provider.
            </p>
            <ul className="space-y-3">
              {[
                "Role-Based & Attribute-Based access control",
                "Row-level security policies in PostgreSQL",
                "Namespace isolation per team or subsidiary",
                "Full audit log with tamper-evident export",
                "SSO via SAML 2.0, OIDC, or Active Directory",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-400"
                >
                  <span className="text-cyan-400 mt-0.5 text-xs flex-shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Permission visualizer */}
          <div className="rounded-xl border border-slate-800 bg-[#02040D] overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-500 tracking-wider">
                Access Policy Editor
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 rounded">
                Live Preview
              </span>
            </div>
            <div className="p-5 font-mono text-[12px] space-y-1">
              {[
                { depth: 0, label: "org: acme-corp", color: "text-cyan-400" },
                {
                  depth: 1,
                  label: "team: engineering",
                  color: "text-blue-400",
                },
                {
                  depth: 2,
                  label: "db: prod-postgres",
                  color: "text-slate-300",
                },
                {
                  depth: 3,
                  label: "table: orders  →  SELECT, INSERT",
                  color: "text-emerald-400",
                },
                {
                  depth: 3,
                  label: "table: users   →  SELECT (own rows)",
                  color: "text-emerald-400",
                },
                {
                  depth: 3,
                  label: "table: billing →  DENIED",
                  color: "text-red-400/70",
                },
                { depth: 1, label: "team: finance", color: "text-blue-400" },
                {
                  depth: 2,
                  label: "db: prod-postgres",
                  color: "text-slate-300",
                },
                {
                  depth: 3,
                  label: "table: billing →  SELECT, UPDATE",
                  color: "text-emerald-400",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`${row.color}`}
                  style={{ paddingLeft: `${row.depth * 16}px` }}
                >
                  {row.depth > 0 && (
                    <span className="text-slate-700 mr-1">{"└─"}</span>
                  )}
                  {row.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="px-6 py-24 bg-[#02040D] border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase mb-2">
              Pricing
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight leading-none text-slate-50">
              STRAIGHTFORWARD PLANS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-7 border transition-all
                  ${
                    plan.highlight
                      ? "border-cyan-400/30 bg-cyan-400/[0.03] shadow-[0_0_40px_rgba(0,210,255,0.06)]"
                      : "border-slate-800 bg-[#050812]"
                  }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] px-3 py-1 bg-cyan-400 text-slate-950 rounded-full tracking-widest font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-5">
                  <div className="font-display text-sm font-bold tracking-[0.1em] text-slate-400 uppercase mb-2">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-4xl font-extrabold text-slate-50">
                      {plan.price}
                    </span>
                    <span className="text-sm text-slate-600">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-slate-400"
                    >
                      <span className="text-cyan-400 flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all
                    ${
                      plan.highlight
                        ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                        : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100"
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-6 py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.06] via-transparent to-blue-600/[0.04] p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(0,210,255,0.07),transparent)]" />
            <div className="relative">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight text-slate-50 mb-4">
                READY TO OWN
                <br />
                YOUR DATA?
              </h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                Deploy Silo to your infrastructure in under 5 minutes. Bring
                your own cloud or run it on-prem — you're always in control.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="px-7 py-3 font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] text-sm hover:-translate-y-0.5">
                  Start Free — No Credit Card
                </button>
                <button className="px-7 py-3 text-sm font-medium text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200 rounded-lg transition-all">
                  Schedule Architecture Review
                </button>
              </div>
              <p className="mt-5 font-mono text-[11px] text-slate-700">
                Free tier includes 50 GB storage + 1 DB instance · No time limit
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
