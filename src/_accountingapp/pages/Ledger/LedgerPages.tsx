import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { AddJournalEntryForm } from "@/_accountingapp/components/forms/AddJournalEntryForm";
import { useFormsModal } from "@/context/FormModalContext";
import { useAccountLedger } from "@/_accountingapp/api/queries/accounts";
import { Route } from "@/routes/_appuser/dashboard/sharp_accounting/_layout/chart-of-account/$accountID/ledger";

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

function formatAmount(n: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(n));
}

/* running balance display — until backend sends BalanceIsDebit,
   we infer: negative = Cr side, positive = Dr side             */
function parseBalance(raw: number) {
  const isDebit = raw >= 0;
  return { amount: formatAmount(raw), isDebit };
}

/* ─── summary pill ─── */
function SummaryPill({
  label,
  amount,
  color,
}: {
  label: string;
  amount: string;
  color: "sky" | "emerald" | "violet";
}) {
  const map = {
    sky: "bg-sky-400/8 border-sky-400/25 text-sky-400",
    emerald: "bg-emerald-400/8 border-emerald-400/25 text-emerald-400",
    violet: "bg-violet-400/8 border-violet-400/25 text-violet-400",
  };
  return (
    <div
      className={`flex flex-col px-4 py-2.5 rounded-xl border ${map[color]}`}
    >
      <span className="cf-mono text-[10px] tracking-widest uppercase opacity-60">
        {label}
      </span>
      <span className="cf-mono text-sm font-semibold tabular-nums mt-0.5">
        ₹ {amount}
      </span>
    </div>
  );
}

/* ─── page ─── */
const LedgerPage = () => {
  const navigate = useNavigate();
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { accountID } = Route.useParams();
  const { showModal } = useFormsModal();

  const [query, setQuery] = useState("");

  const { data: ledgerRes, isLoading } = useAccountLedger({
    legalEntityID: selectedLegalEntity?.id!,
    accountID,
  });

  const ledger = ledgerRes?.data;
  const lines = ledger?.Lines ?? [];

  const filtered = lines.filter(
    (l: any) =>
      !query ||
      l.Reference?.toLowerCase().includes(query.toLowerCase()) ||
      l.Narration?.toLowerCase().includes(query.toLowerCase()),
  );

  /* summary totals */
  const totalDr = lines.reduce((s: number, l: any) => s + (l.Debit || 0), 0);
  const totalCr = lines.reduce((s: number, l: any) => s + (l.Credit || 0), 0);
  const closing = parseBalance(ledger?.ClosingBalance ?? 0);

  const handleAddEntry = () =>
    showModal(
      "Add Journal Entry",
      "Post a new journal entry",
      <AddJournalEntryForm />,
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .cf-font    { font-family: 'DM Sans', system-ui, sans-serif; }
        .cf-mono    { font-family: 'DM Mono', monospace; }
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .bg-dots {
          background-image: radial-gradient(circle, hsl(var(--foreground)/0.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .row-hover:hover { background: hsl(var(--muted)/0.4); }
        .search-ring:focus-within { box-shadow: 0 0 0 3px hsl(var(--primary)/0.12); }
      `}</style>

      <div className="pointer-events-none fixed inset-0 bg-dots opacity-35 z-0" />

      <div className="cf-font relative z-10 flex flex-col ">
        {/* ── sticky header ── */}
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            {/* top row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* back */}
                <button
                  onClick={() =>
                    navigate({
                      to: "/dashboard/sharp_accounting/chart-of-account",
                    })
                  }
                  className="size-8 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-muted/40 transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                      {ledger?.AccountCode ?? "—"}
                    </span>
                    <span className="size-1 rounded-full bg-border" />
                    <span className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                      Ledger
                    </span>
                  </div>
                  <h1 className="font-display italic text-3xl text-foreground leading-tight mt-0.5">
                    {isLoading
                      ? "Loading…"
                      : (ledger?.AccountName ?? "Account")}
                  </h1>
                </div>
              </div>

              {/* actions */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="search-ring flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-background/60 w-56 transition-all">
                  <Search className="size-3.5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search reference…"
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

                <button className="size-9 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground hover:bg-muted/40 transition-colors">
                  <Download className="size-4" />
                </button>

                <button
                  onClick={handleAddEntry}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_12px_hsl(var(--primary)/0.25)]"
                >
                  <Plus className="size-3.5" />
                  Add Journal Entry
                </button>
              </div>
            </div>

            {/* summary pills */}
            {ledger && (
              <div className="flex items-center gap-2 flex-wrap">
                <SummaryPill
                  label="Opening Balance"
                  amount={formatAmount(ledger.OpeningBalance)}
                  color="violet"
                />
                <SummaryPill
                  label="Total Dr"
                  amount={formatAmount(totalDr)}
                  color="sky"
                />
                <SummaryPill
                  label="Total Cr"
                  amount={formatAmount(totalCr)}
                  color="emerald"
                />

                {/* closing */}
                <div
                  className={`flex flex-col px-4 py-2.5 rounded-xl border ${
                    closing.isDebit
                      ? "bg-sky-400/8 border-sky-400/25"
                      : "bg-emerald-400/8 border-emerald-400/25"
                  }`}
                >
                  <span className="cf-mono text-[10px] tracking-widest uppercase opacity-60 text-muted-foreground">
                    Closing Balance
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`cf-mono text-sm font-semibold tabular-nums ${closing.isDebit ? "text-sky-400" : "text-emerald-400"}`}
                    >
                      ₹ {closing.amount}
                    </span>
                    <span
                      className={`cf-mono text-[10px] px-1.5 py-0.5 rounded border ${
                        closing.isDebit
                          ? "bg-sky-400/10 border-sky-400/20 text-sky-400"
                          : "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                      }`}
                    >
                      {closing.isDebit ? "Dr" : "Cr"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* column headers */}
          <div className="grid grid-cols-[180px_1fr_1fr_140px_140px_160px] gap-0 px-6 py-2 bg-muted/20 border-t border-border/40">
            {[
              "Date",
              "Reference",
              "Narration",
              "Debit",
              "Credit",
              "Balance",
            ].map((h, i) => (
              <span
                key={h}
                className={`cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 ${i >= 3 ? "text-right" : ""}`}
              >
                {h}
              </span>
            ))}
          </div>
        </header>

        {/* ── body ── */}
        <main className="flex-1 divide-y divide-border/30">
          {/* opening balance row */}
          {ledger && (
            <div className="grid grid-cols-[180px_1fr_1fr_140px_140px_160px] gap-0 px-6 py-3 bg-muted/10">
              <span className="cf-mono text-xs text-muted-foreground/50">
                —
              </span>
              <span className="cf-mono text-xs font-medium text-muted-foreground">
                Opening Balance
              </span>
              <span className="cf-mono text-xs text-muted-foreground/50">
                Carried forward
              </span>

              <span
                className={`cf-mono text-xs text-right ${ledger.OpeningIsDebit ? "text-sky-400" : "text-muted-foreground/30"}`}
              >
                {ledger.OpeningIsDebit
                  ? `₹ ${formatAmount(ledger.OpeningBalance)}`
                  : "—"}
              </span>
              <span
                className={`cf-mono text-xs text-right ${!ledger.OpeningIsDebit ? "text-emerald-400" : "text-muted-foreground/30"}`}
              >
                {!ledger.OpeningIsDebit
                  ? `₹ ${formatAmount(ledger.OpeningBalance)}`
                  : "—"}
              </span>
              <span className="cf-mono text-xs text-right text-muted-foreground">
                ₹ {formatAmount(ledger.OpeningBalance)}
                <span
                  className={`ml-1.5 text-[10px] px-1 py-0.5 rounded border ${
                    ledger.OpeningIsDebit
                      ? "bg-sky-400/10 border-sky-400/20 text-sky-400"
                      : "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                  }`}
                >
                  {ledger.OpeningIsDebit ? "Dr" : "Cr"}
                </span>
              </span>
            </div>
          )}

          {/* loading skeleton */}
          {isLoading && (
            <div className="space-y-0">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[180px_1fr_1fr_140px_140px_160px] gap-0 px-6 py-4 border-b border-border/30"
                >
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className="h-3 rounded bg-muted/40 animate-pulse"
                      style={{
                        width: `${60 + Math.random() * 30}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* empty state */}
          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="size-14 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center">
                <BookOpen className="size-6 text-muted-foreground/30" />
              </div>
              <div className="text-center">
                <p className="font-display italic text-xl text-foreground">
                  {query ? `No results for "${query}"` : "No transactions yet"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {query
                    ? "Try a different reference or narration."
                    : "Post a journal entry to see it here."}
                </p>
              </div>
              {!query && (
                <button
                  onClick={handleAddEntry}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  <Plus className="size-3.5" /> Add Journal Entry
                </button>
              )}
            </div>
          )}

          {/* lines */}
          <AnimatePresence initial={false}>
            {!isLoading &&
              filtered.map((line: any, i: number) => {
                const { date, time } = formatDate(line.EntryDate);
                const bal = parseBalance(line.RunningBalance);
                const hasDr = line.Debit > 0;
                const hasCr = line.Credit > 0;

                return (
                  <motion.div
                    key={`${line.Reference}-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="row-hover grid grid-cols-[180px_1fr_1fr_140px_140px_160px] gap-0 px-6 py-3.5 transition-colors cursor-default"
                  >
                    {/* date */}
                    <div className="flex flex-col gap-0.5">
                      <span className="cf-mono text-xs text-foreground">
                        {date}
                      </span>
                      <span className="cf-mono text-[10px] text-muted-foreground/50">
                        {time}
                      </span>
                    </div>

                    {/* reference */}
                    <div className="flex items-center gap-2 pr-4">
                      <span className="cf-mono text-xs font-medium text-foreground truncate">
                        {line.Reference}
                      </span>
                    </div>

                    {/* narration */}
                    <span className="cf-mono text-xs text-muted-foreground truncate pr-4">
                      {line.Narration}
                    </span>

                    {/* debit */}
                    <div className="flex items-center justify-end gap-1.5">
                      {hasDr ? (
                        <>
                          <ArrowDownLeft className="size-3 text-sky-400 shrink-0" />
                          <span className="cf-mono text-xs text-sky-400 tabular-nums">
                            ₹ {formatAmount(line.Debit)}
                          </span>
                        </>
                      ) : (
                        <span className="cf-mono text-xs text-muted-foreground/30">
                          —
                        </span>
                      )}
                    </div>

                    {/* credit */}
                    <div className="flex items-center justify-end gap-1.5">
                      {hasCr ? (
                        <>
                          <ArrowUpRight className="size-3 text-emerald-400 shrink-0" />
                          <span className="cf-mono text-xs text-emerald-400 tabular-nums">
                            ₹ {formatAmount(line.Credit)}
                          </span>
                        </>
                      ) : (
                        <span className="cf-mono text-xs text-muted-foreground/30">
                          —
                        </span>
                      )}
                    </div>

                    {/* running balance */}
                    <div className="flex items-center justify-end gap-1.5">
                      <span
                        className={`cf-mono text-xs tabular-nums ${bal.isDebit ? "text-sky-400" : "text-emerald-400"}`}
                      >
                        ₹ {bal.amount}
                      </span>
                      <span
                        className={`cf-mono text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${
                          bal.isDebit
                            ? "bg-sky-400/10 border-sky-400/20 text-sky-400"
                            : "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                        }`}
                      >
                        {bal.isDebit ? "Dr" : "Cr"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>

          {/* closing balance row */}
          {!isLoading && ledger && lines.length > 0 && (
            <div className="grid grid-cols-[180px_1fr_1fr_140px_140px_160px] gap-0 px-6 py-3 bg-muted/10 border-t border-border/60">
              <span className="cf-mono text-xs text-muted-foreground/50">
                —
              </span>
              <span className="cf-mono text-xs font-semibold text-foreground">
                Closing Balance
              </span>
              <span className="cf-mono text-xs text-muted-foreground/50">
                {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
              </span>
              <span className="cf-mono text-xs text-right text-muted-foreground/30">
                —
              </span>
              <span className="cf-mono text-xs text-right text-muted-foreground/30">
                —
              </span>
              <div className="flex items-center justify-end gap-1.5">
                <span
                  className={`cf-mono text-xs font-semibold tabular-nums ${closing.isDebit ? "text-sky-400" : "text-emerald-400"}`}
                >
                  ₹ {closing.amount}
                </span>
                <span
                  className={`cf-mono text-[10px] px-1.5 py-0.5 rounded border ${
                    closing.isDebit
                      ? "bg-sky-400/10 border-sky-400/20 text-sky-400"
                      : "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                  }`}
                >
                  {closing.isDebit ? "Dr" : "Cr"}
                </span>
              </div>
            </div>
          )}
        </main>

        {/* ── footer ── */}
        <footer className="sticky bottom-0 border-t border-border/40 bg-background/80 backdrop-blur-md px-6 py-2.5 flex items-center justify-between">
          <span className="cf-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest">
            Showing {filtered.length} of {lines.length} lines
          </span>
          <span className="cf-mono text-[10px] text-muted-foreground/30 uppercase tracking-widest">
            Sharpnr Accounting Engine v1.0
          </span>
        </footer>
      </div>
    </>
  );
};

export default LedgerPage;
