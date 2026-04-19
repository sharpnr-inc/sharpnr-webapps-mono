import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_SECTIONS } from "./launcher.config";
import type { NavItem } from "./launcher.types";
import type { Variants } from "framer-motion";

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
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
} satisfies Variants;

export const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 26,
    },
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
   SEARCH BAR
========================================================= */

function SearchBar({
  value,
  onChange,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search modules…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-9 w-full rounded-xl border border-border/60 bg-muted/40",
          "pl-8 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/40",
          "outline-none ring-0 transition-all duration-150",
          "focus:border-border focus:bg-muted/60",
        )}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground transition text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* =========================================================
   APP TILE
========================================================= */

function AppTile({ item, onClick }: { item: NavItem; onClick: () => void }) {
  return (
    <motion.button
      key={item.id}
      variants={itemVariants}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="group flex flex-col items-center gap-2 focus-visible:outline-none"
    >
      {/* Icon wrapper */}
      <div
        className={cn(
          "relative flex h-[52px] w-[52px] items-center justify-center",
          "rounded-[14px] border border-border/60 bg-background",
          "text-muted-foreground shadow-sm",
          "transition-all duration-200",
          "group-hover:border-border group-hover:bg-foreground group-hover:text-background group-hover:shadow-md",
        )}
      >
        <item.icon />
        {/* Subtle inner highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-b from-white/10 to-transparent opacity-60" />
      </div>

      {/* Label */}
      <span
        className={cn(
          "max-w-[60px] truncate text-center text-[11px] font-medium leading-tight",
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
   LAUNCHER TRIGGER BUTTON
========================================================= */

function TriggerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
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
        src="/AppIcon.png"
        alt="Sharpnr"
        className={cn(
          "h-8 w-8 rounded-full transition-all duration-300",
          open
            ? "grayscale-0 opacity-100"
            : "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100",
        )}
      />
      {/* Online indicator dot */}
      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
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
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // ── Keyboard shortcut ──────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Click outside to close ─────────────────────────────
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // ── Focus search when panel opens ─────────────────────
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [open]);

  // ── Filter logic ───────────────────────────────────────
  const filteredSections = DEFAULT_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()),
    ),
  })).filter((section) => section.items.length > 0);

  const handleNavigate = (to: string) => {
    navigate({ to });
    setOpen(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* ── Trigger ── */}
      <TriggerButton open={open} onClick={() => setOpen((p) => !p)} />

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="launcher-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "absolute right-0 top-10 z-50",
              "w-6xl origin-top-right",
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

            {/* Search */}
            {/* <SearchBar value={query} onChange={setQuery} inputRef={inputRef} /> */}

            {/* Sections */}
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredSections.length > 0 ? (
                filteredSections.map((section, sIdx) => (
                  <motion.div
                    key={section.id}
                    variants={sectionVariants}
                    className={cn("mb-5 last:mb-0")}
                  >
                    {/* Section label */}
                    <p className="mb-3 px-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/40">
                      {section.title}
                    </p>

                    {/* Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {section.items.map((item) => (
                        <AppTile
                          key={item.id}
                          item={item}
                          onClick={() => handleNavigate(item.to)}
                        />
                      ))}
                    </div>

                    {/* Separator between sections */}
                    {sIdx < filteredSections.length - 1 && (
                      <div className="mt-5 border-t border-border/30" />
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-2 py-8 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <Search className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                  <p className="text-[12px] text-muted-foreground/50">
                    No modules found for{" "}
                    <span className="font-semibold text-muted-foreground">
                      "{query}"
                    </span>
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer hint */}
            <KbdHint />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
