import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";

interface MobileMenuProps {
  setIsOpen: ({}: boolean) => void;
}

export function MobileMenu({ setIsOpen }: MobileMenuProps) {
  const navigate = useNavigate();
  return (
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
            navigate({ to: "/infrastructure" });
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
  );
}

// we can use gsap to jazz it up a littlebit
