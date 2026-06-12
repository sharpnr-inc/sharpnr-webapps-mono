import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { config } from "@/configs/env";
import { useHeaderAnimation } from "./animations/useHeaderAnimation";
import { useMobileMenuAnimation } from "./animations/useMobileMenuAnimation";

const navLinks = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
] as const;

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useHeaderAnimation({ headerRef, backdropRef });
  useMobileMenuAnimation({ panelRef, listRef, isOpen });

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {/* Scroll backdrop — fades in once the page scrolls */}
      <div
        ref={backdropRef}
        className="absolute inset-0 border-b border-border bg-background/85 backdrop-blur-md"
      />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
        {/* Logo */}
        <Link to="/" aria-label="Sharpnr home" className="flex items-center">
          <img
            src="/sharpnr-logo-white.svg"
            alt="Sharpnr"
            className="h-7 w-auto min-w-[120px]"
          />
        </Link>

        {/* Center nav — desktop */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group relative px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text-dark"
              activeProps={{ className: "!text-primary" }}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-px h-px bg-primary transition-transform duration-300 ${
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
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text-dark"
          >
            Docs &amp; Guides
            <ArrowUpRight className="size-3.5 opacity-60" />
          </a>
        </nav>

        {/* Right buttons — desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={config.authAppUrl}
            className="rounded-md px-4 py-2 text-sm font-medium text-text-dark transition-colors duration-200 hover:bg-primary-light"
          >
            Login
          </a>
          <a
            href={config.authAppUrl + "/signup"}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-light shadow-sm transition-colors duration-200 hover:bg-primary-hover"
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
          className="flex size-10 items-center justify-center rounded-md text-text-dark lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        ref={panelRef}
        className="invisible relative h-0 overflow-hidden border-b border-border bg-background lg:hidden"
      >
        <ul ref={listRef} className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-text-dark transition-colors hover:bg-primary-light"
                activeProps={{ className: "!text-primary bg-primary-light" }}
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
              className="flex items-center gap-1.5 rounded-md px-3 py-3 text-base font-medium text-text-dark transition-colors hover:bg-primary-light"
            >
              Docs &amp; Guides
              <ArrowUpRight className="size-4 opacity-60" />
            </a>
          </li>
          <li className="mt-3 flex flex-col gap-2.5 border-t border-border pt-5">
            <a
              href={config.authAppUrl}
              className="rounded-md border border-border px-4 py-3 text-center text-sm font-medium text-text-dark"
            >
              Login
            </a>
            <a
              href={config.authAppUrl + "/signup"}
              className="rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-text-light"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
