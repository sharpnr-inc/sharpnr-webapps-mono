import { Button, Skeleton, useFormsModal } from "@sharpnr/ui";
import { Landmark, Plus, ShieldCheck, ShieldX } from "lucide-react";
import type { LegalEntityBankAccountsResponseDto } from "../../api/types";
import { getLegalEntityBankAccountTypeLabel } from "../../utils/entity_type";
import { AddBankAccountForm } from "../forms/AddBankAccountForm";

interface LegalEntityBankAccountsTabProps {
  legalEntityID: string;
  data: LegalEntityBankAccountsResponseDto[] | undefined;
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function BankCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-14 rounded-full shrink-0" />
      </div>
      <div className="border-t pt-3 space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-2.5 w-1/3" />
    </div>
  );
}

// ─── Empty ─────────────────────────────────────────────────────────────────────

interface EmptyBankAccountProps {
  legalEntityID: string;
}
function EmptyBankAccounts({ legalEntityID }: EmptyBankAccountProps) {
  const { closeModal, showModal } = useFormsModal();

  const handleAddBankAccount = () => {
    showModal(
      "",
      "",
      <AddBankAccountForm
        CloseModal={closeModal}
        legalEntityID={legalEntityID}
      />,
    );
  };
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dotted rounded-xl">
      <div className="w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center mb-4">
        <Landmark className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium mb-1">No bank accounts added yet</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-5">
        Bank accounts linked to this legal entity for payments, payroll, and tax
        transactions will appear here.
      </p>

      <Button onClick={() => handleAddBankAccount()}>
        <Plus /> Add Bank Account
      </Button>
    </div>
  );
}

// ─── Masked account number ─────────────────────────────────────────────────────
function maskAccount(account: string) {
  if (account.length <= 4) return account;
  return `${"•".repeat(account.length - 4)}${account.slice(-4)}`;
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function BankCard({
  account,
}: {
  account: LegalEntityBankAccountsResponseDto;
}) {
  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Bank icon box */}
          <div className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0">
            <Landmark className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium truncate">
                {account.account_holder_name}
              </p>
              {account.is_primary && (
                <span className="text-xs px-1.5 py-0.5 rounded border text-muted-foreground shrink-0">
                  Primary
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {getLegalEntityBankAccountTypeLabel(account.account_type)}
            </p>
          </div>
        </div>

        {/* Active status */}
        <span className="text-xs px-2.5 py-1 rounded-full border shrink-0 text-muted-foreground">
          {account.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Account details */}
      <div className="border-t pt-3 space-y-2">
        {/* Account number */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">Account No.</span>
          <span className="text-xs font-mono tracking-wider">
            {maskAccount(account.account_number)}
          </span>
        </div>

        {/* IFSC */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">IFSC</span>
          <span className="text-xs font-mono">{account.ifsc}</span>
        </div>

        {/* Verification */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">Verification</span>
          <div className="flex items-center gap-1.5">
            {account.is_verified ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs">
                  Verified{" "}
                  {account.verified_at &&
                    new Date(account.verified_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                </span>
              </>
            ) : (
              <>
                <ShieldX className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Not verified
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground">
        Added{" "}
        {new Date(account.added_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
export function LegalEntityBankAccountsTab({
  legalEntityID,
  data,
}: LegalEntityBankAccountsTabProps) {
  // undefined → loading
  if (data === undefined) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        {[...Array(4)].map((_, i) => (
          <BankCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // [] → empty
  if (data.length === 0) {
    return <EmptyBankAccounts legalEntityID={legalEntityID} />;
  }

  // primary first, then by added date
  const sorted = [...data].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return new Date(a.added_at).getTime() - new Date(b.added_at).getTime();
  });

  return (
    <div className="pt-4 space-y-4">
      <p className="text-xs text-muted-foreground">
        {data.length} account{data.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sorted.map((account) => (
          <BankCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}
