import { useState, useEffect } from "react";
import { ArrowUpRight, Search, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

import { useAccountingStore } from "../store/accounting.store";

const entityTypeColors: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  LIMITED_LIABILITY_PARTNERSHIP: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    dot: "bg-violet-400",
  },

  ONE_PERSON_COMPANY: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    dot: "bg-sky-400",
  },

  PRIVATE_LIMITED_COMPANY: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
};

const getEntityStyle = (type: string) =>
  entityTypeColors[type] ?? {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    dot: "bg-slate-400",
  };

function EntityAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="size-10 rounded-xl bg-linear-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-primary tracking-wider">
        {initials}
      </span>
    </div>
  );
}

export function AccountingLegalEntityPage() {
  const navigate = useNavigate();

  const legalEntities = useAccountingStore(
    (s) => s.legalEntities,
  );

  const setSelectedLegalEntity = useAccountingStore(
    (s) => s.setSelectedLegalEntity,
  );

  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = legalEntities.filter((entity) => {
    const q = query.toLowerCase();

    return (
      entity.display_name.toLowerCase().includes(q) ||
      entity.legal_name.toLowerCase().includes(q) ||
      entity.entity_type.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .font-display {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .font-body {
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .entity-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            hsl(var(--primary)/0.06) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .entity-card:hover::before {
          opacity: 1;
        }

        .glow-line {
          background: linear-gradient(
            90deg,
            transparent,
            hsl(var(--primary)/0.6),
            transparent
          );
        }

        .search-ring:focus-within {
          box-shadow: 0 0 0 3px hsl(var(--primary)/0.15);
        }

        .bg-dots {
          background-image: radial-gradient(
            circle,
            hsl(var(--foreground)/0.06) 1px,
            transparent 1px
          );

          background-size: 24px 24px;
        }
      `}</style>

      <div className="font-body min-h-screen p-6 md:p-10 space-y-12">
        <div className="pointer-events-none fixed inset-0 bg-dots opacity-40 z-0" />

        {/* hero */}
        <motion.div
          className="relative z-10 space-y-6 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: mounted ? 1 : 0,
            y: mounted ? 0 : 24,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
              <Layers className="size-3" />
              Sharp Accounting
            </span>
          </div>

          <div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.1] text-foreground">
              Your financial
              <br />
              <span className="italic text-primary">
                command centre.
              </span>
            </h1>

            <div className="mt-4 h-px w-32 glow-line" />
          </div>

          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Choose a legal entity to manage its books,
            trace every transaction, and generate
            audit-ready reports.
          </p>

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">
              {legalEntities.length}
            </span>

            {legalEntities.length === 1
              ? "entity registered"
              : "entities registered"}
          </div>
        </motion.div>

        {/* search + grid */}
        <motion.div
          className="relative z-10 space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
        >
          {/* search */}
          <div className="search-ring flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm transition-all max-w-sm">
            <Search className="size-4 text-muted-foreground shrink-0" />

            <input
              type="text"
              placeholder="Search entities…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground transition-colors text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center text-muted-foreground text-sm"
              >
                No entities match “{query}”
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((entity, index: number) => {
                  const style = getEntityStyle(
                    entity.entity_type,
                  );

                  return (
                    <motion.div
                      key={entity.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.06,
                        ease: "easeOut",
                      }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <button
                        className="entity-card relative w-full text-left rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        onClick={async () => {
                          setSelectedLegalEntity(entity);
                          await navigate({
                            to: "/overview",
                          });
                        }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <EntityAvatar
                              name={entity.display_name}
                            />

                            <div>
                              <p className="font-semibold text-sm text-foreground leading-tight">
                                {entity.display_name}
                              </p>

                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span
                                  className={`size-1.5 rounded-full ${style.dot}`}
                                />

                                <span
                                  className={`text-xs font-medium ${style.text}`}
                                >
                                  {entity.entity_type}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="size-7 rounded-lg bg-muted/40 border border-border/40 flex items-center justify-center shrink-0">
                            <ArrowUpRight className="size-3.5 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="h-px bg-border/40 mb-4" />

                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {entity.legal_name}
                          </p>

                          <div className="flex items-center justify-between">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium ${style.bg} ${style.text}`}
                            >
                              <span
                                className={`size-1.5 rounded-full ${style.dot}`}
                              />

                              {entity.status
                                ? "Active"
                                : "Inactive"}
                            </span>

                            <span className="text-[10px] text-muted-foreground">
                              {new Date(
                                entity.inc_date,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}