import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  ChevronDown,
  BookOpen,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Download,
  Filter,
} from "lucide-react";
import { useJournalEntries } from "@/app/api/queries/journal";
import { useAccountingStore } from "@/app/store/accounting.store";
import { useFormsModal } from "@/hooks/FormModalContext";
import { AddJournalEntryForm } from "@/app/components/forms/AddJournalEntryForm";

/* ─── types ─── */
interface JournalLine {
  id: string;
  account_name: string;
  account_id: string;
  debit: number;
  credit: number;
  created_at: string;
}

interface JournalEntry {
  id: string;
  entry_date: string;
  reference: string;
  narration: string;
  entry_type: string;
  journal_lines: JournalLine[];
}

/* ─── helpers ─── */
function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

function formatAmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function shortId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

const ENTRY_TYPE_COLORS: Record<string, string> = {
  general: "bg-violet-400/10 border-violet-400/25 text-violet-400",
  sales: "bg-sky-400/10 border-sky-400/25 text-sky-400",
  purchase: "bg-amber-400/10 border-amber-400/25 text-amber-400",
  payment: "bg-emerald-400/10 border-emerald-400/25 text-emerald-400",
  receipt: "bg-teal-400/10 border-teal-400/25 text-teal-400",
  normal: "bg-slate-400/10 border-slate-400/25 text-slate-400",
};
const entryTypeColor = (t: string) =>
  ENTRY_TYPE_COLORS[t?.toLowerCase()] ??
  "bg-muted/30 border-border/40 text-muted-foreground";

/* ─── single entry card ─── */
function EntryCard({
  entry,
  index,
  defaultOpen = false,
}: {
  entry: JournalEntry;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const totalDr = entry.journal_lines.reduce((s, l) => s + (l.debit || 0), 0);
  const totalCr = entry.journal_lines.reduce((s, l) => s + (l.credit || 0), 0);
  const balanced = Math.abs(totalDr - totalCr) < 0.001;
  const { date, time } = formatDate(entry.entry_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        open
          ? "border-primary/25 shadow-[0_4px_24px_hsl(var(--primary)/0.08)]"
          : "border-border/50 hover:border-border/70"
      }`}
    >
      {/* ── entry header row ── */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-4 bg-background/60 hover:bg-muted/20 transition-colors"
      >
        {/* left: icon + meta */}
        <div className="flex items-center gap-3">
          <div
            className={`size-9 rounded-xl flex items-center justify-center border ${
              balanced
                ? "bg-emerald-400/10 border-emerald-400/20"
                : "bg-amber-400/10 border-amber-400/20"
            }`}
          >
            {balanced ? (
              <CheckCircle2 className="size-4 text-emerald-400" />
            ) : (
              <AlertCircle className="size-4 text-amber-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="cf-mono text-[10px] text-muted-foreground/50">
                {shortId(entry.id)}
              </span>
              <span
                className={`cf-mono text-[10px] font-medium px-2 py-0.5 rounded-lg border ${entryTypeColor(entry.entry_type)}`}
              >
                {entry.entry_type.toUpperCase()}
              </span>
            </div>
            <p className="cf-mono text-xs font-semibold text-foreground mt-0.5">
              {entry.reference}
            </p>
          </div>
        </div>

        {/* center: narration + date */}
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-sm text-muted-foreground truncate">
            {entry.narration}
          </p>
          <p className="cf-mono text-[10px] text-muted-foreground/50 mt-0.5">
            {date} · {time}
          </p>
        </div>

        {/* right: totals + chevron */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1.5 justify-end">
              <ArrowDownLeft className="size-3 text-sky-400" />
              <span className="cf-mono text-xs text-sky-400 tabular-nums">
                ₹ {formatAmt(totalDr)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-end mt-0.5">
              <ArrowUpRight className="size-3 text-emerald-400" />
              <span className="cf-mono text-xs text-emerald-400 tabular-nums">
                ₹ {formatAmt(totalCr)}
              </span>
            </div>
          </div>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* ── expandable lines ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="lines"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 bg-muted/10">
              {/* lines header */}
              <div className="grid grid-cols-[1fr_140px_140px] gap-0 px-5 py-2 border-b border-border/30">
                <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/50">
                  Account
                </span>
                <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 text-right">
                  Debit (Dr)
                </span>
                <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/50 text-right">
                  Credit (Cr)
                </span>
              </div>

              {/* lines */}
              <div className="divide-y divide-border/20">
                {entry.journal_lines.map((line, li) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: li * 0.04 }}
                    className="grid grid-cols-[1fr_140px_140px] gap-0 px-5 py-2.5 hover:bg-muted/20 transition-colors"
                  >
                    {/* account — shows short UUID until JOIN is added */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-0.5 h-3.5 rounded-full shrink-0 ${line.debit > 0 ? "bg-sky-400/60" : "bg-emerald-400/60"}`}
                      />
                      <span className="cf-mono text-[11px] text-muted-foreground">
                        {shortId(line.account_id) + line.account_name}
                      </span>
                      {/* once you add account_name to response, replace above with: */}
                      {/* <span className="text-xs text-foreground">{line.account_name}</span> */}
                      {/* <span className="cf-mono text-[10px] text-muted-foreground/50">{line.account_code}</span> */}
                    </div>

                    {/* debit */}
                    <div className="flex items-center justify-end gap-1.5">
                      {line.debit > 0 ? (
                        <>
                          <ArrowDownLeft className="size-3 text-sky-400 shrink-0" />
                          <span className="cf-mono text-xs text-sky-400 tabular-nums">
                            ₹ {formatAmt(line.debit)}
                          </span>
                        </>
                      ) : (
                        <span className="cf-mono text-xs text-muted-foreground/25">
                          —
                        </span>
                      )}
                    </div>

                    {/* credit */}
                    <div className="flex items-center justify-end gap-1.5">
                      {line.credit > 0 ? (
                        <>
                          <ArrowUpRight className="size-3 text-emerald-400 shrink-0" />
                          <span className="cf-mono text-xs text-emerald-400 tabular-nums">
                            ₹ {formatAmt(line.credit)}
                          </span>
                        </>
                      ) : (
                        <span className="cf-mono text-xs text-muted-foreground/25">
                          —
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* totals footer */}
              <div className="grid grid-cols-[1fr_140px_140px] gap-0 px-5 py-2.5 border-t border-border/40 bg-muted/20">
                <div className="flex items-center gap-2">
                  {balanced ? (
                    <span className="cf-mono text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> Balanced
                    </span>
                  ) : (
                    <span className="cf-mono text-[10px] text-amber-400 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      Off by ₹ {formatAmt(Math.abs(totalDr - totalCr))}
                    </span>
                  )}
                </div>
                <span className="cf-mono text-xs font-semibold text-sky-400 text-right tabular-nums">
                  ₹ {formatAmt(totalDr)}
                </span>
                <span className="cf-mono text-xs font-semibold text-emerald-400 text-right tabular-nums">
                  ₹ {formatAmt(totalCr)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── page ─── */
export function JournalPage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data: journalRes, isLoading } = useJournalEntries(
    selectedLegalEntity?.id,
  );
  const { showModal } = useFormsModal();

  const entries: JournalEntry[] = journalRes?.data ?? [];

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const uniqueTypes = useMemo(
    () => [
      ...new Set(
        entries.map((e) => e.entry_type?.toLowerCase()).filter(Boolean),
      ),
    ],
    [entries],
  );

  const filtered = useMemo(
    () =>
      entries.filter((e) => {
        const matchType =
          !typeFilter || e.entry_type?.toLowerCase() === typeFilter;
        const matchQuery =
          !query ||
          e.reference.toLowerCase().includes(query.toLowerCase()) ||
          e.narration.toLowerCase().includes(query.toLowerCase());
        return matchType && matchQuery;
      }),
    [entries, query, typeFilter],
  );

  /* summary stats */
  const totalDr = entries.reduce(
    (s, e) => s + e.journal_lines.reduce((ls, l) => ls + (l.debit || 0), 0),
    0,
  );
  const totalCr = entries.reduce(
    (s, e) => s + e.journal_lines.reduce((ls, l) => ls + (l.credit || 0), 0),
    0,
  );
  const unbalanced = entries.filter((e) => {
    const dr = e.journal_lines.reduce((s, l) => s + l.debit, 0);
    const cr = e.journal_lines.reduce((s, l) => s + l.credit, 0);
    return Math.abs(dr - cr) >= 0.001;
  }).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .cf-font  { font-family: 'DM Sans', system-ui, sans-serif; }
        .cf-mono  { font-family: 'DM Mono', monospace; }
        .bg-dots {
          background-image: radial-gradient(circle, hsl(var(--foreground)/0.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .search-ring:focus-within { box-shadow: 0 0 0 3px hsl(var(--primary)/0.12); }
      `}</style>

      <div className="pointer-events-none fixed inset-0 bg-dots opacity-35 z-0" />

      <div className="cf-font relative z-10 flex flex-col min-h-screen p-6 md:p-8 gap-7">
        {/* ── hero ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-medium cf-mono tracking-widest uppercase">
              <BookOpen className="size-3" /> General Journal
            </span>
            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              Journal Entries
            </h1>
            <div className="h-px w-28 bg-linear-to-r from-primary/50 via-primary/20 to-transparent" />

            {/* stat pills */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {[
                { label: "Entries", value: entries.length, color: "" },
                {
                  label: "Total Dr",
                  value: `₹ ${formatAmt(totalDr)}`,
                  color: "text-sky-400",
                },
                {
                  label: "Total Cr",
                  value: `₹ ${formatAmt(totalCr)}`,
                  color: "text-emerald-400",
                },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span
                    className={`font-display italic text-2xl tabular-nums ${color || "text-foreground"}`}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
              {unbalanced > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                  <AlertCircle className="size-3 text-amber-400" />
                  <span className="cf-mono text-[10px] text-amber-400">
                    {unbalanced} unbalanced
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="size-9 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground hover:bg-muted/40 transition-colors">
              <Download className="size-4" />
            </button>
            <button
              onClick={() =>
                showModal(
                  "Add Journal Entry",
                  "Post a new journal entry",
                  <AddJournalEntryForm />,
                )
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_12px_hsl(var(--primary)/0.25)]"
            >
              <Plus className="size-3.5" />
              New Entry
            </button>
          </div>
        </motion.div>

        {/* ── filters ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* search */}
          <div className="search-ring flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm w-full sm:w-72 transition-all">
            <Search className="size-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search reference or narration…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="cf-mono bg-transparent text-xs w-full outline-none text-foreground placeholder:text-muted-foreground/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[10px] text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>

          {/* type pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setTypeFilter(null)}
              className={`cf-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                !typeFilter
                  ? "bg-primary/10 border-primary/25 text-primary"
                  : "border-border/40 text-muted-foreground hover:border-border/70"
              }`}
            >
              <Filter className="size-3" /> All
            </button>
            {uniqueTypes.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(typeFilter === t ? null : t)}
                className={`cf-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  typeFilter === t
                    ? entryTypeColor(t)
                    : "border-border/40 text-muted-foreground hover:border-border/70"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── entries list ── */}
        <div className="space-y-3">
          {/* skeleton */}
          {isLoading && (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/40 bg-background/60 p-5 space-y-3 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex gap-3">
                    <div className="size-9 rounded-xl bg-muted/40" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-muted/40 rounded w-32" />
                      <div className="h-2 bg-muted/30 rounded w-48" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* empty */}
          {!isLoading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <div className="size-14 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center">
                <BookOpen className="size-6 text-muted-foreground/30" />
              </div>
              <div className="text-center">
                <p className="font-display italic text-xl text-foreground">
                  {query
                    ? `No results for "${query}"`
                    : "No journal entries yet"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {query
                    ? "Try a different reference or narration."
                    : "Post your first entry to get started."}
                </p>
              </div>
              {!query && (
                <button
                  onClick={() =>
                    showModal(
                      "Add Journal Entry",
                      "Post a new journal entry",
                      <AddJournalEntryForm />,
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  <Plus className="size-3.5" /> New Entry
                </button>
              )}
            </motion.div>
          )}

          {/* entry cards */}
          {!isLoading &&
            filtered.map((entry, i) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                index={i}
                defaultOpen={i === 0}
              />
            ))}
        </div>

        {/* ── footer ── */}
        {!isLoading && entries.length > 0 && (
          <div className="flex items-center justify-between pt-2 pb-4 border-t border-border/30">
            <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
              Showing {filtered.length} of {entries.length} entries
            </span>
            <span className="cf-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
              Sharpnr Accounting Engine v1.0
            </span>
          </div>
        )}
      </div>
    </>
  );
}
