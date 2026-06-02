import { useState } from "react";
import { Menu, X } from "lucide-react";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blend-screen">
      <div className="container mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt="Sharpnr"
            className="w-8 h-8 rounded-md object-cover"
          />
          <span className="text-2xl font-serif tracking-tight text-slate-50">
            Sharpnr
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => navigate({ to: "/products" })}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400
                       hover:text-slate-50 hover:bg-white/[0.06]
                       transition-colors duration-200
                       bg-transparent border-none cursor-pointer"
          >
            Products
          </button>

          <button
            onClick={() => navigate({ to: "/services" })}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400
                       hover:text-slate-50 hover:bg-white/[0.06]
                       transition-colors duration-200
                       bg-transparent border-none cursor-pointer"
          >
            Services
          </button>

          <button
            onClick={() => navigate({ to: "/infra" })}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400
                       hover:text-slate-50 hover:bg-white/[0.06]
                       transition-colors duration-200
                       bg-transparent border-none cursor-pointer"
          >
            Industries
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.location.replace(config.iamAppUrl)}
            className="text-sm font-semibold tracking-widest text-slate-400
                       hover:text-slate-50 transition-colors duration-200
                       bg-transparent border-none cursor-pointer"
          >
            LOGIN
          </button>

          <button
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
            className="text-sm font-semibold text-slate-900 bg-slate-50
                       hover:bg-slate-200 rounded-lg px-4 py-2
                       transition-colors duration-200 border-none cursor-pointer"
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-slate-50
                     transition-colors duration-200 p-1
                     bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/[0.08]">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate({ to: "/products" });
              }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium
                         text-slate-300 hover:text-slate-50 hover:bg-white/[0.06]
                         transition-colors duration-150
                         bg-transparent border-none cursor-pointer"
            >
              Products
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate({ to: "/services" });
              }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium
                         text-slate-300 hover:text-slate-50 hover:bg-white/[0.06]
                         transition-colors duration-150
                         bg-transparent border-none cursor-pointer"
            >
              Services
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate({ to: "/infra" });
              }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium
                         text-slate-300 hover:text-slate-50 hover:bg-white/[0.06]
                         transition-colors duration-150
                         bg-transparent border-none cursor-pointer"
            >
              Infrastructure
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate({ to: "/products" });
              }}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium
                         text-slate-300 hover:text-slate-50 hover:bg-white/[0.06]
                         transition-colors duration-150
                         bg-transparent border-none cursor-pointer"
            >
              Pricing
            </button>

            <div className="mt-3 pt-3 border-t border-white/[0.08] flex gap-3">
              <button
                onClick={() => window.location.replace(config.iamAppUrl)}
                className="text-sm font-semibold tracking-widest text-slate-400
                           hover:text-slate-50 transition-colors duration-200
                           py-2 bg-transparent border-none cursor-pointer"
              >
                LOGIN
              </button>

              <button
                onClick={() => {
                  window.location.href = config.authAppUrl + "/signup";
                }}
                className="text-sm font-semibold text-slate-900 bg-slate-50
                           hover:bg-slate-200 rounded-lg px-4 py-2
                           transition-colors duration-150 border-none cursor-pointer"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
