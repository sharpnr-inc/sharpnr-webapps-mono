"use client";

import { useState } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Comparison, Faq } from "./comparison";
import {
  Band,
  BrandButton,
  Panel,
  SectionLabel,
  SectionTitle,
  SiloMark,
} from "./brand";

/* ── Content — sourced from the Silo Engine architecture document ── */

const infraStats = [
  { value: "~1 PB", label: "RAID-backed storage" },
  { value: "160 GB", label: "Combined memory" },
  { value: "10", label: "Combined CPUs" },
  { value: "1", label: "Rust binary, systemd" },
];

const pillars = [
  {
    id: "storage",
    name: "Storage",
    lead: "Files, objects, and CDN delivery on storage Silo owns.",
    items: [
      "File & object storage",
      "CDN-backed delivery",
      "Streaming compression (Zstd)",
      "Checksums & integrity",
      "Org / employee quotas",
      "Backups & snapshots",
    ],
  },
  {
    id: "postgres",
    name: "Database",
    lead: "PostgreSQL provisioned as a resource, not handed over as a server.",
    items: [
      "Database provisioning",
      "Scoped PostgreSQL roles",
      "Generated credentials",
      "Database explorer",
      "Schema & index inspection",
      "Point-in-time backups",
    ],
  },
  {
    id: "data",
    name: "Data",
    lead: "Lakes and warehouses built on the same storage foundation.",
    items: [
      "Data lakes",
      "Data warehouses",
      "Parquet datasets",
      "Ingestion & ETL / ELT",
      "Query & analytics",
      "Retention & lifecycle",
    ],
  },
];

const siloOwns = [
  "File storage & metadata",
  "Storage paths & backends",
  "Storage quotas",
  "Checksums & compression",
  "PostgreSQL provisioning",
  "Database credentials",
  "Database explorer APIs",
  "Data lakes & warehouses",
  "Data ingestion",
  "Backups & snapshots",
  "Audit logging",
  "Resource access control",
];

const engineOwns = [
  "Hospitality",
  "Accounting",
  "HR",
  "CRM",
  "Other business modules",
];

const explorerTree = [
  { depth: 0, label: "prod-postgres", tone: "text-chalk" },
  { depth: 1, label: "schemas", tone: "text-chalk-muted" },
  { depth: 2, label: "public", tone: "text-accent-hi" },
  { depth: 3, label: "tables", tone: "text-chalk-muted" },
  { depth: 4, label: "orders", tone: "text-chalk" },
  { depth: 5, label: "columns · 14", tone: "text-chalk-dim" },
  { depth: 5, label: "constraints · 3", tone: "text-chalk-dim" },
  { depth: 5, label: "indexes · 4", tone: "text-chalk-dim" },
  { depth: 5, label: "rows", tone: "text-chalk-dim" },
  { depth: 4, label: "customers", tone: "text-chalk" },
  { depth: 3, label: "views", tone: "text-chalk-muted" },
  { depth: 3, label: "functions", tone: "text-chalk-muted" },
];

const auditEvents = [
  "file.uploaded",
  "file.downloaded",
  "file.deleted",
  "database.created",
  "database.permission_changed",
  "database.schema.modified",
  "storage.quota_changed",
  "lake.created",
  "dataset.ingested",
];

const engineering = [
  {
    title: "Rust · Axum · Tokio",
    body: "A single asynchronous service. Async tasks over the Tokio runtime — never an OS thread per request.",
  },
  {
    title: "Storage behind a trait",
    body: "LocalRaidStorage today; S3, Ceph, or anything else later. The public API does not change when the disks do.",
  },
  {
    title: "Streaming everywhere",
    body: "Reader → compressor → writer. Multi-gigabyte objects are never loaded whole into memory.",
  },
  {
    title: "Explicit dependency injection",
    body: "Config, pools, and backends are constructed once at startup and passed in. No DI framework, no service building its own dependencies.",
  },
  {
    title: "One EngineConfig",
    body: "Environment read once inside the config module, validated at startup, injected everywhere else.",
  },
  {
    title: "OpenAPI as the contract",
    body: "Swagger UI and ReDoc ship with the service. The spec is the interface between Silo and every consumer.",
  },
  {
    title: "Append-oriented audit log",
    body: "Durable infrastructure events with organization, actor, resource, and timestamp. Sensitive payloads stay out.",
  },
  {
    title: "UUID v7 identifiers",
    body: "Time-ordered by default, so identifiers index well without a separate sort key.",
  },
];

const roadmap = [
  {
    phase: "01",
    name: "Foundation",
    state: "current",
    items: [
      "Configuration",
      "Axum server",
      "App state / DI",
      "Error handling",
      "Logging & tracing",
    ],
  },
  {
    phase: "02",
    name: "Storage",
    state: "next",
    items: [
      "Storage backend",
      "Object metadata",
      "Upload / download / delete",
      "Checksums",
      "Compression",
      "Quotas",
    ],
  },
  {
    phase: "03",
    name: "Access",
    state: "planned",
    items: [
      "Authentication",
      "Authorization",
      "CDN integration",
      "Audit logging",
    ],
  },
  {
    phase: "04",
    name: "PostgreSQL",
    state: "planned",
    items: [
      "Provisioning",
      "Roles & credentials",
      "Public DB endpoint",
      "Database explorer",
      "Backups & snapshots",
    ],
  },
  {
    phase: "05",
    name: "Data Lake",
    state: "planned",
    items: [
      "Lake creation",
      "Dataset management",
      "Parquet",
      "Ingestion",
      "Retention",
    ],
  },
  {
    phase: "06",
    name: "Data Warehouse",
    state: "planned",
    items: [
      "Warehouse creation",
      "Lake → warehouse",
      "ETL / ELT",
      "Query engine",
      "Analytics APIs",
    ],
  },
  {
    phase: "07",
    name: "Advanced Data Services",
    state: "planned",
    items: [
      "SQL workspace",
      "Search",
      "Vector storage",
      "AI / RAG infrastructure",
    ],
  },
];

const principles = [
  "Infrastructure is separated from business logic.",
  "Storage sits behind a backend interface.",
  "Configuration is loaded once and injected.",
  "Public URLs never depend on physical filesystem layout.",
  "Large files are processed as streams.",
  "Distributed infrastructure arrives only when it is needed.",
  "Existing open source is reused before anything is reinvented.",
];

export function LandingPage() {
  const [pillar, setPillar] = useState("storage");

  const active = pillars.find((p) => p.id === pillar) ?? pillars[0];

  return (
    <div className="overflow-x-hidden bg-ink font-sans text-chalk selection:bg-accent-dark selection:text-ink">
      <Header />

      <main>
        {/* ══ HERO ══ */}
        <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-36 pb-20">
          {/* Oversized mark, bled off the right edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-[0.05] lg:block"
          >
            <SiloMark size={720} band="#FFFFFF" accent="#5A66F0" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,rgba(90,102,240,0.13),transparent)]"
          />

          <div className="rise relative z-10 mx-auto w-full max-w-screen-xl">
            <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-chalk-dim">
              <Band w={26} h={3} />
              Sharpnr · Self-hosted data infrastructure
            </p>

            <h1 className="brand-title max-w-4xl text-[clamp(2.75rem,7.5vw,5.75rem)] leading-[0.94]">
              Infrastructure,
              <br />
              <span className="text-accent-dark">not</span> business logic.
            </h1>

            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-chalk-muted">
              Silo Engine is Sharpnr's self-hosted platform for object storage,
              PostgreSQL provisioning, and data lake infrastructure.
              Organizations create the resources they need without ever touching
              the servers, RAID layout, or storage paths underneath them.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <BrandButton href="#access">Request early access</BrandButton>
              <BrandButton variant="ghost" href="#platform">
                Read the architecture
              </BrandButton>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11px] tracking-wide text-chalk-dim">
              {["Rust + Axum", "PostgreSQL", "RAID-backed", "OpenAPI"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Band w={8} h={2} className="bg-accent-dark/60" />
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ══ INFRASTRUCTURE STRIP ══ */}
        <section className="border-y border-rule bg-ink-raised">
          <div className="mx-auto grid max-w-screen-xl grid-cols-2 md:grid-cols-4">
            {infraStats.map((s, i) => (
              <div
                key={s.label}
                className={`border-rule px-6 py-8 ${
                  i % 2 === 0 ? "border-r" : ""
                } ${i < 2 ? "border-b md:border-b-0" : ""} ${
                  i < infraStats.length - 1 ? "md:border-r" : ""
                }`}
              >
                <div className="brand-title text-[clamp(1.5rem,3vw,2.1rem)] leading-none text-chalk">
                  {s.value}
                </div>
                <div className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk-dim">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-screen-xl border-t border-rule-soft px-6 py-3">
            <p className="font-mono text-[10px] tracking-wide text-chalk-dim">
              Self-hosted physical infrastructure. systemd and Nginx. Kubernetes
              deliberately out of scope for the first version.
            </p>
          </div>
        </section>

        {/* ══ THE BOUNDARY ══ */}
        <section className="border-b border-rule px-6 py-24">
          <div className="mx-auto max-w-screen-xl">
            <SectionLabel>The boundary</SectionLabel>
            <SectionTitle className="max-w-3xl text-balance">
              Sharpnr Engine owns business logic.
              <br />
              <span className="text-chalk-dim">
                Silo owns infrastructure and data.
              </span>
            </SectionTitle>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-chalk-muted">
              Silo is not the Hospitality, Accounting, or HR database. It is the
              layer those applications provision resources from — and the line
              between the two is the single most important decision in the
              architecture.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-px border border-rule bg-rule lg:grid-cols-2">
              <div className="bg-ink p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <SiloMark size={22} />
                  <h3 className="brand-title text-lg text-chalk">
                    Silo Engine owns
                  </h3>
                </div>
                <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {siloOwns.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] text-chalk-muted"
                    >
                      <Band w={8} h={2} className="mt-[7px] bg-accent-dark" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-ink-raised p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-3">
                  <Band w={22} h={5} className="bg-chalk-faint" />
                  <h3 className="brand-title text-lg text-chalk-muted">
                    Sharpnr Engine owns
                  </h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {engineOwns.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] text-chalk-dim"
                    >
                      <Band w={8} h={2} className="mt-[7px] bg-chalk-faint" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-rule pt-6 text-[13px] leading-relaxed text-chalk-dim">
                  Business applications consume Silo resources. They do not
                  reimplement them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PLATFORM ══ */}
        <section id="platform" className="border-b border-rule px-6 py-24">
          <div className="mx-auto max-w-screen-xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionLabel>Platform</SectionLabel>
                <SectionTitle>
                  Three resources.
                  <br />
                  One foundation.
                </SectionTitle>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-chalk-muted">
                Storage, database, and data services are built on the same
                abstraction rather than as unrelated systems bolted together.
              </p>
            </div>

            {/* Pillar switcher */}
            <div className="mt-14 flex flex-wrap gap-px border border-rule bg-rule">
              {pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPillar(p.id)}
                  className={`flex-1 px-6 py-5 text-left transition-colors ${
                    pillar === p.id
                      ? "bg-ink-high"
                      : "bg-ink hover:bg-ink-raised"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Band
                      w={16}
                      h={4}
                      className={
                        pillar === p.id ? "bg-accent-dark" : "bg-chalk-faint"
                      }
                    />
                    <span
                      className={`brand-title text-lg ${
                        pillar === p.id ? "text-chalk" : "text-chalk-dim"
                      }`}
                    >
                      {p.name}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="border-x border-b border-rule bg-ink-high p-8 lg:p-10">
              <p className="max-w-lg text-[15px] leading-relaxed text-chalk">
                {active.lead}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {active.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-rule-soft pb-3 text-[13px] text-chalk-muted"
                  >
                    <Band w={10} h={2} className="bg-accent-dark/70" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ STORAGE ══ */}
        <section
          id="storage"
          className="border-b border-rule bg-ink-raised px-6 py-24"
        >
          <div className="mx-auto max-w-screen-xl">
            <SectionLabel>Object storage</SectionLabel>
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start">
              <div>
                <SectionTitle>
                  A URL that outlives
                  <br />
                  the filesystem.
                </SectionTitle>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-chalk-muted">
                  Public addresses are deliberately independent of where the
                  bytes physically live. Move to a different RAID array, a
                  different backend, or a different datacentre — the URL does
                  not change.
                </p>

                <div className="mt-8 border border-rule bg-ink p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-dim">
                    Public object
                  </p>
                  <p className="mt-3 break-all font-mono text-[13px] leading-relaxed text-chalk">
                    https://cdn.sharpnr.com/
                    <span className="text-accent-hi">org_123</span>/
                    <span className="text-accent-hi">employee_456</span>
                    /profile/
                    <span className="text-chalk-muted">avatar.png</span>
                  </p>
                </div>

                <div className="mt-8">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-dim">
                    Quotas are enforced in Silo, not in the caller
                  </p>
                  <div className="space-y-3">
                    {[
                      { label: "Organization", used: 62, cap: "100 GB" },
                      { label: "Employee A", used: 85, cap: "20 GB" },
                      { label: "Employee B", used: 30, cap: "10 GB" },
                    ].map((q) => (
                      <div key={q.label}>
                        <div className="mb-1.5 flex items-baseline justify-between font-mono text-[11px]">
                          <span className="text-chalk-muted">{q.label}</span>
                          <span className="text-chalk-dim">{q.cap}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden bg-ink">
                          <div
                            className="fill-bar h-full bg-accent-dark"
                            style={{ width: `${q.used}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <Panel title="Request path" meta="public read">
                  <div className="space-y-0 p-6 font-mono text-[12px]">
                    {[
                      "Public URL",
                      "CDN / Nginx",
                      "Silo Engine",
                      "Storage abstraction",
                      "Physical storage",
                    ].map((step, i, arr) => (
                      <div key={step}>
                        <div className="flex items-center gap-3">
                          <Band
                            w={10}
                            h={3}
                            className={
                              i === 2 ? "bg-accent-dark" : "bg-chalk-faint"
                            }
                          />
                          <span
                            className={
                              i === 2 ? "text-accent-hi" : "text-chalk-muted"
                            }
                          >
                            {step}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <div className="ml-[4px] h-4 w-px bg-rule" />
                        )}
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="Storage backend" meta="trait">
                  <div className="p-6 font-mono text-[12px] leading-relaxed">
                    <p className="text-chalk">StorageBackend</p>
                    <p className="mt-1 text-accent-hi">
                      ├── LocalRaidStorage{" "}
                      <span className="text-chalk-dim">// initial target</span>
                    </p>
                    <p className="text-chalk-dim">├── S3Storage</p>
                    <p className="text-chalk-dim">├── CephStorage</p>
                    <p className="text-chalk-dim">└── …</p>
                  </div>
                </Panel>

                <div className="grid grid-cols-2 gap-px border border-rule bg-rule">
                  {[
                    {
                      t: "Checksums",
                      d: "Computed on the upload stream for integrity, dedupe, and audit.",
                    },
                    {
                      t: "Compression",
                      d: "Zstd first, behind a trait. Already-compressed formats are skipped.",
                    },
                  ].map((c) => (
                    <div key={c.t} className="bg-ink p-5">
                      <h3 className="brand-title text-sm text-chalk">{c.t}</h3>
                      <p className="mt-2 text-[12px] leading-relaxed text-chalk-dim">
                        {c.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ POSTGRESQL ══ */}
        <section id="postgres" className="border-b border-rule px-6 py-24">
          <div className="mx-auto max-w-screen-xl">
            <SectionLabel>PostgreSQL as a service</SectionLabel>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionTitle>
                A database, not
                <br />a superuser.
              </SectionTitle>
              <p className="max-w-sm text-sm leading-relaxed text-chalk-muted">
                Organizations receive scoped roles and a connection string. The
                physical cluster stays an implementation detail — and nobody
                gets superuser.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <Panel title="Provisioning" meta="POST /v1/databases">
                <div className="p-6 font-mono text-[12px] leading-relaxed">
                  {[
                    "Create database",
                    "Create PostgreSQL roles",
                    "Apply permissions",
                    "Generate credentials",
                    "Return connection information",
                  ].map((s, i, arr) => (
                    <p key={s} className="text-chalk-muted">
                      <span className="text-chalk-faint">
                        {i === arr.length - 1 ? "└──" : "├──"}
                      </span>{" "}
                      {s}
                    </p>
                  ))}
                  <div className="mt-6 border-t border-rule pt-5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-chalk-dim">
                      Returned
                    </p>
                    <p className="mt-2.5 break-all text-[12px] leading-relaxed text-chalk">
                      postgres://
                      <span className="text-accent-hi">org_123_app</span>
                      :••••••••@silo-engine-db.sharpnr.com:5432/
                      <span className="text-accent-hi">org_123_db</span>
                    </p>
                    <p className="mt-1 text-[12px] text-chalk-dim">
                      ?sslmode=require
                    </p>
                  </div>
                </div>
              </Panel>

              <Panel title="Scoped roles" meta="least privilege">
                <div className="p-6">
                  <div className="space-y-2.5 font-mono text-[12px]">
                    {[
                      ["org_123_app", "runtime reads & writes"],
                      ["org_123_migrator", "schema changes"],
                      ["org_123_readonly", "reporting"],
                      ["org_123_admin", "org-level administration"],
                    ].map(([role, note]) => (
                      <div
                        key={role}
                        className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule-soft pb-2.5"
                      >
                        <span className="text-chalk">{role}</span>
                        <span className="text-[11px] text-chalk-dim">
                          {note}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between gap-2 pt-1">
                      <span className="text-chalk-faint line-through">
                        postgres
                      </span>
                      <span className="text-[11px] text-accent-hi">
                        never issued
                      </span>
                    </div>
                  </div>
                  <p className="mt-6 border-t border-rule pt-5 text-[12px] leading-relaxed text-chalk-dim">
                    Sharpnr employees are application identities. Silo does not
                    mint a PostgreSQL login for every employee that happens to
                    exist.
                  </p>
                </div>
              </Panel>
            </div>

            {/* Explorer */}
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
              <Panel title="Database explorer" meta="v1 · read-oriented">
                <div className="p-6 font-mono text-[12px]">
                  {explorerTree.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-center py-[3px] ${row.tone}`}
                      style={{ paddingLeft: `${row.depth * 14}px` }}
                    >
                      {row.depth > 0 && (
                        <span className="mr-2 text-chalk-faint">└─</span>
                      )}
                      {row.label}
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="flex flex-col gap-5">
                <div className="border border-rule bg-ink-raised p-7">
                  <h3 className="brand-title text-lg text-chalk">
                    No arbitrary SQL in v1.
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-chalk-muted">
                    The explorer exposes controlled operations over schemas,
                    tables, views, functions, indexes, and constraints. A full
                    SQL workspace comes later, once the controlled explorer is
                    mature.
                  </p>
                  <div className="mt-6 space-y-2 font-mono text-[11px] text-chalk-dim">
                    <p className="flex items-center gap-2.5">
                      <Band w={10} h={2} className="bg-accent-dark" />
                      Browser → HTTPS → Silo Engine → PostgreSQL
                    </p>
                    <p className="flex items-center gap-2.5 text-chalk-dim">
                      <Band w={10} h={2} className="bg-chalk-faint" />
                      Browser ⇸ PostgreSQL — never direct
                    </p>
                  </div>
                </div>

                <Panel title="Audit log" meta="append-oriented">
                  <div className="flex flex-wrap gap-1.5 p-5">
                    {auditEvents.map((e) => (
                      <span
                        key={e}
                        className="border border-rule px-2.5 py-1 font-mono text-[10px] text-chalk-dim"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DATA PLATFORM ══ */}
        <section
          id="data"
          className="border-b border-rule bg-ink-raised px-6 py-24"
        >
          <div className="mx-auto max-w-screen-xl">
            <SectionLabel>Lakes &amp; warehouses</SectionLabel>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionTitle>
                Beyond a
                <br />
                drive clone.
              </SectionTitle>
              <p className="max-w-sm text-sm leading-relaxed text-chalk-muted">
                Raw data lands in a lake, gets transformed, and becomes an
                analytical warehouse — all on the storage foundation Silo
                already manages.
              </p>
            </div>

            {/* Pipeline */}
            <div className="mt-14 grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-5">
              {[
                { k: "Sources", v: "PostgreSQL · files · events · jobs" },
                { k: "Ingest", v: "Scheduled & on-demand" },
                { k: "Data Lake", v: "raw / processed / curated", hot: true },
                { k: "Transform", v: "ETL / ELT to Parquet" },
                { k: "Warehouse", v: "Query & analytics", hot: true },
              ].map((s, i) => (
                <div key={s.k} className="bg-ink p-6">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-chalk-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Band
                      w={12}
                      h={3}
                      className={s.hot ? "bg-accent-dark" : "bg-chalk-faint"}
                    />
                  </div>
                  <p className="brand-title text-[15px] text-chalk">{s.k}</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-chalk-dim">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]">
              <Panel title="Lake layout" meta="acme-analytics">
                <div className="p-6 font-mono text-[12px] leading-[1.9]">
                  <p className="text-chalk">raw/</p>
                  <p className="pl-5 text-chalk-dim">
                    orders/ · customers/ · events/ · payments/
                  </p>
                  <p className="mt-1 text-chalk">processed/</p>
                  <p className="pl-5 text-chalk-dim">orders/ · customers/</p>
                  <p className="mt-1 text-chalk">curated/</p>
                  <p className="pl-5 text-chalk-dim">
                    daily_sales/ · customer_metrics/
                  </p>
                  <p className="mt-5 border-t border-rule pt-4 break-all text-accent-hi">
                    lake://acme/orders/year=2026/month=08/day=10/
                  </p>
                  <p className="mt-2 text-[11px] text-chalk-dim">
                    Partitioning, retention, and lifecycle are Silo's job — not
                    yours.
                  </p>
                </div>
              </Panel>

              <div className="flex flex-col gap-5">
                <Panel title="Dataset formats" meta="parquet primary">
                  <div className="flex flex-wrap gap-1.5 p-5">
                    {["Parquet", "JSON", "JSONL", "CSV", "Avro", "ORC"].map(
                      (f) => (
                        <span
                          key={f}
                          className={`px-3 py-1.5 font-mono text-[11px] ${
                            f === "Parquet"
                              ? "bg-accent-dark text-ink"
                              : "border border-rule text-chalk-dim"
                          }`}
                        >
                          {f}
                        </span>
                      ),
                    )}
                  </div>
                  <p className="border-t border-rule px-5 py-4 text-[12px] leading-relaxed text-chalk-dim">
                    Parquet is columnar and pairs well with analytical query
                    engines, so it leads for analytical workloads.
                  </p>
                </Panel>

                <div className="border border-rule bg-ink p-7">
                  <h3 className="brand-title text-lg text-chalk">
                    Reuse, don't reinvent.
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-chalk-muted">
                    Silo leans on mature open-source engines rather than
                    building an analytical database from scratch. DuckDB is the
                    early candidate for querying Parquet directly; a distributed
                    engine only arrives if the workload genuinely demands one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ ENGINEERING ══ */}
        <section id="engineering" className="border-b border-rule px-6 py-24">
          <div className="mx-auto max-w-screen-xl">
            <SectionLabel>Engineering</SectionLabel>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionTitle>
                How it is
                <br />
                actually built.
              </SectionTitle>
              <p className="max-w-sm text-sm leading-relaxed text-chalk-muted">
                A single Rust crate, an explicit dependency graph, and an
                OpenAPI contract at the edge.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
              {engineering.map((e) => (
                <div
                  key={e.title}
                  className="group bg-ink p-7 transition-colors hover:bg-ink-raised"
                >
                  <Band
                    w={18}
                    h={4}
                    className="mb-5 bg-chalk-faint transition-colors group-hover:bg-accent-dark"
                  />
                  <h3 className="brand-title text-[15px] leading-snug text-chalk">
                    {e.title}
                  </h3>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-chalk-dim">
                    {e.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Principles */}
            <div
              id="api"
              className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]"
            >
              <div className="border border-rule bg-ink-raised p-8">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-dim">
                  Design principles
                </p>
                <ul className="space-y-3">
                  {principles.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-chalk-muted"
                    >
                      <Band w={10} h={2} className="mt-[8px] bg-accent-dark" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <Panel title="Documentation" meta="openapi contract">
                <div className="p-6 font-mono text-[12px]">
                  {[
                    ["/swagger-ui", "Interactive explorer"],
                    ["/redoc", "Reference documentation"],
                    ["/v1/openapi.json", "Machine-readable spec"],
                  ].map(([path, note]) => (
                    <div
                      key={path}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule-soft py-3"
                    >
                      <span className="text-accent-hi">{path}</span>
                      <span className="text-[11px] text-chalk-dim">{note}</span>
                    </div>
                  ))}
                  <p className="mt-5 text-[12px] leading-relaxed text-chalk-dim">
                    The OpenAPI document is the contract between Silo and every
                    consuming Sharpnr service.
                  </p>
                </div>
              </Panel>
            </div>
          </div>
        </section>

        {/* ══ ROADMAP ══ */}
        <section
          id="roadmap"
          className="border-b border-rule bg-ink-raised px-6 py-24"
        >
          <div className="mx-auto max-w-screen-xl">
            <SectionLabel>Roadmap</SectionLabel>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionTitle>
                Incremental,
                <br />
                on purpose.
              </SectionTitle>
              <p className="max-w-sm text-sm leading-relaxed text-chalk-muted">
                Infrastructure is added only when the storage and operational
                model underneath it can carry the weight. Not every phase is
                committed to the first release.
              </p>
            </div>

            <div className="mt-14 border border-rule">
              {roadmap.map((r, i) => (
                <div
                  key={r.phase}
                  className={`grid grid-cols-1 gap-4 p-6 md:grid-cols-[auto_200px_1fr_auto] md:items-center md:gap-8 ${
                    i > 0 ? "border-t border-rule" : ""
                  } ${r.state === "current" ? "bg-ink" : ""}`}
                >
                  <span
                    className={`brand-title text-2xl ${
                      r.state === "current"
                        ? "text-accent-dark"
                        : "text-chalk-dim"
                    }`}
                  >
                    {r.phase}
                  </span>

                  <span className="flex items-center gap-3">
                    <Band
                      w={14}
                      h={4}
                      className={
                        r.state === "current"
                          ? "bg-accent-dark"
                          : r.state === "next"
                            ? "bg-chalk-dim"
                            : "bg-chalk-faint"
                      }
                    />
                    <span
                      className={`brand-title text-[15px] ${
                        r.state === "planned" ? "text-chalk-dim" : "text-chalk"
                      }`}
                    >
                      {r.name}
                    </span>
                  </span>

                  <span className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-chalk-dim">
                    {r.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </span>

                  <span
                    className={`justify-self-start font-mono text-[10px] uppercase tracking-[0.18em] md:justify-self-end ${
                      r.state === "current"
                        ? "bg-accent-dark px-2.5 py-1 text-ink"
                        : "text-chalk-dim"
                    }`}
                  >
                    {r.state === "current"
                      ? "In progress"
                      : r.state === "next"
                        ? "Next"
                        : "Planned"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Comparison />
        <Faq />

        {/* ══ CTA ══ */}
        <section id="access" className="relative overflow-hidden px-6 py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(90,102,240,0.14),transparent)]"
          />
          <div className="relative mx-auto max-w-screen-xl text-center">
            <div className="mb-8 flex justify-center">
              <SiloMark size={44} />
            </div>
            <h2 className="brand-title mx-auto max-w-4xl text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-chalk">
              Infrastructure your organization creates, manages, and consumes.
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-chalk-muted">
              Without ever managing the physical infrastructure underneath it.
              Silo Engine is early — talk to us about what you need from the
              storage and database layer.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <BrandButton href="mailto:hello@sharpnr.com">
                Talk to the team
              </BrandButton>
              <BrandButton variant="ghost" href="#platform">
                Review the architecture
              </BrandButton>
            </div>
            <p className="mt-8 font-mono text-[11px] tracking-wide text-chalk-dim">
              Self-hosted · Rust · PostgreSQL · No Kubernetes required
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
