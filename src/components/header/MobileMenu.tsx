import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";

interface MobileMenuProps {
  setIsOpen: (v: boolean) => void;
}

const LINKS = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: "easeIn",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

export function MobileMenu({ setIsOpen }: MobileMenuProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="md:hidden fixed inset-0 top-[60px] z-40 bg-[#02000d] flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col flex-1 px-6 pt-10 pb-8">
        {/* Nav links — large, editorial */}
        <nav className="flex flex-col gap-1 flex-1">
          {LINKS.map((link) => {
            const content = (
              <motion.span
                className="group flex items-center justify-between w-full
                           py-4 border-b border-white/[0.06]"
                variants={itemVariants}
                key={link.label}
                whileTap={{ x: 4 }}
              >
                <span
                  className="text-[2rem] font-serif tracking-tight leading-none
                             text-slate-500 group-hover:text-slate-50
                             transition-colors duration-200"
                >
                  {link.label}
                </span>

                {/* Arrow */}
                <motion.span
                  className="text-slate-700 group-hover:text-slate-400
                             transition-colors duration-200 text-lg leading-none"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  ↗
                </motion.span>
              </motion.span>
            );

            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-transparent border-none cursor-pointer text-left"
              >
                {content}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => {
                  setIsOpen(false);
                  navigate({ to: link.to! });
                }}
                className="block w-full bg-transparent border-none cursor-pointer text-left"
              >
                {content}
              </button>
            );
          })}
        </nav>

        {/* Bottom auth + footer */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col gap-6"
        >
          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            <motion.button
              onClick={() => {
                window.location.href = config.authAppUrl + "/signup";
              }}
              className="w-full py-3.5 rounded-xl text-sm font-semibold
                         text-slate-900 bg-slate-50 hover:bg-slate-200
                         transition-colors duration-150 border-none cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>

            <button
              onClick={() => window.location.replace(config.iamAppUrl)}
              className="w-full py-3.5 rounded-xl text-sm font-semibold
                         tracking-widest text-slate-400 hover:text-slate-50
                         hover:bg-white/[0.06] transition-all duration-150
                         bg-transparent border border-white/[0.08] cursor-pointer"
            >
              LOGIN
            </button>
          </div>

          {/* Footer micro-text */}
          <p className="text-center text-[0.7rem] tracking-widest uppercase text-slate-700 select-none">
            © {new Date().getFullYear()} Sharpnr · All rights reserved
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
