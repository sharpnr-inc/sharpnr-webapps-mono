import { Zap } from "lucide-react";

const FOOTER_COLS = [
  {
    heading: "Product",
    links: ["Features", "Infrastructure", "Changelog", "Roadmap", "Status"],
  },
  {
    heading: "Developers",
    links: [
      "Documentation",
      "API Reference",
      "SDKs",
      "Webhooks",
      "Open Source",
    ],
  },
  {
    heading: "Company",
    links: ["About Sharpnr", "Blog", "Careers", "Press", "Contact"],
  },
  {
    heading: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Security",
      "Cookies",
      "GDPR",
    ],
  },
];

const SOCIALS = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <path
          d="M11.89 1.5h2.16L9.38 6.68 14.5 13.5h-3.95L7.38 9.56l-3.6 3.94H1.62l5.01-5.5L1.5 1.5h4.06l2.77 3.66 3.56-3.66Zm-.76 10.8h1.2L3.93 2.7H2.63l8.5 9.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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
    label: "Discord",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M13.55 3.07A13.4 13.4 0 0010.28 2c-.14.25-.3.6-.41.87a12.4 12.4 0 00-3.74 0A9.18 9.18 0 005.72 2 13.37 13.37 0 002.44 3.08C.35 6.17-.21 9.19.07 12.16c1.4 1.02 2.75 1.64 4.09 2.05.33-.45.63-.93.88-1.43-.48-.18-.94-.4-1.38-.67l.35-.27a9.56 9.56 0 008 0l.35.27c-.44.26-.9.49-1.38.66.25.5.54.98.88 1.43 1.34-.4 2.7-1.03 4.08-2.05.33-3.44-.57-6.43-2.39-9.08zM5.35 10.3c-.81 0-1.47-.74-1.47-1.65s.64-1.65 1.47-1.65c.82 0 1.49.74 1.47 1.65 0 .91-.65 1.65-1.47 1.65zm5.3 0c-.81 0-1.47-.74-1.47-1.65s.64-1.65 1.47-1.65c.83 0 1.49.74 1.47 1.65 0 .91-.64 1.65-1.47 1.65z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/60 font-mono">
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white">
                <Zap size={16} className="text-zinc-950 fill-zinc-950" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                  Sharpnr
                </span>
                <span className="text-base font-bold tracking-tight text-white">
                  Cables
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
              High-bandwidth chat infrastructure for modern engineering teams
              and communities.
            </p>

            {/* Status pill */}
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 rounded-full px-3 py-1.5 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems nominal
            </a>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 hover:bg-zinc-900 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="col-span-1">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-zinc-500 uppercase mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: copyright */}
          <p className="text-[11px] text-zinc-600 tracking-widest uppercase order-2 sm:order-1">
            © {new Date().getFullYear()} Sharpnr Orchestration Engine
          </p>

          {/* Center: version tag */}
          <div className="order-1 sm:order-2">
            <span className="text-[10px] border border-zinc-800 text-zinc-600 px-2 py-0.5 rounded-sm tracking-widest uppercase">
              v1.0.0-alpha
            </span>
          </div>

          {/* Right: legal links */}
          <div className="flex items-center gap-5 order-3">
            {["Privacy", "Terms", "Security"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors tracking-wide"
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
