import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_SECTIONS } from "./launcher.config";
import type { NavItem } from "./launcher.types";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

export const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    filter: "blur(4px)",
    transformOrigin: "top right",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 28,
      mass: 0.8,
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -6,
    filter: "blur(3px)",
    transition: { duration: 0.15, ease: "easeIn" },
  },
} satisfies Variants;

export const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 26 },
  },
} satisfies Variants;

export const sectionVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      staggerChildren: 0.05,
    },
  },
} satisfies Variants;

/* =========================================================
   APP TILE
========================================================= */

function AppTile({ item, onClick }: { item: NavItem; onClick: () => void }) {
  return (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="group flex flex-col items-center gap-2 focus-visible:outline-none"
    >
      <div
        className={cn(
          "relative flex h-14 w-14 items-center justify-center",
          "rounded-[14px] border border-border/60 bg-background",
          "text-muted-foreground shadow-sm",
          "transition-all duration-200",
          "group-hover:border-border group-hover:bg-foreground group-hover:text-background group-hover:shadow-md",
        )}
      >
        <item.icon />
        <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-linear-to-b from-white/10 to-transparent opacity-60" />
      </div>
      <span
        className={cn(
          "max-w-16 truncate text-center text-[11px] font-medium leading-tight",
          "text-muted-foreground/70 transition-colors duration-150",
          "group-hover:text-foreground",
        )}
      >
        {item.label}
      </span>
    </motion.button>
  );
}

/* =========================================================
   KEYBOARD HINT
========================================================= */

function KbdHint() {
  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");

  return (
    <div className="mt-4 flex items-center justify-center gap-1.5">
      <kbd className="inline-flex h-5 items-center rounded border border-border/50 bg-muted/50 px-1.5 font-mono text-[10px] text-muted-foreground/50">
        {isMac ? "⌘" : "Ctrl"}
      </kbd>
      <kbd className="inline-flex h-5 items-center rounded border border-border/50 bg-muted/50 px-1.5 font-mono text-[10px] text-muted-foreground/50">
        M
      </kbd>
      <span className="text-[10px] text-muted-foreground/30">to toggle</span>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SharpnrLauncher() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // ── Ctrl/⌘ + M shortcut ───────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((p) => !p);
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
      {/* ── Trigger ── */}
      <DropdownMenuTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.93 }}
          aria-label="Open app launcher (Ctrl+M)"
          className={cn(
            "group relative flex h-8 w-8 items-center justify-center",
            "rounded-full ring-1 ring-border/80 transition-all duration-200",
            "hover:ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            open && "ring-border",
          )}
        >
          <img
            src="https://cdn.sharpnr.com/shicon.svg"
            alt="Sharpnr"
            className={cn(
              "h-8 w-8 rounded-full transition-all duration-300",
              open
                ? "grayscale-0 opacity-100"
                : "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100",
            )}
          />
          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
        </motion.button>
      </DropdownMenuTrigger>

      {/* ── Panel — forceMount so AnimatePresence controls exit ── */}
      <DropdownMenuContent
        forceMount
        align="end"
        sideOffset={8}
        className="p-0 border-0 bg-transparent shadow-none w-full"
      >
        <AnimatePresence>
          {open && (
            <motion.div
              key="launcher-panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "w-80",
                "rounded-2xl border border-border/60 bg-background/90 backdrop-blur-xl",
                "p-4 shadow-2xl shadow-black/10",
              )}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                  Launcher
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground/40 hover:bg-muted hover:text-foreground transition"
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                    <path
                      d="M1 1l10 10M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Sections */}
              <div className="overflow-clip p-1">
                {DEFAULT_SECTIONS.map((section, sIdx) => (
                  <motion.div
                    key={section.id}
                    variants={sectionVariants}
                    className="mb-5 last:mb-0"
                  >
                    <p className="mb-3 px-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/40">
                      {section.title}
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {section.items.map((item) => (
                        <AppTile
                          key={item.id}
                          item={item}
                          onClick={() => handleNavigate(item.to)}
                        />
                      ))}
                    </div>

                    {sIdx < DEFAULT_SECTIONS.length - 1 && (
                      <div className="mt-5 border-t border-border/30" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <KbdHint />
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
