import { motion, AnimatePresence } from "framer-motion";
import {
  Percent,
  CalendarRange,
  SlidersHorizontal,
  Layers,
  IndianRupee,
} from "lucide-react";
import { useTaxCodeStore } from "./store/tax_code.store";

/* ─── helpers ─── */
function fmt(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function rateAccent(rate: number) {
  if (rate <= 5)
    return {
      bar: "from-emerald-400/20 to-transparent",
      badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
      ring: "border-emerald-400/30",
    };
  if (rate <= 12)
    return {
      bar: "from-sky-400/20 to-transparent",
      badge: "bg-sky-400/10 text-sky-400 border-sky-400/20",
      ring: "border-sky-400/30",
    };
  if (rate <= 18)
    return {
      bar: "from-amber-400/20 to-transparent",
      badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
      ring: "border-amber-400/30",
    };
  return {
    bar: "from-rose-400/20 to-transparent",
    badge: "bg-rose-400/10 text-rose-400 border-rose-400/20",
    ring: "border-rose-400/30",
  };
}

function componentColor(code: string) {
  const map: Record<string, string> = {
    CGST: "bg-sky-400/10 text-sky-400 border-sky-400/20",
    SGST: "bg-violet-400/10 text-violet-400 border-violet-400/20",
    IGST: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    CESS: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  };
  return map[code] ?? "bg-muted/50 text-muted-foreground border-border/50";
}

/* ─── sub-components ─── */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-3.5 text-muted-foreground shrink-0" />
      <span className="text-xs text-muted-foreground w-24 shrink-0">
        {label}
      </span>
      <span className="tc-mono text-xs text-foreground font-medium">
        {value}
      </span>
    </div>
  );
}

/* ─── page ─── */
export function CodesDetails() {
  const selected = useTaxCodeStore((s) => s.selectedTaxCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .tc-font  { font-family: 'DM Sans', system-ui, sans-serif; }
        .tc-mono  { font-family: 'DM Mono', 'Courier New', monospace; }
      `}</style>

      <AnimatePresence mode="wait">
        {!selected ? (
          /* ── empty state ── */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tc-font flex flex-col items-center justify-center h-full gap-4 text-center p-8"
          >
            <div className="size-14 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center">
              <Percent className="size-6 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-display italic text-xl text-foreground">
                Select a Tax Code
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Choose any category from the sidebar to inspect its rules and
                components.
              </p>
            </div>
          </motion.div>
        ) : (
          /* ── detail view ── */
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="tc-font h-full overflow-y-auto p-6 space-y-7"
          >
            {/* ── hero ── */}
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="tc-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                    Tax Category
                  </p>
                  <h1 className="font-display italic text-4xl text-foreground leading-tight">
                    {selected.category_name}
                  </h1>
                </div>
                <span className="tc-mono mt-1 px-3 py-1 rounded-full border bg-muted/40 text-xs font-medium text-muted-foreground shrink-0">
                  {selected.code}
                </span>
              </div>

              {/* glow line */}
              <div className="h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent mt-4" />
            </div>

            {/* ── rules ── */}
            <div className="space-y-4">
              <p className="tc-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-2">
                <SlidersHorizontal className="size-3" />
                Tax Rules — {selected.rules.length}
              </p>

              {selected.rules.map((rule, i) => {
                const accent = rateAccent(rule.rate);
                const totalComponents = rule.components.reduce(
                  (s, c) => s + c.rate,
                  0,
                );

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.08 }}
                    className={`relative rounded-2xl border ${accent.ring} bg-background overflow-hidden`}
                  >
                    {/* gradient wash */}
                    <div
                      className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${accent.bar} pointer-events-none`}
                    />

                    <div className="relative p-5 space-y-5">
                      {/* rule header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="tc-mono text-xs font-medium text-foreground">
                            {rule.tax_type}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Rule {i + 1}
                          </p>
                        </div>
                        <span
                          className={`tc-mono text-sm font-semibold px-3 py-1 rounded-xl border ${accent.badge}`}
                        >
                          {rule.rate}%
                        </span>
                      </div>

                      {/* info rows */}
                      <div className="space-y-2.5 py-3 border-y border-border/40">
                        <InfoRow
                          icon={IndianRupee}
                          label="Min value"
                          value={`₹ ${fmt(rule.min_value)}`}
                        />
                        <InfoRow
                          icon={IndianRupee}
                          label="Max value"
                          value={`₹ ${fmt(rule.max_value)}`}
                        />
                        <InfoRow
                          icon={CalendarRange}
                          label="Effective from"
                          value={fmtDate(rule.effective_from)}
                        />
                        <InfoRow
                          icon={CalendarRange}
                          label="Effective to"
                          value={fmtDate(rule.effective_to)}
                        />
                      </div>

                      {/* components */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="flex items-center gap-1.5 text-[10px] tc-mono tracking-widest uppercase text-muted-foreground">
                            <Layers className="size-3" />
                            Components
                          </p>
                          <span className="tc-mono text-[10px] text-muted-foreground">
                            Total = {totalComponents}%
                          </span>
                        </div>

                        <div className="space-y-2">
                          {rule.components.map((comp, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.15 + j * 0.06,
                              }}
                              className="flex items-center gap-3"
                            >
                              {/* rate bar */}
                              <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/50 bg-muted/20">
                                <span
                                  className={`tc-mono text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${componentColor(comp.component_code)}`}
                                >
                                  {comp.component_code}
                                </span>

                                {/* visual bar */}
                                <div className="flex-1 h-1 rounded-full bg-border/40 overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full bg-primary/50"
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${(comp.rate / rule.rate) * 100}%`,
                                    }}
                                    transition={{
                                      duration: 0.5,
                                      delay: 0.2 + j * 0.1,
                                      ease: "easeOut",
                                    }}
                                  />
                                </div>

                                <span className="tc-mono text-xs font-medium text-foreground tabular-nums shrink-0">
                                  {comp.rate}%
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* stack visualisation */}
                        <div className="flex items-center gap-1 mt-1 h-2 rounded-full overflow-hidden bg-border/30">
                          {rule.components.map((comp, j) => {
                            const pct = (comp.rate / rule.rate) * 100;
                            const colors = [
                              "bg-sky-400",
                              "bg-violet-400",
                              "bg-amber-400",
                              "bg-rose-400",
                            ];
                            return (
                              <motion.div
                                key={j}
                                className={`h-full ${colors[j % colors.length]}`}
                                style={{ width: `${pct}%` }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.3 + j * 0.1,
                                  ease: "easeOut",
                                }}
                                title={`${comp.component_code} — ${comp.rate}%`}
                              />
                            );
                          })}
                        </div>
                        <p className="flex gap-3">
                          {rule.components.map((comp, j) => {
                            const colors = [
                              "text-sky-400",
                              "text-violet-400",
                              "text-amber-400",
                              "text-rose-400",
                            ];
                            return (
                              <span
                                key={j}
                                className={`tc-mono text-[10px] ${colors[j % colors.length]}`}
                              >
                                ● {comp.component_code}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
