import { useNavigate } from "@tanstack/react-router";
import { config } from "@/configs/env";

interface MobileMenuProps {
  setIsOpen: (v: boolean) => void;
}

const LINKS = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com" },
];

export function MobileMenu({ setIsOpen }: MobileMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 z-40 bg-[#0a0a12] flex flex-col border-t border-white/[0.05] animate-in fade-in duration-150">
      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex flex-col flex-1 px-5 pt-4 pb-8 overflow-y-auto">
        <nav className="flex flex-col flex-1">
          {LINKS.map((link) => {
            const row = (
              <span className="group flex items-center justify-between w-full py-[14px] border-b border-white/[0.05]">
                <span className="text-[1.35rem] font-medium leading-none text-slate-600 group-hover:text-accent transition-colors duration-150">
                  {link.label}
                </span>
                <span className="text-base transition-colors duration-150 text-slate-800 group-hover:text-accent">
                  ↗
                </span>
              </span>
            );

            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="block no-underline"
              >
                {row}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => {
                  setIsOpen(false);
                  navigate({ to: link.to! });
                }}
                className="block w-full p-0 text-left bg-transparent border-none cursor-pointer"
              >
                {row}
              </button>
            );
          })}
        </nav>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-white active:scale-[0.98] transition-all duration-150"
          >
            Get Started
          </button>
          <button
            onClick={() => window.location.replace(config.iamAppUrl)}
            className="w-full py-3.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-100 hover:bg-white/[0.05] transition-all duration-150 border border-white/[0.07]"
          >
            Log in
          </button>
        </div>

        <p className="mt-6 text-center text-[0.65rem] tracking-[0.12em] uppercase text-slate-800 select-none">
          © {new Date().getFullYear()} Sharpnr · All rights reserved
        </p>
      </div>
    </div>
  );
}
