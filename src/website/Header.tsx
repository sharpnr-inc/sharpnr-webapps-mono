import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* ── Logo ── */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Sharpnr Cables home"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded bg-white group-hover:bg-cyan-400 transition-colors duration-200">
              <Zap size={16} className="text-zinc-950 fill-zinc-950" />
              {/* pulse ring */}
              <span className="absolute inset-0 rounded animate-ping bg-cyan-400/20 group-hover:bg-cyan-400/40" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Sharpnr
              </span>
              <span className="font-mono text-base font-bold tracking-tight text-white">
                Cables
              </span>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary"
          >
            {NAV.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative font-mono text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded transition-colors duration-150 group"
              >
                <span className="absolute inset-x-3 bottom-0 h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                {label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 rounded"
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="font-mono bg-white text-zinc-950 hover:bg-cyan-400 hover:text-zinc-950 rounded px-5 transition-colors duration-150 font-semibold"
            >
              Get started
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 inset-x-0 z-40 bg-zinc-950 border-b border-zinc-800 md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {NAV.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 px-3 py-2.5 rounded transition-colors"
                >
                  <span className="text-cyan-500 mr-2 select-none">›</span>
                  {label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="font-mono justify-start text-zinc-400 hover:text-white hover:bg-zinc-900 rounded"
                >
                  Log in
                </Button>
                <Button className="font-mono bg-white text-zinc-950 hover:bg-cyan-400 rounded font-semibold">
                  Get started
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
