import { useMemo, useState } from "react";
import { Search, Plus, ChevronDown, Download } from "lucide-react";
import { useJournalEntries } from "@/app/api/queries/journal";
import { useAccountingStore } from "@/store/accounting.store";
import { AddJournalEntryForm } from "@/app/shared/forms/AddJournalEntryForm";
import { useModal } from "@/hooks/useModal";

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
  }).format(value);
}

function EntryRow({
  entry,
  defaultOpen = false,
}: {
  entry: JournalEntry;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const totalDebit = entry.journal_lines.reduce(
    (sum, line) => sum + (line.debit || 0),
    0,
  );

  const totalCredit = entry.journal_lines.reduce(
    (sum, line) => sum + (line.credit || 0),
    0,
  );

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full grid grid-cols-[40px_1fr_140px_140px] items-center gap-4 px-4 py-3 text-left hover:bg-muted/40"
      >
        <div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        <div className="min-w-0">
          <div className="font-medium truncate">{entry.reference}</div>

          <div className="text-sm text-muted-foreground truncate">
            {entry.narration}
          </div>
        </div>

        <div className="text-sm">
          <div>Dr ₹ {formatAmount(totalDebit)}</div>
          <div>Cr ₹ {formatAmount(totalCredit)}</div>
        </div>

        <div className="text-sm text-muted-foreground">
          {formatDate(entry.entry_date)}
        </div>
      </button>

      {/* Lines */}
      {open && (
        <div className="border-t">
          <div className="grid grid-cols-[1fr_140px_140px] bg-muted px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
            <div>Account</div>
            <div>Debit</div>
            <div>Credit</div>
          </div>

          {entry.journal_lines.map((line) => (
            <div
              key={line.id}
              className="grid grid-cols-[1fr_140px_140px] items-center border-t px-4 py-2"
            >
              <div className="text-sm">
                {line.account_name || line.account_id}
              </div>

              <div className="text-sm">
                {line.debit > 0 ? `₹ ${formatAmount(line.debit)}` : "-"}
              </div>

              <div className="text-sm">
                {line.credit > 0 ? `₹ ${formatAmount(line.credit)}` : "-"}
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="grid grid-cols-[1fr_140px_140px] border-t bg-muted/40 px-4 py-2 font-medium">
            <div>Total</div>

            <div>₹ {formatAmount(totalDebit)}</div>

            <div>₹ {formatAmount(totalCredit)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function JournalPage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);

  const { data: journalRes, isLoading } = useJournalEntries(
    selectedLegalEntity?.id,
  );

  const entries: JournalEntry[] = journalRes?.data ?? [];

  const [query, setQuery] = useState("");

  const { openModal } = useModal();

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (!query) return true;

      return (
        entry.reference.toLowerCase().includes(query.toLowerCase()) ||
        entry.narration.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [entries, query]);

  const totalDebit = entries.reduce(
    (sum, entry) =>
      sum +
      entry.journal_lines.reduce((lineSum, line) => lineSum + line.debit, 0),
    0,
  );

  const totalCredit = entries.reduce(
    (sum, entry) =>
      sum +
      entry.journal_lines.reduce((lineSum, line) => lineSum + line.credit, 0),
    0,
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Journal Entries</h1>

          <p className="text-sm text-muted-foreground mt-1">
            {entries.length} Entries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="border rounded-md p-2 hover:bg-muted">
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={() =>
              openModal({
                content: <AddJournalEntryForm />,
                title: "New Journal Entry",
                description: "",
              })
            }
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            New Entry
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-md p-4">
          <div className="text-sm text-muted-foreground">Total Debit</div>

          <div className="text-xl font-semibold mt-1">
            ₹ {formatAmount(totalDebit)}
          </div>
        </div>

        <div className="border rounded-md p-4">
          <div className="text-sm text-muted-foreground">Total Credit</div>

          <div className="text-xl font-semibold mt-1">
            ₹ {formatAmount(totalCredit)}
          </div>
        </div>

        <div className="border rounded-md p-4">
          <div className="text-sm text-muted-foreground">Total Entries</div>

          <div className="text-xl font-semibold mt-1">{entries.length}</div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border rounded-md px-3 py-2 max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search entries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Entries */}
      <div className="space-y-3">
        {isLoading && (
          <div className="text-sm text-muted-foreground">
            Loading journal entries...
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="border rounded-md p-8 text-center text-sm text-muted-foreground">
            No journal entries found
          </div>
        )}

        {!isLoading &&
          filtered.map((entry, index) => (
            <EntryRow key={entry.id} entry={entry} defaultOpen={index === 0} />
          ))}
      </div>
    </div>
  );
}
