"use client";

import { useEffect, useState } from "react";
import { Band, SiloLockup } from "./brand";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Storage", href: "#storage" },
  { label: "PostgreSQL", href: "#postgres" },
  { label: "Data", href: "#data" },
  { label: "Engineering", href: "#engineering" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Status ticker — reflects the actual build phase, not a release. */}
      <div className="border-b border-rule-soft bg-ink px-4 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-dim">
        <span className="text-accent-hi">Phase 1 · Foundation</span>
        <span className="mx-2.5 text-chalk-dim">/</span>
        Silo Engine is in active architecture &amp; implementation
      </div>

      <header
        className={`border-b transition-colors duration-200 ${
          scrolled
            ? "border-rule bg-ink/92 backdrop-blur-xl"
            : "border-transparent bg-ink"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-6 px-6">
          <a href="/" className="shrink-0">
            <SiloLockup descriptor="by Sharpnr" />
          </a>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            {navItems.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="group relative px-3.5 py-2 text-[13px] tracking-tight text-chalk-muted transition-colors hover:text-chalk"
              >
                {label}
                <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2">
                  <Band
                    w={0}
                    h={2}
                    className="bg-accent-dark transition-[width] duration-200 group-hover:w-4"
                  />
                </span>
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <a
              href="#api"
              className="px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-dim transition-colors hover:text-chalk-muted"
            >
              OpenAPI
            </a>
            <span className="h-4 w-px bg-rule" />
            <a
              href="#access"
              className="group inline-flex items-center gap-2 bg-chalk px-4 py-2 text-[13px] font-medium tracking-tight text-ink transition-colors hover:bg-accent-dark"
            >
              Request access
              <Band
                w={10}
                h={2}
                className="bg-ink transition-[width] duration-200 group-hover:w-4"
              />
            </a>
          </div>

          <button
            className="flex flex-col gap-[5px] p-1 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span
              className={`shear block h-[2px] w-5 bg-chalk-muted transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`shear block h-[2px] w-5 bg-accent-dark transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`shear block h-[2px] w-5 bg-chalk-muted transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="border-b border-rule bg-ink px-6 pb-6 lg:hidden">
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 border-b border-rule-soft py-3.5 text-sm text-chalk-muted transition-colors hover:text-chalk"
            >
              <Band w={10} h={2} className="bg-chalk-faint" />
              {label}
            </a>
          ))}
          <a
            href="#access"
            onClick={() => setMenuOpen(false)}
            className="mt-5 block bg-chalk py-2.5 text-center text-sm font-medium text-ink"
          >
            Request access
          </a>
        </div>
      )}
    </div>
  );
}
