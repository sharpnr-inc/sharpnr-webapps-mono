import { useState } from "react";
import { Search, Download, Plus, ChevronLeft } from "lucide-react";

import { useNavigate } from "@tanstack/react-router";

import { useAccountingStore } from "@/store/accounting.store";
import { useAccountLedger } from "@/app/api/queries/accounts";
import { Route } from "@/routes/_layout/chart-of-account/$accountID/ledger";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(value: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
}

function parseBalance(balance: number) {
  return {
    amount: formatAmount(balance),
    isDebit: balance >= 0,
  };
}

const LedgerPage = () => {
  const navigate = useNavigate();

  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);

  const { accountID } = Route.useParams();

  const [query, setQuery] = useState("");

  const { data: ledgerRes, isLoading } = useAccountLedger({
    legalEntityID: selectedLegalEntity?.id!,
    accountID,
  });

  const ledger = ledgerRes?.data;

  const lines = ledger?.Lines ?? [];

  const filtered = lines.filter(
    (line: any) =>
      !query ||
      line.Reference?.toLowerCase().includes(query.toLowerCase()) ||
      line.Narration?.toLowerCase().includes(query.toLowerCase()),
  );

  const totalDebit = lines.reduce(
    (sum: number, line: any) => sum + (line.Debit || 0),
    0,
  );

  const totalCredit = lines.reduce(
    (sum: number, line: any) => sum + (line.Credit || 0),
    0,
  );

  const closing = parseBalance(ledger?.ClosingBalance ?? 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() =>
              navigate({
                to: "/chart-of-account",
              })
            }
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <h1 className="text-2xl font-semibold">
            {ledger?.AccountName || "Ledger"}
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            {ledger?.AccountCode}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="border rounded-md p-2 hover:bg-muted">
            <Download className="h-4 w-4" />
          </button>

          <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add Entry
          </button>
        </div>
      </div>

      {/* Summary */}
      {ledger && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border rounded-md p-4">
            <div className="text-sm text-muted-foreground">Opening Balance</div>

            <div className="text-lg font-semibold mt-1">
              ₹ {formatAmount(ledger.OpeningBalance)}
            </div>
          </div>

          <div className="border rounded-md p-4">
            <div className="text-sm text-muted-foreground">Total Debit</div>

            <div className="text-lg font-semibold mt-1">
              ₹ {formatAmount(totalDebit)}
            </div>
          </div>

          <div className="border rounded-md p-4">
            <div className="text-sm text-muted-foreground">Total Credit</div>

            <div className="text-lg font-semibold mt-1">
              ₹ {formatAmount(totalCredit)}
            </div>
          </div>

          <div className="border rounded-md p-4">
            <div className="text-sm text-muted-foreground">Closing Balance</div>

            <div className="text-lg font-semibold mt-1">
              ₹ {closing.amount} {closing.isDebit ? "Dr" : "Cr"}
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-2 border rounded-md px-3 py-2 max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[140px_1fr_1fr_140px_140px_140px] bg-muted border-b px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
          <div>Date</div>
          <div>Reference</div>
          <div>Narration</div>
          <div>Debit</div>
          <div>Credit</div>
          <div>Balance</div>
        </div>

        {/* Opening Balance */}
        {ledger && (
          <div className="grid grid-cols-[140px_1fr_1fr_140px_140px_140px] border-b px-4 py-3 bg-muted/30">
            <div>-</div>

            <div className="font-medium">Opening Balance</div>

            <div className="text-muted-foreground">Carried Forward</div>

            <div>
              {ledger.OpeningIsDebit
                ? `₹ ${formatAmount(ledger.OpeningBalance)}`
                : "-"}
            </div>

            <div>
              {!ledger.OpeningIsDebit
                ? `₹ ${formatAmount(ledger.OpeningBalance)}`
                : "-"}
            </div>

            <div>
              ₹ {formatAmount(ledger.OpeningBalance)}{" "}
              {ledger.OpeningIsDebit ? "Dr" : "Cr"}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="p-6 text-sm text-muted-foreground">
            Loading ledger...
          </div>
        )}

        {/* Empty */}
        {!isLoading && filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No ledger entries found
          </div>
        )}

        {/* Rows */}
        {!isLoading &&
          filtered.map((line: any, index: number) => {
            const balance = parseBalance(line.RunningBalance);

            return (
              <div
                key={`${line.Reference}-${index}`}
                className="grid grid-cols-[140px_1fr_1fr_140px_140px_140px] border-b px-4 py-3 hover:bg-muted/30"
              >
                <div>{formatDate(line.EntryDate)}</div>

                <div className="font-medium">{line.Reference}</div>

                <div className="text-muted-foreground truncate">
                  {line.Narration}
                </div>

                <div>
                  {line.Debit > 0 ? `₹ ${formatAmount(line.Debit)}` : "-"}
                </div>

                <div>
                  {line.Credit > 0 ? `₹ ${formatAmount(line.Credit)}` : "-"}
                </div>

                <div>
                  ₹ {balance.amount} {balance.isDebit ? "Dr" : "Cr"}
                </div>
              </div>
            );
          })}

        {/* Closing */}
        {!isLoading && ledger && lines.length > 0 && (
          <div className="grid grid-cols-[140px_1fr_1fr_140px_140px_140px] bg-muted/30 px-4 py-3 font-medium">
            <div>-</div>

            <div>Closing Balance</div>

            <div>{filtered.length} Transactions</div>

            <div>-</div>

            <div>-</div>

            <div>
              ₹ {closing.amount} {closing.isDebit ? "Dr" : "Cr"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LedgerPage;
