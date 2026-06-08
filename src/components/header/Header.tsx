import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { config } from "@/configs/env";
import { useNavigate } from "@tanstack/react-router";
import { MobileMenu } from "./MobileMenu";
import { gsap, useGSAP } from "@/animations/gsap";

const NAV_LINKS = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/infrastructure" },
  { label: "Docs & Guides", href: "https://docs.sharpnr.com" },
];

export function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const getStartedBtnRef = useRef<HTMLButtonElement>(null);
  const getStartedShineRef = useRef<HTMLSpanElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuIconRef = useRef<HTMLSpanElement>(null);
  const scrolled = useRef(false);

  // ── Header entrance ──────────────────────────────────────────────
  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { y: -64, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      );
    },
    { scope: headerRef },
  );

  // ── Scroll backdrop ──────────────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => {
      const should = window.scrollY > 12;
      if (should === scrolled.current) return;
      scrolled.current = should;
      gsap.to(header, {
        borderBottomColor: should ? "rgba(255,255,255,0.08)" : "transparent",
        backgroundColor: should ? "rgba(10,10,20,0.72)" : "transparent",
        backdropFilter: should ? "blur(20px)" : "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Logo hover ───────────────────────────────────────────────────
  useGSAP(
    () => {
      const img = logoImgRef.current;
      if (!img) return;
      const enter = () =>
        gsap.to(img, {
          scale: 1.08,
          rotate: 4,
          duration: 0.35,
          ease: "back.out(2)",
        });
      const leave = () =>
        gsap.to(img, {
          scale: 1,
          rotate: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      img.addEventListener("mouseenter", enter);
      img.addEventListener("mouseleave", leave);
    },
    { scope: logoImgRef },
  );

  // ── Nav pill ─────────────────────────────────────────────────────
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

  // ── Get Started hover ────────────────────────────────────────────
  useGSAP(
    () => {
      const btn = getStartedBtnRef.current;
      const shine = getStartedShineRef.current;
      if (!btn || !shine) return;
      const enter = () => {
        gsap.to(btn, { scale: 1.03, duration: 0.3, ease: "back.out(2)" });
        gsap.fromTo(
          shine,
          { x: "-110%", opacity: 0.6 },
          { x: "110%", opacity: 0, duration: 0.45, ease: "power1.inOut" },
        );
      };
      const leave = () =>
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
      const down = () => gsap.to(btn, { scale: 0.97, duration: 0.1 });
      const up = () =>
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      btn.addEventListener("mousedown", down);
      btn.addEventListener("mouseup", up);
    },
    { scope: getStartedBtnRef },
  );

  // ── Mobile icon swap ─────────────────────────────────────────────
  useGSAP(
    () => {
      const icon = menuIconRef.current;
      if (!icon) return;
      gsap.fromTo(
        icon,
        { opacity: 0, rotate: isOpen ? -90 : 90, scale: 0.8 },
        { opacity: 1, rotate: 0, scale: 1, duration: 0.18, ease: "power2.out" },
      );
    },
    { scope: menuIconRef, dependencies: [isOpen] },
  );

  function handleMenuToggle() {
    const btn = menuBtnRef.current;
    if (btn)
      gsap.fromTo(
        btn,
        { scale: 0.88 },
        { scale: 1, duration: 0.25, ease: "back.out(2)" },
      );
    setIsOpen((prev) => !prev);
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      style={{ opacity: 0 }}
    >
      {/*
        ── Single row, three zones ─────────────────────────────────
        Logo | Nav (hides on mobile) | Actions + Hamburger
        On mobile: Logo left, hamburger right — nothing in between
      */}
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-[60px]">
        {/* ── Logo ──────────────────────────────────────────────── */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            ref={logoImgRef}
            src="/sharpnr_w.svg"
            alt="Sharpnr"
            className="w-30 h-30 sm:w-7 sm:h-7 rounded-md object-cover cursor-pointer"
          />
          <span className="font-semibold text-lg sm:text-2xl font-serif tracking-tight text-slate-50 select-none">
            Sharpnr
          </span>
        </a>

        {/*
          ── Desktop Nav ───────────────────────────────────────────
          Hidden below lg (1024px) — this is the sweet spot where
          the links have enough room to breathe
        */}
        <nav
          ref={navRef}
          className="hidden lg:flex items-center relative"
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
            const cls = `relative px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-wide
              bg-transparent border-none cursor-pointer rounded-lg transition-colors duration-150
              ${isActive ? "text-slate-50" : "text-slate-400 hover:text-slate-200"}`;
            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cls}
                onMouseEnter={(e) => handleNavHover(idx, e.currentTarget)}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => navigate({ to: link.to! })}
                className={cls}
                onMouseEnter={(e) => handleNavHover(idx, e.currentTarget)}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* ── Right side actions ────────────────────────────────── */}
        <div className="flex items-center gap-1">
          {/* LOGIN — hidden on mobile, visible from lg */}
          <button
            onClick={() => window.location.replace(config.iamAppUrl)}
            className="hidden lg:block px-3.5 py-1.5 text-[0.8125rem] font-semibold
                       tracking-widest text-slate-400 hover:text-slate-100 rounded-lg
                       hover:bg-white/[0.06] transition-all duration-150
                       bg-transparent border-none cursor-pointer"
          >
            LOGIN
          </button>

          {/* Get Started — visible on md+ (tablet and up) */}
          <button
            ref={getStartedBtnRef}
            onClick={() => {
              window.location.href = config.authAppUrl + "/signup";
            }}
            className="hidden md:block relative ml-1 px-3 py-1.5 sm:px-4
                       text-[0.75rem] sm:text-[0.8125rem] font-semibold
                       text-slate-900 bg-slate-50 rounded-lg
                       border border-slate-50/80 cursor-pointer overflow-hidden
                       will-change-transform whitespace-nowrap"
            style={{ isolation: "isolate" }}
          >
            <span className="relative z-10">Get Started</span>
            <span
              ref={getStartedShineRef}
              className="pointer-events-none absolute inset-0 -skew-x-12
                         bg-gradient-to-r from-transparent via-white/40 to-transparent
                         -translate-x-full"
              aria-hidden
            />
          </button>

          {/* Hamburger — visible below lg */}
          <button
            ref={menuBtnRef}
            onClick={handleMenuToggle}
            className="lg:hidden text-slate-300 hover:text-slate-50 ml-1
                       transition-colors duration-200 p-1.5
                       bg-transparent border-none cursor-pointer rounded-md
                       hover:bg-white/[0.07]"
            aria-label="Toggle menu"
          >
            <span ref={menuIconRef} className="block" style={{ opacity: 0 }}>
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu drawer */}
      {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
    </header>
  );
}
