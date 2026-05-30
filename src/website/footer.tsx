export function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Product",
      links: [
        "Overview",
        "File Storage",
        "Object Store",
        "Block Storage",
        "CDN Edge",
      ],
    },
    {
      title: "Databases",
      links: [
        "PostgreSQL",
        "MariaDB",
        "Connection Pooling",
        "Backups & PITR",
        "Read Replicas",
      ],
    },
    {
      title: "Platform",
      links: [
        "Access Control",
        "Audit Logs",
        "Encryption at Rest",
        "SSO & SAML",
        "API Reference",
      ],
    },
    {
      title: "Company",
      links: ["About SharpNR", "Blog", "Changelog", "Status Page", "Contact"],
    },
  ];

  const stats = [
    { value: "99.999%", label: "Uptime SLA" },
    { value: "320 TB+", label: "Data Under Management" },
    { value: "< 2ms", label: "Avg Query Latency" },
    { value: "180+", label: "Org Deployments" },
  ];

  return (
    <footer className="bg-[#02040D] border-t border-cyan-500/[0.07] font-sans">
      {/* Stats strip */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-4 ${i < 3 ? "md:border-r border-white/[0.06]" : ""}`}
            >
              <div className="font-mono text-3xl font-bold text-cyan-400 tracking-tight mb-1">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10">
        {/* Brand */}
        <div>
          <a href="/" className="flex items-center gap-3 mb-5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="24"
                height="24"
                rx="4"
                stroke="rgba(0,210,255,0.3)"
                strokeWidth="1"
              />
              <rect
                x="7"
                y="7"
                width="16"
                height="4"
                rx="1"
                fill="rgba(0,210,255,0.15)"
                stroke="rgba(0,210,255,0.4)"
                strokeWidth="0.75"
              />
              <rect
                x="7"
                y="13"
                width="16"
                height="4"
                rx="1"
                fill="rgba(0,210,255,0.1)"
                stroke="rgba(0,210,255,0.3)"
                strokeWidth="0.75"
              />
              <rect
                x="7"
                y="19"
                width="10"
                height="4"
                rx="1"
                fill="rgba(0,210,255,0.06)"
                stroke="rgba(0,210,255,0.2)"
                strokeWidth="0.75"
              />
              <circle cx="24" cy="21" r="3" fill="#00D2FF" opacity="0.9" />
            </svg>
            <div className="flex flex-col gap-px">
              <span className="font-display text-base font-extrabold tracking-[0.12em] text-slate-100 uppercase leading-none">
                Silo
              </span>
              <span className="font-mono text-[10px] text-cyan-400/50 tracking-widest leading-none">
                by SharpNR
              </span>
            </div>
          </a>

          <p className="text-sm text-slate-600 leading-relaxed max-w-[240px] mb-6">
            Enterprise-grade data infrastructure. File storage, object store,
            and hosted RDBMS — all under one roof with fine-grain access
            control.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {["SOC 2 Type II", "ISO 27001", "HIPAA Ready", "GDPR"].map((b) => (
              <span
                key={b}
                className="font-mono text-[10px] px-2.5 py-1 border border-cyan-400/15 text-cyan-400/60 rounded tracking-wider"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            {["GH", "𝕏", "in", "YT"].map((s) => (
              <button
                key={s}
                className="w-8 h-8 flex items-center justify-center text-[11px] font-bold text-slate-600 border border-slate-800 rounded hover:border-cyan-400/30 hover:text-cyan-400/60 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-300 mb-4">
              {col.title}
            </div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-slate-700">
            © {year} SharpNR Technologies, Inc. — Silo is a registered product.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Security", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-mono text-[11px] text-slate-800 hover:text-slate-600 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
