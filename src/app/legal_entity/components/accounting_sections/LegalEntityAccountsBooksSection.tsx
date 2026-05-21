import { Button, Skeleton } from "@sharpnr/ui";
import {
  BookOpen,
  Settings2,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

// ─── Sub-section wrapper ───────────────────────────────────────────────────────
function SubSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-sm font-medium">{title}</span>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ─── Book value row ────────────────────────────────────────────────────────────
function BookRow({
  label,
  trend,
}: {
  label: string;
  trend?: "up" | "down" | "flat";
}) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <div className="flex flex-col gap-1.5 flex-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Skeleton className="h-4 w-16" />
        <TrendIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      </div>
    </div>
  );
}

// ─── Settings row ─────────────────────────────────────────────────────────────
function SettingRow({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3 border-b last:border-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <Skeleton className="h-5 w-20 rounded-full shrink-0 mt-0.5" />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function LegalEntityAccountsBooksSection() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-base">Accounting Books</h2>
        </div>
        <Button variant="link" size="sm" className="gap-1.5 text-xs h-auto p-0">
          Open in Sharp Accounting
          <ExternalLink className="w-3 h-3" />
        </Button>
      </div>

      {/* Info banner */}
      <div className="rounded-lg bg-accent px-4 py-3 text-xs text-muted-foreground leading-5">
        This legal entity has linked accounting books managed in{" "}
        <strong className="text-foreground">Sharp Accounting</strong>. Values
        shown below are read-only summaries. To post entries or manage
        transactions, open the full accounting module.
      </div>

      {/* Books overview */}
      <SubSection
        title="Book Balances"
        action={<Skeleton className="h-5 w-20 rounded-full" />}
      >
        <div className="divide-y">
          <BookRow label="Cash & Bank" trend="up" />
          <BookRow label="Accounts Receivable" trend="up" />
          <BookRow label="Accounts Payable" trend="down" />
          <BookRow label="Total Assets" trend="flat" />
          <BookRow label="Total Liabilities" trend="down" />
          <BookRow label="Retained Earnings" trend="up" />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Balances reflect the last sync from Sharp Accounting.
        </p>
      </SubSection>

      {/* Linked books list */}
      <SubSection title="Linked Books">
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="h-3.5 w-2/5" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-5 w-14 rounded-full shrink-0" />
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center pt-1">
            Books linked to this legal entity across fiscal years.
          </p>
        </div>
      </SubSection>

      {/* Accounting settings */}
      <SubSection
        title="Accounting Settings"
        action={<Settings2 className="w-4 h-4 text-muted-foreground" />}
      >
        <div className="divide-y">
          <SettingRow
            label="Accounting Method"
            description="Whether this entity uses cash or accrual basis accounting."
          />
          <SettingRow
            label="Fiscal Year Start"
            description="The month this entity's financial year begins."
          />
          <SettingRow
            label="Base Currency"
            description="Primary currency used across all books for this entity."
          />
          <SettingRow
            label="Tax Scheme"
            description="GST / VAT registration scheme applied to transactions."
          />
          <SettingRow
            label="Auto Reconciliation"
            description="Automatically match bank transactions to journal entries."
          />
        </div>
      </SubSection>
    </div>
  );
}
