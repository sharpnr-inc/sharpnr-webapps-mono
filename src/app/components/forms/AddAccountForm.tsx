import { useCreateAccountMutation } from "../../api/mutations/accounts";
import { useAppForm } from "@/components/forms";
import {
  Plus,
  Landmark,
  Hash,
  IndianRupee,
  ArrowDownLeft,
  ArrowUpRight,
  Star,
} from "lucide-react";

export interface CreateAccountRequest {
  accounting_book_id: string;
  account_group_id: string;
  name: string;
  code: string;
  opening_balance: number;
  is_debit: boolean;
  is_default: boolean;
}

interface CreateAccountFormProps {
  accountingGroupID: string;
  accountingBookID: string;
  legalEntityID: string;
}

export const CreateAccountForm = ({
  accountingGroupID,
  accountingBookID,
  legalEntityID,
}: CreateAccountFormProps) => {
  const { mutateAsync } = useCreateAccountMutation();
  const form = useAppForm({
    defaultValues: {
      accounting_book_id: accountingBookID,
      account_group_id: accountingGroupID,
      name: "",
      code: "",
      opening_balance: 0,
      is_debit: true,
      is_default: false,
    } as CreateAccountRequest,

    onSubmit: async ({ value }) => {
      let openingBalance = value.opening_balance;

      // Convert string → float
      if (typeof openingBalance === "string") {
        openingBalance = parseFloat(openingBalance);
      }

      // Validate
      if (Number.isNaN(openingBalance)) {
        alert("Opening balance must be a valid number");
        return;
      }

      await mutateAsync({
        legalEntityID,
        payload: {
          ...value,
          opening_balance: openingBalance,
        },
      });
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .cf-font { font-family: 'DM Sans', system-ui, sans-serif; }
        .cf-mono { font-family: 'DM Mono', monospace; }
        .cf-field:focus-within .cf-label { color: hsl(var(--primary)); }
        .cf-input:focus { border-color: hsl(var(--primary)/0.5); box-shadow: 0 0 0 3px hsl(var(--primary)/0.1); }
      `}</style>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="cf-font space-y-6">
          {/* ── section: Identity ── */}
          <div className="space-y-1.5">
            <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-1.5">
              <Landmark className="size-3" /> Identity
            </p>

            <div className="rounded-xl border border-border/60 bg-muted/20 divide-y divide-border/40 overflow-hidden">
              {/* Account Name */}
              <div className="cf-field px-4 py-3 space-y-1">
                <label className="cf-label cf-mono text-[10px] tracking-widest uppercase text-muted-foreground transition-colors">
                  Account Name
                </label>
                <form.AppField
                  name="name"
                  children={(f) => (
                    <f.TextField
                      label=""
                      placeholder="e.g. Trade Receivables"
                    />
                  )}
                />
              </div>

              {/* Account Code */}
              <div className="cf-field px-4 py-3 space-y-1">
                <label className="cf-label cf-mono text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 transition-colors">
                  <Hash className="size-3" /> Account Code
                </label>
                <form.AppField
                  name="code"
                  children={(f) => (
                    <f.TextField label="" placeholder="e.g. 1100" />
                  )}
                />
                <p className="text-[10px] text-muted-foreground/60">
                  Unique short code used in journal entries and reports.
                </p>
              </div>
            </div>
          </div>

          {/* ── section: Opening Balance ── */}
          <div className="space-y-1.5">
            <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-1.5">
              <IndianRupee className="size-3" /> Opening Balance
            </p>

            <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
              <div className="cf-field px-4 py-3 space-y-1">
                <label className="cf-label cf-mono text-[10px] tracking-widest uppercase text-muted-foreground transition-colors">
                  Amount (₹)
                </label>
                <form.AppField
                  name="opening_balance"
                  children={(f) => (
                    <f.TextField label="" placeholder="0.00" type="number" />
                  )}
                />
                <p className="text-[10px] text-muted-foreground/60">
                  Balance carried forward at the start of this accounting
                  period.
                </p>
              </div>
            </div>
          </div>

          {/* ── section: Balance Type ── */}
          <div className="space-y-1.5">
            <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              Normal Balance Side
            </p>

            <form.AppField
              name="is_debit"
              children={(f) => {
                const isDebit = f.state.value;
                return (
                  <div className="grid grid-cols-2 gap-2">
                    {/* Debit */}
                    <button
                      type="button"
                      onClick={() => f.handleChange(true)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 text-left ${
                        isDebit
                          ? "bg-sky-400/8 border-sky-400/35 shadow-[0_2px_12px_hsl(200_90%_60%/0.1)]"
                          : "border-border/50 bg-muted/20 hover:border-border/70"
                      }`}
                    >
                      <div
                        className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${isDebit ? "bg-sky-400/15 text-sky-400" : "bg-muted/50 text-muted-foreground"}`}
                      >
                        <ArrowDownLeft className="size-4" />
                      </div>
                      <div>
                        <p
                          className={`cf-mono text-xs font-semibold ${isDebit ? "text-sky-400" : "text-foreground"}`}
                        >
                          Dr
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-tight">
                          Debit normal
                        </p>
                      </div>
                      {isDebit && (
                        <div className="ml-auto size-2 rounded-full bg-sky-400 shrink-0" />
                      )}
                    </button>

                    {/* Credit */}
                    <button
                      type="button"
                      onClick={() => f.handleChange(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 text-left ${
                        !isDebit
                          ? "bg-emerald-400/8 border-emerald-400/35 shadow-[0_2px_12px_hsl(160_80%_50%/0.1)]"
                          : "border-border/50 bg-muted/20 hover:border-border/70"
                      }`}
                    >
                      <div
                        className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${!isDebit ? "bg-emerald-400/15 text-emerald-400" : "bg-muted/50 text-muted-foreground"}`}
                      >
                        <ArrowUpRight className="size-4" />
                      </div>
                      <div>
                        <p
                          className={`cf-mono text-xs font-semibold ${!isDebit ? "text-emerald-400" : "text-foreground"}`}
                        >
                          Cr
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-tight">
                          Credit normal
                        </p>
                      </div>
                      {!isDebit && (
                        <div className="ml-auto size-2 rounded-full bg-emerald-400 shrink-0" />
                      )}
                    </button>
                  </div>
                );
              }}
            />

            <p className="text-[10px] text-muted-foreground/60 pl-0.5">
              Assets & Expenses are{" "}
              <span className="cf-mono text-sky-400">Dr</span> normal.
              Liabilities, Equity & Income are{" "}
              <span className="cf-mono text-emerald-400">Cr</span> normal.
            </p>
          </div>

          {/* ── section: Options ── */}
          <div className="space-y-1.5">
            <p className="cf-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-1.5">
              <Star className="size-3" /> Options
            </p>

            <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
              <form.AppField
                name="is_default"
                children={(f) => {
                  const checked = f.state.value;
                  return (
                    <button
                      type="button"
                      onClick={() => f.handleChange(!checked)}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 text-left transition-colors ${
                        checked ? "bg-primary/5" : "hover:bg-muted/30"
                      }`}
                    >
                      {/* custom toggle */}
                      <div
                        className={`relative w-9 h-5 rounded-full border transition-colors shrink-0 ${checked ? "bg-primary border-primary" : "bg-muted border-border/60"}`}
                      >
                        <div
                          className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-all duration-200 ${checked ? "left-[18px]" : "left-0.5"}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-medium ${checked ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          Set as default account for this group
                        </p>
                        <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                          Used when no specific account is selected in
                          transactions.
                        </p>
                      </div>

                      {checked && (
                        <span className="cf-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary shrink-0">
                          Default
                        </span>
                      )}
                    </button>
                  );
                }}
              />
            </div>
          </div>

          {/* ── submit ── */}
          <form.AppForm>
            <form.SubmitButton className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-[0_2px_16px_hsl(var(--primary)/0.25)]">
              <Plus className="size-4" />
              Create Account
            </form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </>
  );
};
