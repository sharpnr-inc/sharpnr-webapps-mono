import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, ExternalLink } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { config } from "@/configs/env";

const NAV_LINKS = [
  { label: "Products",     to: "/products",                  dropdown: true },
  { label: "Services",     to: "/services" },
  { label: "Industries",   to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com", external: true },
];

export function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="relative z-50 w-full border-b border-white/[0.05]">
        <div className="relative mx-auto max-w-7xl flex items-center justify-between h-[60px] px-4 sm:px-6">

          {/* Logo — always left */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/layer1.png"
              alt="Sharpnr"
              className="h-8 w-8 rounded-lg bg-primary object-contain p-1.5"
            />
            <span className="font-serif text-[1.2rem] font-semibold tracking-tight">
              Sharpnr
            </span>
          </a>

          {/* Desktop nav — absolutely centered in the header */}
          <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const content = (
                <span className="flex items-center gap-1.5 px-3.5 py-[7px] rounded-lg text-[0.8125rem] font-medium text-slate-500 hover:text-slate-200 hover:bg-white/[0.055] transition-all duration-150 cursor-pointer select-none">
                  {link.label}
                  {link.dropdown && <ChevronDown className="opacity-50 size-3" />}
                  {link.external && <ExternalLink className="size-3 opacity-40" />}
                </span>
              );

              return link.href ? (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="no-underline">
                  {content}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => navigate({ to: link.to! })}
                  className="p-0 bg-transparent border-none"
                >
                  {content}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center flex-shrink-0 gap-2">
            {/* Desktop CTAs */}
            <button
              onClick={() => window.location.replace(config.iamAppUrl)}
              className="hidden lg:block px-3.5 py-[7px] rounded-lg text-[0.8125rem] font-medium text-slate-500 hover:text-slate-200 border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-150"
            >
              Log in
            </button>
            <button
              onClick={() => { window.location.href = config.authAppUrl + "/signup"; }}
              className="hidden lg:block px-3.5 py-[7px] rounded-lg text-[0.8125rem] font-medium text-white bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] transition-all duration-150"
            >
              Get Started
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer group"
            >
              <span className={`block h-[1.5px] bg-slate-500 group-hover:bg-slate-200 transition-all duration-200 origin-center ${isOpen ? "w-[18px] translate-y-[6.5px] rotate-45" : "w-[18px]"}`} />
              <span className={`block h-[1.5px] bg-slate-500 group-hover:bg-slate-200 transition-all duration-200 ${isOpen ? "w-3 opacity-0" : "w-3"}`} />
              <span className={`block h-[1.5px] bg-slate-500 group-hover:bg-slate-200 transition-all duration-200 origin-center ${isOpen ? "w-[18px] -translate-y-[6.5px] -rotate-45" : "w-[18px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
    </>
  );
}