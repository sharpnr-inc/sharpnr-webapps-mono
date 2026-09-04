import { Band, SiloLockup } from "./brand";

const columns = [
  {
    title: "Storage",
    links: [
      "Object storage",
      "S3-compatible API",
      "CDN delivery",
      "Versioning",
      "Quotas",
      "Backups & snapshots",
    ],
  },
  {
    title: "Drive",
    links: [
      "Folders & upload",
      "Previews",
      "Sharing & expiry",
      "Version history",
      "Desktop sync",
    ],
  },
  {
    title: "Databases",
    links: [
      "PostgreSQL provisioning",
      "Scoped roles",
      "Database explorer",
      "Credentials",
      "Audit log",
    ],
  },
  {
    title: "Data",
    links: [
      "Data lakes",
      "Data warehouses",
      "Parquet datasets",
      "Ingestion",
      "Pipelines",
    ],
  },
  {
    title: "Platform",
    links: [
      "All services",
      "API reference",
      "Permissions",
      "Audit log",
      "Sharpnr Suite",
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-ink">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div>
          <a href="/" className="inline-block">
            <SiloLockup descriptor="by Sharpnr" />
          </a>

          <p className="mt-6 max-w-[260px] text-[13px] leading-relaxed text-chalk-dim">
            Sharpnr's all-in-one data platform: object storage, Drive,
            managed PostgreSQL, and a data lake and warehouse on one
            foundation.
          </p>

          <div className="mt-7 flex flex-wrap gap-1.5">
            {["Object storage", "Drive", "PostgreSQL", "Data lake", "CDN"].map((t) => (
              <span
                key={t}
                className="border border-rule px-2.5 py-1 font-mono text-[10px] tracking-wider text-chalk-dim"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-2.5">
            <span className="shear block h-2 w-2 bg-accent-dark" />
            <span className="font-mono text-[11px] tracking-wide text-chalk-dim">
              Early access
            </span>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="mb-5 flex items-center gap-2.5">
              <Band w={12} h={3} className="bg-accent-dark" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-muted">
                {col.title}
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-chalk-dim transition-colors hover:text-chalk"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Band rule — the mark's three bands, stretched full width */}
      <div aria-hidden="true" className="flex h-1 gap-1 overflow-hidden px-6">
        <span className="shear h-full flex-[3] bg-rule" />
        <span className="shear h-full flex-1 bg-accent-dark" />
        <span className="shear h-full flex-[3] bg-rule" />
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3 px-6 py-5">
          <p className="font-mono text-[11px] text-chalk-dim">
            © {year} Sharpnr — Silo
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security", "Status"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-mono text-[11px] text-chalk-dim transition-colors hover:text-chalk-muted"
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
