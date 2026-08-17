"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@sharpnr/ui";
import { LAUNCHER_SECTIONS, type LauncherItem } from "./launcher.config";

/* =========================================================
   THEME — lifted from SharpnrSidebarFooter
========================================================= */

const NAVY = "#0B0D2E";
const NAVY_BRIGHT = "#1E2260";
const WHITE = "#F0F2F7";
const WHITE_DIM = "rgba(240,242,247,0.55)";

/* =========================================================
   FLOATING PARTICLE — same as sidebar footer
========================================================= */

function Particle({
  x,
  y,
  size,
  duration,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: WHITE,
      }}
      animate={{
        y: [0, -14, 0],
        x: [0, 3, -3, 0],
        opacity: [0, 0.45, 0],
        scale: [0.4, 1, 0.4],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const PARTICLES = [
  { x: 8, y: 82, size: 2.5, duration: 3.4, delay: 0 },
  { x: 28, y: 65, size: 1.8, duration: 2.9, delay: 0.6 },
  { x: 55, y: 75, size: 3, duration: 3.7, delay: 1.2 },
  { x: 78, y: 55, size: 2, duration: 2.6, delay: 0.2 },
  { x: 48, y: 88, size: 2.5, duration: 3.1, delay: 1.9 },
  { x: 92, y: 70, size: 1.8, duration: 3.0, delay: 0.9 },
  { x: 18, y: 30, size: 2, duration: 3.3, delay: 1.5 },
  { x: 68, y: 20, size: 1.5, duration: 2.7, delay: 0.4 },
  { x: 38, y: 45, size: 2.2, duration: 3.6, delay: 2.1 },
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: -10,
    filter: "blur(6px)",
    transformOrigin: "top right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 30,
      mass: 0.7,
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -6,
    filter: "blur(4px)",
    transition: { duration: 0.13, ease: "easeIn" },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 26,
      staggerChildren: 0.04,
    },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 440, damping: 24 },
  },
};

/* =========================================================
   SERVICE TILE (grid)
========================================================= */

function ServiceTile({
  item,
  onClick,
}: {
  item: LauncherItem;
  onClick: () => void;
}) {
  return (
    <motion.button
      variants={tileVariants}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-start gap-2.5 rounded-xl p-2.5 text-left focus-visible:outline-none"
      style={{ transition: "background 150ms" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(240,242,247,0.05)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        className="relative flex h-10 w-10 items-center justify-center rounded-[10px] transition-all duration-200"
        style={{
          background: "rgba(240,242,247,0.07)",
          boxShadow: `inset 0 0 0 1px rgba(240,242,247,0.10)`,
        }}
      >
        <span
          className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: item.accent }}
        />
        <item.icon
          className="h-4.5 w-4.5 transition-colors duration-150"
          style={{ color: WHITE_DIM }}
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <span
          className="text-[11.5px] font-semibold leading-none"
          style={{ color: WHITE }}
        >
          {item.label}
        </span>
        <span
          className="text-[10px] leading-tight"
          style={{ color: "rgba(240,242,247,0.30)" }}
        >
          {item.description}
        </span>
      </div>
    </motion.button>
  );
}

/* =========================================================
   SERVICE ROW (single-item sections)
========================================================= */

function ServiceRow({
  item,
  onClick,
}: {
  item: LauncherItem;
  onClick: () => void;
}) {
  return (
    <motion.button
      variants={tileVariants}
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className="group flex w-full items-center gap-3 rounded-xl p-2.5 text-left focus-visible:outline-none"
      style={{ transition: "background 150ms" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(240,242,247,0.05)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition-all duration-200"
        style={{
          background: "rgba(240,242,247,0.07)",
          boxShadow: `inset 0 0 0 1px rgba(240,242,247,0.10)`,
        }}
      >
        <span
          className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: item.accent }}
        />
        <item.icon
          className="h-4.5 w-4.5"
          style={{ color: WHITE_DIM }}
          strokeWidth={1.5}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <span
          className="text-[12px] font-semibold leading-none"
          style={{ color: WHITE }}
        >
          {item.label}
        </span>
        <span
          className="text-[10px] leading-tight"
          style={{ color: "rgba(240,242,247,0.30)" }}
        >
          {item.description}
        </span>
      </div>

      <span
        className="ml-auto shrink-0 text-[9px] font-semibold uppercase tracking-widest opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ color: item.accent }}
      >
        Open
      </span>
    </motion.button>
  );
}

/* =========================================================
   TRIGGER
========================================================= */

function Trigger({ open }: { open: boolean }) {
  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");
  return (
    <DropdownMenuTrigger asChild>
      <motion.button
        whileTap={{ scale: 0.9 }}
        aria-label={`Open Sharpnr launcher (${isMac ? "⌘" : "Ctrl"}+M)`}
        className={cn(
          "group relative flex h-8 w-8 items-center justify-center",
          "rounded-full transition-all duration-200 focus-visible:outline-none",
          "ring-1 ring-white/10 hover:ring-white/25",
          open && "ring-white/25",
        )}
      >
        <img
          src="/AppIcon.png"
          alt="Sharpnr"
          className={cn(
            "h-8 w-8 rounded-full transition-all duration-300",
            open
              ? "opacity-100 grayscale-0"
              : "opacity-60 grayscale group-hover:opacity-90 group-hover:grayscale-0",
          )}
        />
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-background"
        />
      </motion.button>
    </DropdownMenuTrigger>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");
  return (
    <div
      className="relative mt-3 flex items-center justify-between pt-3"
      style={{ borderTop: `1px solid rgba(240,242,247,0.08)` }}
    >
      <span
        className="text-[10px] font-medium"
        style={{ color: "rgba(240,242,247,0.22)" }}
      >
        Sharpnr Platform
      </span>
      <div className="flex items-center gap-1">
        {[isMac ? "⌘" : "Ctrl", "M"].map((k) => (
          <kbd
            key={k}
            className="inline-flex h-4.5 items-center rounded px-1.5 font-mono text-[9px]"
            style={{
              border: `1px solid rgba(240,242,247,0.10)`,
              background: "rgba(240,242,247,0.05)",
              color: "rgba(240,242,247,0.22)",
            }}
          >
            {k}
          </kbd>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SharpnrLauncher() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavigate = (to: string) => {
    navigate({ to });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <Trigger open={open} />

      <DropdownMenuContent
        forceMount
        align="end"
        sideOffset={10}
        className="border-0 bg-transparent p-0 shadow-none w-full"
      >
        <AnimatePresence>
          {open && (
            <motion.div
              key="launcher"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-86 origin-top-right overflow-hidden rounded-md p-4"
              style={{
                background: NAVY,
                boxShadow: [
                  "inset 0 0 0 1px rgba(240,242,247,0.10)",
                  "inset 0 1px 0 rgba(240,242,247,0.18)",
                  "0 24px 64px rgba(0,0,8,0.7)",
                ].join(", "),
              }}
            >
              {/* ── Aurora sweep ── */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    `radial-gradient(ellipse at 10% 90%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
                    `radial-gradient(ellipse at 90% 10%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
                    `radial-gradient(ellipse at 10% 90%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* ── Constellation grid ── */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, ${WHITE} 1px, transparent 1px)`,
                  backgroundSize: "14px 14px",
                }}
                animate={{ opacity: [0.03, 0.07, 0.03] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* ── Floating particles ── */}
              {PARTICLES.map((p, i) => (
                <Particle key={i} {...p} />
              ))}

              {/* ── Top shimmer ── */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${WHITE}, transparent)`,
                }}
                animate={{ opacity: [0.2, 0.55, 0.2] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* ── Bottom shimmer ── */}
              <motion.div
                className="absolute bottom-0 left-6 right-6 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${WHITE_DIM}, transparent)`,
                }}
                animate={{ opacity: [0.1, 0.35, 0.1] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* ── All content sits above layers ── */}
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: WHITE_DIM }}
                    >
                      Sharpnr
                    </span>
                    <span
                      className="rounded-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest"
                      style={{
                        background: "rgba(240,242,247,0.08)",
                        color: "rgba(240,242,247,0.28)",
                      }}
                    >
                      Launcher
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-5 w-5 items-center justify-center rounded-md transition-colors"
                    style={{ color: "rgba(240,242,247,0.22)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(240,242,247,0.08)";
                      (e.currentTarget as HTMLElement).style.color = WHITE;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(240,242,247,0.22)";
                    }}
                  >
                    <svg
                      viewBox="0 0 10 10"
                      className="h-2.5 w-2.5"
                      fill="none"
                    >
                      <path
                        d="M1 1l8 8M9 1L1 9"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-4">
                  {LAUNCHER_SECTIONS.map((section, sIdx) => (
                    <motion.div key={section.id} variants={sectionVariants}>
                      <p
                        className="mb-2 px-0.5 text-[9.5px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: "rgba(240,242,247,0.22)" }}
                      >
                        {section.title}
                      </p>

                      {section.items.length === 1 ? (
                        <ServiceRow
                          item={section.items[0]}
                          onClick={() => handleNavigate(section.items[0].to)}
                        />
                      ) : (
                        <div className="grid grid-cols-3 gap-0.5">
                          {section.items.map((item) => (
                            <ServiceTile
                              key={item.id}
                              item={item}
                              onClick={() => handleNavigate(item.to)}
                            />
                          ))}
                        </div>
                      )}

                      {sIdx < LAUNCHER_SECTIONS.length - 1 && (
                        <div
                          className="mt-4"
                          style={{
                            borderTop: `1px solid rgba(240,242,247,0.07)`,
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                <Footer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
