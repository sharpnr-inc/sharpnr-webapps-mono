import { useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com" },
];

export function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

  return (
    <header ref={headerRef} className=" z-50 border-b border-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 ">
        {/* ── Logo ──────────────────────────────────────────────── */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            ref={logoImgRef}
            src="/layer1.png"
            alt="Sharpnr"
            className="h-8 w-7 rounded-md cursor-pointer"
          />
          <span className="font-semibold text-lg sm:text-2xl font-serif tracking-tight text-slate-50 select-none">
            Sharpnr
          </span>
        </a>

        <nav ref={navRef} className="hidden lg:flex items-center relative">
          {/* Sliding pill */}
          <span className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg bg-white/[0.07] pointer-events-none transition-all duration-200" />
          {NAV_LINKS.map((link) => {
            const cls = `relative px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-wide
              bg-transparent border-none cursor-pointer rounded-lg transition-colors duration-150
              `;
            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cls}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => navigate({ to: link.to! })}
                className={cls}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile / tablet menu drawer */}
      {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
    </header>
  );
}
