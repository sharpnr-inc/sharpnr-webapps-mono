import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import Logo from "@/assets/AppIcon.jpg";
import { config } from "@/configs/env";
import { navigationSections } from "../navigation";
import type { NavigationSection } from "../navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSector, setActiveSector] = useState<number>(0);

  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const current = hoveredItem ?? activeSection;
    if (!current || !navRef.current) {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const btn = buttonRefs.current[current];
    const nav = navRef.current;
    if (btn && nav) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    }
  }, [hoveredItem, activeSection]);

  const handleNavEnter = (title: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredItem(title);
    setActiveSection(title);
    setActiveSector(0);
  };

  const handleNavLeave = () => {
    setHoveredItem(null);
    closeTimer.current = setTimeout(() => {
      setActiveSection(null);
    }, 120);
  };

  const handleDropdownEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleDropdownLeave = () => {
    setHoveredItem(null);
    closeTimer.current = setTimeout(() => {
      setActiveSection(null);
    }, 120);
  };

  const staticLinks = [
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  const renderDropdownContent = (section: NavigationSection) => {
    if (section.layout === "sectors") {
      const active = section.items[activeSector];
      return (
        <div className="flex min-h-[300px]">
          {/* Left panel — sector list */}
          <div className="w-52 flex-shrink-0 border-r border-white/5 flex flex-col">
            <div className="px-4 pt-4 pb-3 border-b border-white/5">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
                {section.title}
              </p>
            </div>
            <div className="p-2 flex flex-col gap-0.5 flex-1">
              {section.items.map((item, i) => (
                <button
                  key={item.title}
                  onMouseEnter={() => setActiveSector(i)}
                  onClick={() => {
                    window.location.href = item.href;
                    setActiveSection(null);
                  }}
                  className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-150 border ${
                    activeSector === i
                      ? "bg-white/7 border-white/6 text-white"
                      : "border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/8 text-slate-500 border border-white/5">
                        Soon
                      </span>
                    )}
                    <ChevronRight
                      size={11}
                      className={`transition-opacity ${
                        activeSector === i ? "opacity-50" : "opacity-20"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel — sub-items */}
          <div className="flex-1 flex flex-col">
            {active && (
              <>
                <div className="px-4 pt-4 pb-3 border-b border-white/5">
                  <p className="text-sm font-medium text-slate-200 leading-none mb-1.5">
                    {active.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {active.description}
                  </p>
                </div>
                <div className="p-3 grid grid-cols-3 gap-0.5 content-start flex-1">
                  {active.subItems?.map((sub, i) => (
                    <motion.a
                      key={sub.title}
                      href={sub.href}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.025,
                        duration: 0.15,
                        ease: "easeOut",
                      }}
                      onClick={() => setActiveSection(null)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/6 group/sub transition-all duration-150"
                    >
                      <div className="w-1 h-1 rounded-full bg-slate-600 group-hover/sub:bg-slate-400 flex-shrink-0 transition-colors duration-200" />
                      <span className="text-xs text-slate-400 group-hover/sub:text-slate-200 transition-colors duration-150">
                        {sub.title}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    // Default grid layout (Products, Infrastructure)
    return (
      <>
        <div className="px-5 pt-4 pb-3 border-b border-white/5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            {section.title}
          </p>
        </div>
        <div className="p-3 grid grid-cols-2 gap-1">
          {section.items.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2, ease: "easeOut" }}
              onClick={() => setActiveSection(null)}
              className="group/item flex items-start gap-3 rounded-xl p-3.5 transition-all duration-150 hover:bg-white/5 border border-transparent hover:border-white/6"
            >
              <div className="relative mt-1.5 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover/item:bg-slate-300 transition-colors duration-200" />
                <div className="absolute inset-0 rounded-full bg-slate-400/0 group-hover/item:bg-slate-400/30 scale-0 group-hover/item:scale-[2.5] transition-all duration-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200 group-hover/item:text-white transition-colors leading-none mb-1.5">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 group-hover/item:text-slate-400 transition-colors leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ChevronRight
                size={12}
                className="ml-auto mt-1 text-slate-600 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-200 flex-shrink-0"
              />
            </motion.a>
          ))}
        </div>
      </>
    );
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5 group z-10">
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
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={handleNavLeave}
        >
          {/* Sliding background indicator */}
          <motion.div
            className="absolute top-0 bottom-0 rounded-lg bg-white/[0.07] pointer-events-none"
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
              mass: 0.5,
            }}
          />

          {navigationSections.map((section) => (
            <div
              key={section.title}
              className="relative"
              onMouseEnter={() => handleNavEnter(section.title)}
              onMouseLeave={handleNavLeave}
            >
              <button
                ref={(el) => {
                  buttonRefs.current[section.title] = el;
                }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeSection === section.title
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {section.title}
                <motion.div
                  animate={{
                    rotate: activeSection === section.title ? 180 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDown size={13} className="opacity-60" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeSection === section.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    className={`absolute top-full mt-2 rounded-2xl border border-white/8 bg-slate-950/95 backdrop-blur-2xl overflow-hidden ${
                      section.layout === "sectors"
                        ? "left-1/2 -translate-x-1/2 w-[680px]"
                        : "left-1/2 -translate-x-1/2 w-[580px]"
                    }`}
                    style={{
                      boxShadow:
                        "0 25px 60px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Subtle top glow line */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {renderDropdownContent(section)}

                    {/* Footer CTA */}
                    {section.cta && (
                      <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {section.cta.label}
                        </span>
                        <a
                          href={section.cta.href}
                          className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors group/cta"
                        >
                          {section.cta.action}
                          <ChevronRight
                            size={11}
                            className="group-hover/cta:translate-x-0.5 transition-transform"
                          />
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Static links */}
          {staticLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setHoveredItem(link.name);
                setActiveSection(null);
              }}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 rounded-lg transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="text-sm font-mono text-slate-400 hover:text-slate-50 transition-colors px-3 py-2"
            onClick={() => window.location.replace(config.iamAppUrl)}
          >
            LOGIN
          </button>
          <button
            className="bg-slate-50 text-slate-950 px-5 py-2 text-sm font-mono font-bold hover:bg-white transition-all flex items-center gap-2 group rounded-lg"
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
          >
            GET STARTED
            <ChevronRight
              size={13}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-slate-50 transition-colors p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === section.title ? null : section.title,
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="font-mono uppercase tracking-wider text-xs">
                      {section.title}
                    </span>
                    <motion.div
                      animate={{
                        rotate: mobileExpanded === section.title ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={13} className="opacity-50" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === section.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden ml-2"
                      >
                        {section.layout === "sectors" ? (
                          /* Mobile: sectors — flat list with sub-items nested */
                          <div className="flex flex-col gap-0.5 py-1">
                            {section.items.map((sector) => (
                              <div key={sector.title}>
                                <div className="flex items-center gap-2 px-3 py-2">
                                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono">
                                    {sector.title}
                                  </span>
                                  {sector.badge && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/8 text-slate-500 border border-white/5">
                                      Soon
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-col gap-0.5 ml-2">
                                  {sector.subItems?.map((sub) => (
                                    <a
                                      key={sub.title}
                                      href={sub.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all group/mob"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-slate-700 group-hover/mob:bg-slate-400 flex-shrink-0 transition-colors" />
                                      <span className="text-xs text-slate-400 group-hover/mob:text-slate-200 transition-colors">
                                        {sub.title}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Mobile: default grid items */
                          <div className="flex flex-col gap-0.5 py-1">
                            {section.items.map((item) => (
                              <a
                                key={item.title}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group/mob"
                              >
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 group-hover/mob:bg-slate-400 flex-shrink-0 transition-colors" />
                                <div>
                                  <p className="text-sm text-slate-300 group-hover/mob:text-white transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-slate-600 group-hover/mob:text-slate-500 transition-colors mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {staticLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-3 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}

              <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-2">
                <button className="text-left px-3 py-3 font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                  LOGIN
                </button>
                <button
                  className="bg-slate-50 text-slate-950 p-3.5 font-mono font-bold text-sm text-center rounded-lg hover:bg-white transition-colors"
                  onClick={() =>
                    window.location.replace(config.authAppUrl + "/signup")
                  }
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
