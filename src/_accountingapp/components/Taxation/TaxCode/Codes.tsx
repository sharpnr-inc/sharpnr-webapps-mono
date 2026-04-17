import { useState } from "react";
import { Plus, Search, Inbox, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormsModal } from "@/context/FormModalContext";
import { AddTaxCategoryForm } from "./AddTaxCategoryForm";
import { useTaxCodeStore } from "./store/tax_code.store";

/* colour strip keyed on total rate */
function rateColor(rate: number) {
  if (rate <= 5)
    return {
      bar: "bg-emerald-400",
      badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    };
  if (rate <= 12)
    return {
      bar: "bg-sky-400",
      badge: "bg-sky-400/10 text-sky-400 border-sky-400/20",
    };
  if (rate <= 18)
    return {
      bar: "bg-amber-400",
      badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    };
  return {
    bar: "bg-rose-400",
    badge: "bg-rose-400/10 text-rose-400 border-rose-400/20",
  };
}

export function Codes() {
  const { showModal, closeModal } = useFormsModal();
  const categories = useTaxCodeStore((s) => s.taxCategories);
  const selectedCategory = useTaxCodeStore((s) => s.selectedTaxCategory);
  const selectTaxCategory = useTaxCodeStore((s) => s.selectTaxCategory);
  const [query, setQuery] = useState("");

  const filtered = categories.filter(
    (c) =>
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.category_name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleAdd = () =>
    showModal(
      "Add Tax Category",
      "Define a new tax code, rate, and components.",
      <AddTaxCategoryForm closeModal={closeModal} />,
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .tc-font { font-family: 'DM Sans', system-ui, sans-serif; }
        .tc-mono  { font-family: 'DM Mono', 'Courier New', monospace; }
      `}</style>

      <aside className="tc-font flex flex-col h-full border-r border-border/60 bg-background w-64 shrink-0">
        {/* ── header ── */}
        <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between gap-2">
          <div>
            <p className="tc-mono text-[10px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Tax Codes
            </p>
            <p className="text-xs text-muted-foreground/60 tabular-nums mt-0.5">
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
            title="Add Tax Category"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        {/* ── search ── */}
        <div className="px-3 py-2.5 border-b border-border/40">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/40 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <Search className="size-3 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search codes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="tc-mono w-full bg-transparent text-[11px] outline-none text-foreground placeholder:text-muted-foreground/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── list ── */}
        <ScrollArea className="flex-1">
          <nav className="p-2 space-y-1">
            <AnimatePresence initial={false}>
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 gap-3"
                >
                  <Inbox className="size-8 text-muted-foreground/30" />
                  <p className="text-xs text-muted-foreground">
                    {query ? `No results for "${query}"` : "No tax codes yet"}
                  </p>
                  {!query && (
                    <button
                      onClick={handleAdd}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      <Plus className="size-3" /> Add Category
                    </button>
                  )}
                </motion.div>
              ) : (
                filtered.map((cat, i) => {
                  const maxRate = Math.max(
                    ...(cat.rules?.map((r) => r.rate) ?? [0]),
                  );
                  const colors = rateColor(maxRate);
                  const isActive = selectedCategory?.id === cat.id;

                  return (
                    <motion.button
                      key={cat.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                      onClick={() => selectTaxCategory(cat)}
                      className={`
                        w-full text-left group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                        border transition-all duration-150 overflow-hidden
                        ${
                          isActive
                            ? "bg-primary/8 border-primary/25 shadow-[0_2px_12px_hsl(var(--primary)/0.1)]"
                            : "border-transparent hover:bg-muted/50 hover:border-border/50"
                        }
                      `}
                    >
                      {/* rate colour strip */}
                      <div
                        className={`w-0.5 self-stretch rounded-full ${colors.bar} shrink-0 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"} transition-opacity`}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`tc-mono text-xs font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}
                          >
                            {cat.code}
                          </span>
                          {maxRate > 0 && (
                            <span
                              className={`tc-mono text-[10px] font-medium px-1.5 py-0.5 rounded border shrink-0 ${colors.badge}`}
                            >
                              {maxRate}%
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5 leading-tight">
                          {cat.category_name}
                        </p>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </AnimatePresence>
          </nav>
        </ScrollArea>

        {/* ── footer hint ── */}
        <div className="px-4 py-2.5 border-t border-border/40 flex items-center gap-1.5">
          <Percent className="size-3 text-muted-foreground/40" />
          <span className="text-[10px] text-muted-foreground/40">
            Colour = effective rate tier
          </span>
        </div>
      </aside>
    </>
  );
}
