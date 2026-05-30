const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Docs", href: "#" },
      { label: "Sheets", href: "#" },
      { label: "Slides", href: "#" },
      { label: "Whiteboard", href: "#" },
      { label: "Canvas", href: "#" },
      { label: "PDF Editor", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
      { label: "Templates", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12.6 1.5h2.3L9.9 7.1 15.5 14.5H11l-3.6-4.7-4.1 4.7H1l5.4-6.1L.5 1.5H5.1l3.3 4.3 4.2-4.3Zm-.8 11.7h1.3L4.2 2.8H2.8l9 10.4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146Zm4.943 12.248V6.169H2.542v7.225h2.401Zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.341-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.015Zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const FolioLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="1"
          width="5"
          height="5"
          rx="1"
          fill="white"
          fillOpacity="0.9"
        />
        <rect
          x="8"
          y="1"
          width="5"
          height="5"
          rx="1"
          fill="white"
          fillOpacity="0.6"
        />
        <rect
          x="1"
          y="8"
          width="5"
          height="5"
          rx="1"
          fill="white"
          fillOpacity="0.6"
        />
        <rect
          x="8"
          y="8"
          width="5"
          height="5"
          rx="1"
          fill="white"
          fillOpacity="0.9"
        />
      </svg>
    </div>
    <span className="font-body font-semibold text-white text-sm">Folio</span>
  </div>
);

export function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <footer className="bg-[#0A0A0F] border-t border-white/5 font-body">
        {/* ── Newsletter strip ── */}
        <div className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-sm font-medium text-white mb-0.5">
                Stay in the loop
              </p>
              <p className="text-xs text-white/35">
                Product updates, tips, and early access to new features.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 sm:w-56 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/25 focus:outline-none focus:border-teal-500/60 focus:bg-white/8 transition-all"
              />
              <button className="h-9 px-4 rounded-lg bg-teal-500 hover:bg-teal-400 active:scale-[0.97] text-black text-sm font-medium transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Main link grid ── */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-6">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-2 pr-0 md:pr-8">
              <FolioLogo />
              <p className="mt-4 text-xs text-white/30 leading-relaxed max-w-[220px]">
                A cloud-based document suite for modern teams — write, design,
                calculate, and collaborate all in one place.
              </p>
              <p className="mt-3 text-xs text-white/20">
                A{" "}
                <a
                  href="#"
                  className="text-white/35 hover:text-teal-400 transition-colors underline underline-offset-2"
                >
                  Sharpnr
                </a>{" "}
                product.
              </p>

              {/* Social icons */}
              <div className="mt-5 flex items-center gap-2">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white/4 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/35 hover:text-white transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="col-span-1">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-white/30 hover:text-white/75 transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/20 order-2 sm:order-1">
              © {new Date().getFullYear()} Sharpnr Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-1 order-1 sm:order-2">
              {/* Status indicator */}
              <a
                href="#"
                className="flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors px-2.5 py-1 rounded-full border border-white/8 hover:border-white/15"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </a>
            </div>

            <div className="flex items-center gap-4 order-3">
              {["Privacy", "Terms", "Security"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs text-white/20 hover:text-white/50 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
