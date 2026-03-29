import { Fragment, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Search,
  Download,
  ChevronRight,
  Layers,
  BookOpen,
  Circle,
} from "lucide-react";
import { useLEAccountingBook } from "@/_accountingapp/api/queries/books";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { formatDateTimePretty } from "@/lib/formatDatePretty";
import { useDialogModal } from "@/context/DialogModalContext";
import { CreateAccountForm } from "@/_accountingapp/components/forms/AddAccountForm";
import { useNavigate } from "@tanstack/react-router";

/* ─── types ─── */
type Account = {
  id: string;
  account_name: string;
  code: string;
  status: string;
  last_updated: string;
};

type Group = {
  id: string;
  group_name: string;
  type: string;
  last_updated: string;
  accounts: Account[];
};

/* ─── helpers ─── */
const TYPE_COLORS: Record<string, { badge: string; bar: string }> = {
  ASSET: {
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
    bar: "bg-emerald-400",
  },
  LIABILITY: {
    badge: "bg-rose-400/10 text-rose-400 border-rose-400/25",
    bar: "bg-rose-400",
  },
  EQUITY: {
    badge: "bg-violet-400/10 text-violet-400 border-violet-400/25",
    bar: "bg-violet-400",
  },
  INCOME: {
    badge: "bg-sky-400/10 text-sky-400 border-sky-400/25",
    bar: "bg-sky-400",
  },
  EXPENSE: {
    badge: "bg-amber-400/10 text-amber-400 border-amber-400/25",
    bar: "bg-amber-400",
  },
};
const typeColors = (t: string) =>
  TYPE_COLORS[t?.toUpperCase()] ?? {
    badge: "bg-muted/50 text-muted-foreground border-border/40",
    bar: "bg-muted-foreground",
  };

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-emerald-400",
  INACTIVE: "bg-muted-foreground",
  ARCHIVED: "bg-rose-400",
};
const statusDot = (s: string) =>
  STATUS_COLORS[s?.toUpperCase()] ?? "bg-muted-foreground";

/* ─── component ─── */
export function ChartOfAccountingPage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data } = useLEAccountingBook(selectedLegalEntity?.id);
  const groups: Group[] = data?.data?.groups ?? [];

  const [query, setQuery] = useState("");
  const { openModal } = useDialogModal();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const uniqueTypes = useMemo(
    () => [
      ...new Set(groups.map((g) => g.type?.toUpperCase()).filter(Boolean)),
    ],
    [groups],
  );

  const nav = useNavigate();

  const handleAddAccount = (accGroupID: string) => {
    if (!selectedLegalEntity) return;
    openModal(
      <CreateAccountForm
        legalEntityID={selectedLegalEntity.id}
        accountingGroupID={accGroupID}
        accountingBookID={data?.data?.id}
      />,
      "Add Account",
      "",
    );
  };

  const filtered = useMemo(() => {
    return groups
      .filter((g) => !typeFilter || g.type?.toUpperCase() === typeFilter)
      .map((g) => ({
        ...g,
        accounts: g.accounts.filter(
          (a) =>
            !query ||
            a.account_name.toLowerCase().includes(query.toLowerCase()) ||
            a.code.toLowerCase().includes(query.toLowerCase()),
        ),
      }))
      .filter(
        (g) =>
          !query ||
          g.group_name.toLowerCase().includes(query.toLowerCase()) ||
          g.accounts.length > 0,
      );
  }, [groups, query, typeFilter]);

  const totalAccounts = groups.reduce((n, g) => n + g.accounts.length, 0);

  const toggle = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  // default all groups open
  const isOpen = (id: string) => openGroups[id] !== false;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .coa-font  { font-family: 'DM Sans', system-ui, sans-serif; }
        .coa-mono  { font-family: 'DM Mono', monospace; }
        .bg-dots {
          background-image: radial-gradient(circle, hsl(var(--foreground)/0.055) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .row-hover:hover { background: hsl(var(--muted)/0.45); }
        .search-ring:focus-within { box-shadow: 0 0 0 3px hsl(var(--primary)/0.12); }
      `}</style>

      <div className="pointer-events-none fixed inset-0 bg-dots opacity-40 z-0" />

      <div className="coa-font relative z-10 flex flex-col gap-7 p-6 md:p-10">
        {/* ── hero ── */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-medium coa-mono tracking-widest uppercase">
              <BookOpen className="size-3" /> Chart of Accounts
            </span>
            <h1 className="font-display italic text-5xl md:text-6xl text-foreground leading-none">
              Ledger Structure
            </h1>
            <div className="h-px w-28 bg-gradient-to-r from-primary/50 via-primary/25 to-transparent" />

            {/* stat pills */}
            <div className="flex items-center gap-4 pt-1">
              {[
                { label: "Groups", value: groups.length },
                { label: "Accounts", value: totalAccounts },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className="font-display italic text-2xl text-foreground tabular-nums">
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/60 bg-background/70 hover:bg-muted/50 transition-colors text-xs font-medium text-muted-foreground">
              <Download className="size-3.5" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-semibold shadow-[0_2px_12px_hsl(var(--primary)/0.3)]">
              <Plus className="size-3.5" />
              New Account
            </button>
          </div>
        </motion.div>

        {/* ── controls ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {/* search */}
          <div className="search-ring flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm w-full sm:w-72 transition-all">
            <Search className="size-3.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search accounts or groups…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="coa-mono bg-transparent text-xs w-full outline-none text-foreground placeholder:text-muted-foreground/50"
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

          {/* type filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setTypeFilter(null)}
              className={`coa-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                !typeFilter
                  ? "bg-primary/10 border-primary/25 text-primary"
                  : "border-border/40 text-muted-foreground hover:border-border/70"
              }`}
            >
              All
            </button>
            {uniqueTypes.map((t) => {
              const c = typeColors(t);
              return (
                <button
                  key={t}
                  onClick={() => setTypeFilter(typeFilter === t ? null : t)}
                  className={`coa-mono text-[10px] font-medium px-3 py-1.5 rounded-lg border transition-all ${
                    typeFilter === t
                      ? c.badge
                      : "border-border/40 text-muted-foreground hover:border-border/70"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── table area ── */}
        <motion.div
          className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {/* column header */}
          <div className="grid grid-cols-[2fr_1fr_1.2fr_40px] gap-0 px-5 py-2.5 border-b border-border/50 bg-muted/30">
            {["Account / Group", "Type", "Last Updated", ""].map((h) => (
              <span
                key={h}
                className="coa-mono text-[10px] font-medium tracking-widest uppercase text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </div>

          {/* rows */}
          <div className="divide-y divide-border/40">
            <AnimatePresence initial={false}>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
                  <Layers className="size-8 opacity-25" />
                  <p className="text-sm">
                    {query ? `No results for "${query}"` : "No accounts yet"}
                  </p>
                </div>
              ) : (
                filtered.map((group, gi) => {
                  const gc = typeColors(group.type);
                  const open = isOpen(group.id);

                  return (
                    <Fragment key={group.id}>
                      {/* ── group row ── */}
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: gi * 0.04 }}
                        className="grid grid-cols-[2fr_1fr_1.2fr_40px] gap-0 px-5 py-3.5 cursor-pointer bg-muted/20 hover:bg-muted/35 transition-colors group"
                        onClick={() => toggle(group.id)}
                      >
                        {/* name */}
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: open ? 90 : 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <ChevronRight className="size-3.5 text-muted-foreground" />
                          </motion.div>
                          {/* colour bar */}
                          <div
                            className={`w-0.5 h-4 rounded-full ${gc.bar} shrink-0 opacity-70`}
                          />
                          <span className="coa-mono text-xs font-semibold text-foreground tracking-wide uppercase">
                            {group.group_name}
                          </span>
                          <span className="coa-mono text-[10px] text-muted-foreground/60">
                            {group.accounts.length} accounts
                          </span>
                        </div>

                        {/* type */}
                        <div>
                          <span
                            className={`coa-mono text-[10px] font-medium px-2 py-0.5 rounded-lg border ${gc.badge}`}
                          >
                            {group.type}
                          </span>
                        </div>

                        {/* date */}
                        <span className="coa-mono text-xs text-muted-foreground self-center">
                          {formatDateTimePretty(group.last_updated)}
                        </span>

                        {/* actions */}
                        <div
                          className="flex items-center justify-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="size-7 rounded-lg flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                                <MoreHorizontal className="size-3.5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-xl border-border/60"
                            >
                              <DropdownMenuLabel className="coa-mono text-[10px] uppercase text-muted-foreground">
                                Group Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="coa-mono text-xs cursor-pointer">
                                Edit Group
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="coa-mono text-xs cursor-pointer"
                                onClick={() => handleAddAccount(group.id)}
                              >
                                Add Account
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="coa-mono text-xs cursor-pointer text-destructive">
                                Archive
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </motion.div>

                      {/* ── account rows ── */}
                      <AnimatePresence initial={false}>
                        {open &&
                          group.accounts.map((account, ai) => (
                            <motion.div
                              key={account.id}
                              layout
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, delay: ai * 0.03 }}
                              className="grid grid-cols-[2fr_1fr_1.2fr_40px] gap-0 px-5 py-3 row-hover transition-colors group border-t border-border/30"
                            >
                              {/* name + code */}
                              <div className="flex items-center gap-3 pl-7">
                                <div
                                  className={`w-0.5 h-3.5 rounded-full ${gc.bar} shrink-0 opacity-30`}
                                />
                                <span className="text-sm text-foreground font-medium">
                                  {account.account_name}
                                </span>
                                <span className="coa-mono text-[10px] px-2 py-0.5 rounded-md bg-muted/50 border border-border/40 text-muted-foreground">
                                  {account.code}
                                </span>
                              </div>

                              {/* status */}
                              <div className="flex items-center gap-2 self-center">
                                <Circle
                                  className={`size-1.5 fill-current ${statusDot(account.status)}`}
                                  style={{ color: "inherit" }}
                                />
                                <span
                                  className={`size-1.5 rounded-full ${statusDot(account.status)} shrink-0`}
                                />
                                <span className="coa-mono text-[10px] text-muted-foreground uppercase">
                                  {account.status}
                                </span>
                              </div>

                              {/* date */}
                              <span className="coa-mono text-xs text-muted-foreground self-center">
                                {formatDateTimePretty(account.last_updated)}
                              </span>

                              {/* actions */}
                              <div
                                className="flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button className="size-7 rounded-lg flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                                      <MoreHorizontal className="size-3.5" />
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="rounded-xl border-border/60"
                                  >
                                    <DropdownMenuLabel className="coa-mono text-[10px] uppercase text-muted-foreground">
                                      Account Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="coa-mono text-xs cursor-pointer">
                                      Edit Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=> {
                                      nav({
                                        to: "/dashboard/sharp_accounting/chart-of-account/$accountID/ledger",
                                        params:{
                                          accountID:account.id
                                        }
                                      })
                                    }} className="coa-mono text-xs cursor-pointer">
                                      View Ledger
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="coa-mono text-xs cursor-pointer text-destructive">
                                      Archive
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </Fragment>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── footer ── */}
        <div className="flex items-center justify-between pt-2 pb-4">
          <span className="coa-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase">
            {filtered.reduce((n, g) => n + g.accounts.length, 0)} accounts shown
          </span>
          <span className="coa-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase">
            Sharpnr Accounting Engine v1.0
          </span>
        </div>
      </div>
    </>
  );
}
