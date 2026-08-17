import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <a href="https://sharpnr.com" className="flex items-center gap-2 group">
          <img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt="Sharpnr Logo"
            className="w-8 h-8 rounded-md object-cover"
          />
          <span className="text-2xl font-semibold tracking-tight text-slate-50">
            Sharpnr
          </span>
        </a>
      </div>
    </motion.header>
  );
}
