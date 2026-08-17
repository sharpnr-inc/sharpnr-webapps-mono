import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CablesMark } from "./BrandMark";

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
            ? "bg-ink/90 backdrop-blur-md border-b border-ink-line"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
          {/* ── Logo ── */}
          <a
            href="/"
            className="group flex items-center gap-3"
            aria-label="Cables home"
          >
            <CablesMark className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:scale-105" />
            <span className="flex flex-col leading-none">
              <span className="font-mono text-[9px] font-medium tracking-[0.24em] text-paper-muted uppercase">
                Sharpnr
              </span>
              <span className="font-mono text-base font-bold tracking-tight lowercase text-paper">
                cables
              </span>
            </span>
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
                className="group relative rounded px-3 py-1.5 font-mono text-sm text-paper-dim transition-colors duration-150 hover:text-paper"
              >
                <span className="absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-patch transition-transform duration-200 group-hover:scale-x-100" />
                {label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              onClick={() => console.log()}
              variant="ghost"
              size="sm"
              className="font-mono text-paper-dim hover:bg-ink-raised hover:text-paper"
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="bg-patch px-5 font-mono text-ink transition-colors duration-150 hover:bg-patch/85"
            >
              Get started
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded border border-ink-line text-paper-dim transition-colors hover:border-port hover:text-paper md:hidden"
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
            className="fixed inset-x-0 top-16 z-40 border-b border-ink-line bg-ink md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6">
              {NAV.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded px-3 py-2.5 font-mono text-sm text-paper-dim transition-colors hover:bg-ink-raised hover:text-paper"
                >
                  <span className="mr-2 text-patch select-none">›</span>
                  {label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-ink-line pt-4">
                <Button
                  variant="ghost"
                  className="justify-start font-mono text-paper-dim hover:bg-ink-raised hover:text-paper"
                >
                  Log in
                </Button>
                <Button className="bg-patch font-mono text-ink hover:bg-patch/85">
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
