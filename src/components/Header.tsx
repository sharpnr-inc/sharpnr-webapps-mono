import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "@/assets/AppIcon.jpg";
import { config } from "@/configs/env";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Platform", href: "#platform" },
    { name: "Products", href: "#products" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2 group">
          <img
            src={Logo}
            alt="Sharpnr Logo"
            className="w-8 h-8 rounded-md object-cover"
          />
          <span className="text-2xl font-serif tracking-tight text-slate-50">
            Sharpnr
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono uppercase tracking-wider text-slate-400 hover:text-slate-50 transition-colors flex items-center gap-1 group"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500">
                [
              </span>
              {link.name}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500">
                ]
              </span>
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="text-sm font-mono text-slate-400 hover:text-slate-50 transition-colors"
            onClick={() => window.location.replace(config.iamAppUrl)}
          >
            LOGIN
          </button>
          <button
            className="bg-slate-50 text-slate-950 px-5 py-2 text-sm font-mono font-bold hover:bg-slate-200 transition-all flex items-center gap-2 group"
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
          >
            GET STARTED
            <ChevronRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-mono uppercase tracking-widest text-slate-300"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-800" />
              <button className="text-left font-mono text-slate-300">
                LOGIN
              </button>
              <button
                className="bg-slate-50 text-slate-950 p-4 font-mono font-bold text-center"
                onClick={() =>
                  window.location.replace(config.authAppUrl + "/signup")
                }
              >
                GET STARTED
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
