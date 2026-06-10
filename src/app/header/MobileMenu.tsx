// components/MobileMenu.tsx
import { useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container fade + slide in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          ease: "power3.out",
        },
      );

      // Stagger nav items
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.1,
        },
      );

      // Bottom section
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: "power3.out",
          delay: 0.1 + LINKS.length * 0.07,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const close = (cb?: () => void) => {
    const ctx = gsap.context(() => {
      // Reverse stagger on exit
      gsap.to([...itemsRef.current].reverse(), {
        opacity: 0,
        y: 8,
        duration: 0.15,
        stagger: 0.04,
        ease: "power2.in",
      });
      gsap.to(bottomRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.15,
        ease: "power2.in",
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.22,
        delay: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setIsOpen(false);
          cb?.();
        },
      });
    });
    return () => ctx.revert();
  };

  const setItemRef = (el: HTMLElement | null, i: number) => {
    if (el) itemsRef.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      className="md:hidden fixed inset-0 top-[60px] z-40 bg-[#02000d] flex flex-col"
      style={{ opacity: 0 }} // start hidden before GSAP kicks in
    >
      {/* Subtle grid texture */}
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
        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          {LINKS.map((link, i) => {
            const inner = (
              <span
                ref={(el) => setItemRef(el as HTMLElement, i)}
                className="group flex items-center justify-between w-full py-4 border-b border-white/[0.06]"
                style={{ opacity: 0 }} // start hidden
              >
                <span className="text-[1.5rem] font-sora leading-none tracking-wide text-slate-500 group-hover:text-slate-50 transition-colors duration-200">
                  {link.label}
                </span>
                <span className="text-slate-700 group-hover:text-slate-400 transition-colors duration-200 text-lg leading-none">
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
                onClick={() => close()}
                className="block w-full"
              >
                {inner}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => close(() => navigate({ to: link.to! }))}
                className="block w-full bg-transparent border-none cursor-pointer text-left"
              >
                {inner}
              </button>
            );
          })}
        </nav>

        {/* Bottom auth + footer */}
        <div
          ref={bottomRef}
          className="mt-8 flex flex-col gap-6"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                window.location.href = config.authAppUrl + "/signup";
              }}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-slate-200 transition-colors duration-150 border-none cursor-pointer active:scale-[0.98]"
            >
              Get Started
            </button>

            <button
              onClick={() => window.location.replace(config.iamAppUrl)}
              className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-widest text-slate-400 hover:text-slate-50 hover:bg-white/[0.06] transition-all duration-150 bg-transparent border border-white/[0.08] cursor-pointer"
            >
              LOGIN
            </button>
          </div>

          <p className="text-center text-[0.7rem] tracking-widest uppercase text-slate-700 select-none">
            © {new Date().getFullYear()} Sharpnr · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
