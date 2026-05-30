import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Templates", href: "#templates" },
  { label: "Enterprise", href: "#enterprise" },
];

const FolioLogo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
    <span className="font-body font-semibold tracking-tight text-white leading-none">
      Folio
      <span className="ml-1.5 text-xs font-normal text-white/30 tracking-widest uppercase">
        by Sharpnr
      </span>
    </span>
  </div>
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .font-body { font-family: 'DM Sans', sans-serif; }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-enter { animation: slide-down 0.2s ease forwards; }
      `}</style>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0F]/90 backdrop-blur-md border-b border-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* ── Logo ── */}
          <a href="/" aria-label="Folio home">
            <FolioLogo />
          </a>

          {/* ── Desktop nav ── */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-body text-sm text-white/50 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-150"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── Desktop actions ── */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/login"
              className="font-body text-sm text-white/55 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-150"
            >
              Sign in
            </a>
            <a
              href="/signup"
              className="font-body text-sm font-medium px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 active:scale-[0.97] text-black transition-all duration-150 shadow-[0_0_24px_-6px_rgba(20,184,166,0.6)]"
            >
              Start free
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-px bg-white/70 transition-all duration-200 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white/70 transition-all duration-200 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white/70 transition-all duration-200 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="md:hidden mobile-menu-enter bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/5">
            <nav
              className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm text-white/60 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all"
                >
                  {label}
                </a>
              ))}
              <div className="border-t border-white/8 mt-2 pt-4 flex flex-col gap-2">
                <a
                  href="/login"
                  className="font-body text-sm text-white/55 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all text-center"
                >
                  Sign in
                </a>
                <a
                  href="/signup"
                  className="font-body text-sm font-medium py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black text-center transition-all"
                >
                  Start free
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
