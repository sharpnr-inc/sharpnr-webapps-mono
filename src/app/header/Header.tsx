// components/Header.tsx
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MobileMenu } from "./MobileMenu";

// If you want zero Framer Motion, replace AnimatePresence with a plain conditional:
// {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
// The exit animation is handled by GSAP inside close() before setIsOpen(false) fires.

const NAV_LINKS = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com" },
];

export function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="z-50 w-full">
        <div className="mx-auto max-w-7xl h-14 grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 justify-self-start">
            <img
              src="/layer1.png"
              alt="Sharpnr"
              className="h-10 w-9 rounded-md bg-primary p-2"
            />
            <span className="font-semibold font-serif text-3xl tracking-tight">
              Sharpnr
            </span>
          </a>

          {/* Centered desktop nav */}
          <nav className="hidden lg:flex items-center justify-center relative">
            {NAV_LINKS.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-lg"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => navigate({ to: link.to! })}
                  className="px-3.5 py-1.5 text-[0.8125rem] font-medium rounded-lg"
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden justify-self-end flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-[1.5px] w-5 bg-slate-300 transition-transform duration-200 origin-center ${
                isOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-slate-300 transition-opacity duration-150 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-slate-300 transition-transform duration-200 origin-center ${
                isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu — no Framer Motion needed; GSAP handles both enter & exit */}
      {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
    </>
  );
}
