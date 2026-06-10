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
      <div className="relative flex flex-col flex-1 px-5 pt-2 pb-8 overflow-y-auto">
        <nav className="flex flex-col flex-1">
          {LINKS.map((link) => {
            const row = (
              <span className="group flex items-center justify-between w-full py-[14px] border-b border-white/[0.05]">
                <span className="text-[1.25rem] font-medium leading-none text-slate-500 group-hover:text-white transition-colors duration-150">
                  {link.label}
                </span>
                <span className="text-sm transition-colors duration-150 text-slate-700 group-hover:text-indigo-400">
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
        <div className="mt-8 flex flex-col gap-2.5">
          <button
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
            className="w-full py-3.5 rounded-full text-sm font-semibold text-slate-900 bg-white hover:bg-indigo-50 active:scale-[0.98] transition-all duration-150"
          >
            Start building for free
          </button>
          <button
            onClick={() => window.location.replace(config.iamAppUrl)}
            className="w-full py-3.5 rounded-full text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-150"
          >
            Log in
          </button>
        </div>

        <p className="mt-8 text-center text-[0.65rem] tracking-[0.12em] uppercase text-slate-800 select-none">
          © {new Date().getFullYear()} Sharpnr · All rights reserved
        </p>
      </div>
    </div>
  );
}
