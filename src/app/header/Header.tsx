import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { config } from "@/configs/env";
import { useMobileMenuAnimation } from "./animations/useMobileMenuAnimation";

/* Navigation per Homepage Strategy: Platform, Products, Industries,
   About, Resources, Docs. No Pricing during Early Access. */
const navLinks = [
  { label: "Platform", to: "/platform" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
] as const;

/**
 * Deep navy navigation — the brand foundation frames every page.
 * Stable, minimal, no scroll tricks (motion guideline: navigation
 * should feel stable).
 */
export function Header() {
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Every route now opens on the same dark canvas, so the navigation behaves
  // identically everywhere: transparent over the hero, solid once the
  // visitor scrolls (Component Language: "Transparent over Hero. Solid after
  // scrolling.").
  //
  // This used to hold a solid --color-navy bar on every route except the
  // homepage. Navy is #03045e and the canvas is #00101f — a visibly brighter,
  // bluer strip sitting above five pages that had since moved onto the
  // canvas. Now there is one treatment, and the solid state is the canvas
  // itself.
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const transparent = !scrolled && !isOpen;

  useMobileMenuAnimation({ panelRef, listRef, isOpen });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-white/[0.07] bg-canvas"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-18 md:px-8">
        {/* Logo */}
        <Link to="/" aria-label="Sharpnr home" className="flex items-center">
          <img
            src="/sharpnr-logo-white.svg"
            alt="Sharpnr"
            className="h-7 w-auto min-w-30"
          />
        </Link>

        {/* Center nav — desktop */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group relative px-3.5 py-2 text-[0.875rem] font-medium tracking-tight text-white/65 transition-colors duration-200 hover:text-white"
              activeProps={{ className: "!text-white" }}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-2 h-px origin-center bg-cyan/80 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </Link>
          ))}
          <a
            href="https://docs.sharpnr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3.5 py-2 text-[0.875rem] font-medium tracking-tight text-white/65 transition-colors duration-200 hover:text-white"
          >
            Docs
            <ArrowUpRight className="size-3.5 opacity-60" />
          </a>
        </nav>

        {/* Right actions — desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={config.authAppUrl}
            className="rounded-none px-3.5 py-2 text-[0.875rem] font-medium tracking-tight text-white/75 transition-colors duration-200 hover:text-white"
          >
            Login
          </a>
          <a
            href={config.authAppUrl + "/signup"}
            className="rounded-none bg-cyan px-4 py-2 text-[0.875rem] font-semibold tracking-tight text-navy transition-colors duration-200 hover:bg-sky"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg text-white lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        ref={panelRef}
        className="invisible relative h-0 overflow-hidden border-b border-white/10 bg-canvas lg:hidden"
      >
        <ul ref={listRef} className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                activeProps={{ className: "!text-white bg-white/10" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://docs.sharpnr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              Docs
              <ArrowUpRight className="size-4 opacity-60" />
            </a>
          </li>
          <li className="mt-3 flex flex-col gap-2.5 border-t border-white/10 pt-5">
            <a
              href={config.authAppUrl}
              className="rounded-lg border border-white/25 px-4 py-3 text-center text-sm font-medium text-white"
            >
              Login
            </a>
            <a
              href={config.authAppUrl + "/signup"}
              className="rounded-lg bg-cyan px-4 py-3 text-center text-sm font-medium text-navy"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
