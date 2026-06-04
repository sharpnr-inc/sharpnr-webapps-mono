import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";
import { MobileMenu } from "./MobileMenu";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavHover(
    idx: number,
    el: HTMLButtonElement | HTMLAnchorElement,
  ) {
    const navEl = navRef.current;
    if (!navEl) return;
    const navRect = navEl.getBoundingClientRect();
    const btnRect = el.getBoundingClientRect();
    setPillStyle({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
      opacity: 1,
    });
    setActiveIndex(idx);
  }

  function handleNavLeave() {
    setPillStyle((s) => ({ ...s, opacity: 0 }));
    setActiveIndex(null);
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.1] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-[60px]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group shrink-0">
          <motion.img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt="Sharpnr"
            className="w-7 h-7 rounded-md object-cover"
            whileHover={{ scale: 1.08, rotate: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
          <span className="font-semibold text-2xl font-serif tracking-tight text-slate-50 select-none">
            Sharpnr
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center relative"
          onMouseLeave={handleNavLeave}
        >
          {/* Sliding pill */}
          <span
            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg bg-white/[0.07] pointer-events-none transition-all duration-200"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
            }}
          />

          {NAV_LINKS.map((link, idx) => {
            const isActive = activeIndex === idx;
            const commonClass = `relative px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-wide
              transition-colors duration-150 bg-transparent border-none cursor-pointer rounded-lg
              ${isActive ? "text-slate-50" : "text-slate-400 hover:text-slate-200"}`;

            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={commonClass}
                onMouseEnter={(e) => handleNavHover(idx, e.currentTarget)}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => navigate({ to: link.to! })}
                className={commonClass}
                onMouseEnter={(e) => handleNavHover(idx, e.currentTarget)}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => window.location.replace(config.iamAppUrl)}
            className="px-3.5 py-1.5 text-[0.8125rem] font-semibold tracking-widest
                       text-slate-400 hover:text-slate-100 rounded-lg
                       hover:bg-white/[0.06] transition-all duration-150
                       bg-transparent border-none cursor-pointer"
          >
            LOGIN
          </button>

          <motion.button
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
            className="relative ml-1 px-4 py-1.5 text-[0.8125rem] font-semibold
                       text-slate-900 bg-slate-50 rounded-lg
                       border border-slate-50/80 cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
          >
            <span className="relative z-10">Get Started</span>
            {/* subtle shimmer on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
              whileHover={{ translateX: "200%" }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-slate-50
                     transition-colors duration-200 p-1.5
                     bg-transparent border-none cursor-pointer rounded-md hover:bg-white/[0.07]"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "x" : "menu"}
              initial={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
              transition={{ duration: 0.18 }}
              className="block"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </motion.header>
  );
}
