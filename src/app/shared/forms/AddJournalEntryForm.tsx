import { useCreateJournalEntryMutation } from "@/app/api/mutations/journalEntry";
import { useLEAccountingBook } from "@/app/api/queries/books";
import { useAccountingStore } from "@/app/store/accounting.store";
import { useAppForm } from "@/components/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  FileText,
  Hash,
  AlignLeft,
  BookOpen,
  ArrowDownLeft,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

export interface JournalEntryExternalRequestDto {
  reference: string;
  narration: string;
  entry_type: string;
  lines: JournalLineExternalRequestDto[];
}

export interface JournalLineExternalRequestDto {
  account_id: string;
  debit: number;
  credit: number;
  party_id?: string;
}

const ENTRY_TYPES = [
  { value: "NORMAL", label: "Normal Entry" },
  { value: "sales", label: "Sales" },
  { value: "purchase", label: "Purchase" },
  { value: "payment", label: "Payment" },
  { value: "receipt", label: "Receipt" },
  { value: "contra", label: "Contra" },
];

/* ── running balance indicator ── */
function BalanceStatus({ lines }: { lines: JournalLineExternalRequestDto[] }) {
  const totalDebit = lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);
  const diff = Math.abs(totalDebit - totalCredit);
  const balanced = diff < 0.001 && totalDebit > 0;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
        balanced
          ? "bg-emerald-400/8 border-emerald-400/30"
          : totalDebit === 0 && totalCredit === 0
            ? "bg-muted/30 border-border/40"
            : "bg-amber-400/8 border-amber-400/30"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ArrowDownLeft
            className={`size-3.5 ${balanced ? "text-sky-400" : "text-muted-foreground"}`}
          />
          <span className="cf-mono text-xs text-muted-foreground">Dr</span>
          <span
            className={`cf-mono text-sm font-semibold tabular-nums ${balanced ? "text-sky-400" : "text-foreground"}`}
          >
            ₹ {totalDebit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="w-px h-4 bg-border/50" />

        <div className="flex items-center gap-2">
          <ArrowUpRight
            className={`size-3.5 ${balanced ? "text-emerald-400" : "text-muted-foreground"}`}
          />
          <span className="cf-mono text-xs text-muted-foreground">Cr</span>
          <span
            className={`cf-mono text-sm font-semibold tabular-nums ${balanced ? "text-emerald-400" : "text-foreground"}`}
          >
            ₹{" "}
            {totalCredit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {balanced ? (
        <span className="cf-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 font-medium">
          Balanced ✓
        </span>
      ) : diff > 0 ? (
        <span className="cf-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-medium flex items-center gap-1">
          <AlertCircle className="size-2.5" />
          Off by ₹ {diff.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      ) : null}
    </div>
  );
}

/* ── main form ── */
export function AddJournalEntryForm({}: {}) {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data: accounts } = useLEAccountingBook(selectedLegalEntity?.id);
  const { mutateAsync } = useCreateJournalEntryMutation();

  const allAccounts =
    accounts?.data?.groups?.flatMap((group: any) =>
      group.accounts.map((a: any) => ({ ...a, groupName: group.group_name })),
    ) ?? [];

  const form = useAppForm({
    defaultValues: {
      reference: "",
      narration: "",
      entry_type: "general",
      lines: [
        { account_id: "", debit: 0, credit: 0 },
        { account_id: "", debit: 0, credit: 0 },
      ],
    } as JournalEntryExternalRequestDto,
    onSubmit: async ({ value }) => {
      await mutateAsync({
        legalEntityID: selectedLegalEntity.id,
        payload: value,
      });
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .cf-font { font-family: 'DM Sans', system-ui, sans-serif; }
        .cf-mono { font-family: 'DM Mono', monospace; }
      `}</style>

      <div className="cf-font space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* ── Section 1: Entry Header ── */}
          <div className="space-y-1.5">
            <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-1.5">
              <FileText className="size-3" /> Entry Details
            </p>

            <div className="rounded-xl border border-border/60 bg-muted/20 divide-y divide-border/40 ">
              {/* Entry Type */}
              <div className="px-4 py-3 space-y-1.5">
                <label className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                  Entry Type
                </label>
                <form.AppField
                  name="entry_type"
                  children={(f) => (
                    <Select
                      value={f.state.value}
                      onValueChange={f.handleChange}
                    >
                      <SelectTrigger className="h-8 text-xs rounded-lg border-border/50 bg-background/60 cf-mono focus:ring-primary/20">
                        <SelectValue placeholder="Select type…" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border/60">
                        {ENTRY_TYPES.map((t) => (
                          <SelectItem
                            key={t.value}
                            value={t.value}
                            className="cf-mono text-xs"
                          >
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Reference */}
              <div className="px-4 py-3 space-y-1.5">
                <label className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                  <Hash className="size-3" /> Reference
                </label>
                <form.AppField
                  name="reference"
                  children={(f) => (
                    <f.TextField
                      label=""
                      placeholder="e.g. INV-101, PO-42, PMT-007"
                    />
                  )}
                />
                <p className="text-[10px] text-muted-foreground/55">
                  Link to the source document (invoice, bill, payment slip).
                </p>
              </div>

              {/* Narration */}
              <div className="px-4 py-3 space-y-1.5">
                <label className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                  <AlignLeft className="size-3" /> Narration
                </label>
                <form.AppField
                  name="narration"
                  children={(f) => (
                    <f.TextAreaField
                      label=""
                      placeholder="e.g. Payment received from Acme Corp for INV-101"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* ── Section 2: Journal Lines ── */}
          <div className="space-y-1.5">
            <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-1.5">
              <BookOpen className="size-3" /> Journal Lines
            </p>

            {/* column headers */}
            <div className="grid grid-cols-[1fr_120px_120px_32px] gap-2 px-1">
              {["Account", "Debit (Dr)", "Credit (Cr)", ""].map((h) => (
                <span
                  key={h}
                  className="cf-mono text-[10px] tracking-widest uppercase text-muted-foreground/60"
                >
                  {h}
                </span>
              ))}
            </div>

            <form.AppField
              name="lines"
              mode="array"
              children={(f) => (
                <div className="space-y-2">
                  {f.state.value.map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_120px_120px_32px] gap-2 items-start"
                    >
                      {/* Account selector */}
                      <form.AppField
                        name={`lines[${i}].account_id`}
                        children={(af) => (
                          <Select
                            value={af.state.value}
                            onValueChange={af.handleChange}
                          >
                            <SelectTrigger className="h-9 text-xs rounded-xl border-border/60 bg-background/60 cf-mono focus:ring-primary/20 w-full">
                              <SelectValue placeholder="Select account…" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/60 max-h-64">
                              {allAccounts.map((account: any) => (
                                <SelectItem
                                  key={account.id}
                                  value={account.id}
                                  className="cf-mono text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-[10px]">
                                      {account.code}
                                    </span>
                                    <span>{account.account_name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {/* Debit */}
                      <form.AppField
                        name={`lines[${i}].debit`}
                        children={(df) => (
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 cf-mono text-[10px] text-sky-400 pointer-events-none">
                              Dr
                            </span>
                            <input
                              type="number"
                              min={0}
                              step={0.01}
                              value={df.state.value || ""}
                              onChange={(e) =>
                                df.handleChange(parseFloat(e.target.value) || 0)
                              }
                              className="cf-mono w-full h-9 pl-8 pr-3 rounded-xl border border-border/60 bg-background/60 text-xs text-right focus:outline-none focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/10 transition-all"
                              placeholder="0.00"
                            />
                          </div>
                        )}
                      />

                      {/* Credit */}
                      <form.AppField
                        name={`lines[${i}].credit`}
                        children={(cf) => (
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 cf-mono text-[10px] text-emerald-400 pointer-events-none">
                              Cr
                            </span>
                            <input
                              type="number"
                              min={0}
                              step={0.01}
                              value={cf.state.value || ""}
                              onChange={(e) =>
                                cf.handleChange(parseFloat(e.target.value) || 0)
                              }
                              className="cf-mono w-full h-9 pl-8 pr-3 rounded-xl border border-border/60 bg-background/60 text-xs text-right focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10 transition-all"
                              placeholder="0.00"
                            />
                          </div>
                        )}
                      />

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => f.removeValue(i)}
                        disabled={f.state.value.length <= 2}
                        className="size-9 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-rose-400 hover:border-rose-400/30 hover:bg-rose-400/8 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                        aria-label="Remove line"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add line */}
                  <button
                    type="button"
                    onClick={() =>
                      f.pushValue({ account_id: "", debit: 0, credit: 0 })
                    }
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border/60 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    <Plus className="size-3.5" />
                    Add Line
                  </button>
                </div>
              )}
            />
          </div>

          {/* ── Balance indicator ── */}
          <form.Subscribe
            selector={(s) => s.values.lines}
            children={(lines) => <BalanceStatus lines={lines} />}
          />

          {/* ── Submit ── */}
          <form.AppForm>
            <form.SubmitButton className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_16px_hsl(var(--primary)/0.25)]">
              <BookOpen className="size-4" />
              Post Journal Entry
            </form.SubmitButton>
          </form.AppForm>
        </form>
      </div>
    </>
  );
}
