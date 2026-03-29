import { useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import {
  useLedger,
  useLedgerDetails,
} from "@/_accountingapp/api/queries/transactions";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { formatDateTimePretty } from "@/lib/formatDatePretty";
import { useQueryClient } from "@tanstack/react-query";
import { GetLegderEntryDetails } from "@/_accountingapp/api/api_calls";
import { Button } from "@/components/ui/button";
import { useDialogModal } from "@/context/DialogModalContext";
import { AddJournalEntryForm } from "@/_accountingapp/components/forms/AddJournalEntryForm";
import { useFormsModal } from "@/context/FormModalContext";
import { useAccountLedger } from "@/_accountingapp/api/queries/accounts";

const LedgerPage = () => {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);

  const {} = useAccountLedger({
    legalEntityID: selectedLegalEntity?.id!,
    accountID: "5356109c-d48c-420e-bce9-ed21b76effbf",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useLedger(selectedLegalEntity?.id);

  const ledgerRows = data?.data?.data ?? [];
  const page = data?.data?.page ?? 1;
  const totalPages = data?.data?.total_pages ?? 1;
  const totalRows = data?.data?.total_rows ?? 0;
  const limit = data?.data?.limit ?? 10;
  const queryClient = useQueryClient();

  const { showModal } = useFormsModal();
  const handleAddEntry = () => {
    showModal("Ledger Entry", "Add Ledger Entry here", <AddJournalEntryForm />);
  };

  return (
    <div className="flex flex-col text-zinc-100 font-sans overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold tracking-tight uppercase">
            Ledger
          </h1>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-[0.2em]">
            Financial Records
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Search reference..."
              className="bg-zinc-950 border border-zinc-800 rounded text-sm py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <button className="p-2 border border-zinc-800 rounded hover:bg-zinc-900">
            <Download className="w-4 h-4 text-zinc-400" />
          </button>
          <Button onClick={() => handleAddEntry()}>
            <Plus />
            Add Journal Entry
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-black border-b border-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Date
              </th>
              <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Narration
              </th>
              <th className="px-6 py-3 text-right text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Debit
              </th>
              <th className="px-6 py-3 text-right text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Credit
              </th>
              <th className="px-6 py-3 text-right text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Balance
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-950">
            {ledgerRows.map((row: any) => (
              <tr
                onClick={async () => {
                  const data = await queryClient.fetchQuery({
                    queryKey: [
                      "ledger-details",
                      selectedLegalEntity?.id,
                      row.id,
                    ],
                    queryFn: () =>
                      GetLegderEntryDetails(selectedLegalEntity?.id!, row.id),
                  });
                }}
                key={row.id}
                className="hover:bg-zinc-900/30 transition-colors"
              >
                <td className="px-6 py-4 text-zinc-500 font-mono text-[11px]">
                  {formatDateTimePretty(row.entry_date)}
                </td>

                <td className="px-6 py-4 text-zinc-300 font-medium">
                  {row.reference}
                </td>

                <td className="px-6 py-4 text-zinc-400">{row.narration}</td>

                <td className="px-6 py-4 text-right font-mono tabular-nums">
                  {row.debit > 0 ? row.debit.toFixed(2) : "—"}
                </td>

                <td className="px-6 py-4 text-right font-mono tabular-nums">
                  {row.credit > 0 ? row.credit.toFixed(2) : "—"}
                </td>

                <td className="px-6 py-4 text-right font-mono tabular-nums font-semibold text-white">
                  {row.balance?.toFixed(2) ?? "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="px-6 py-3 border-t border-zinc-900 bg-zinc-950/50 flex items-center justify-between">
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
          Showing {(page - 1) * limit + 1} - {Math.min(page * limit, totalRows)}{" "}
          of {totalRows}
        </div>

        <div className="flex items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-1 border border-zinc-800 rounded disabled:opacity-20 hover:bg-zinc-900"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-zinc-400">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-1 border border-zinc-800 rounded disabled:opacity-20 hover:bg-zinc-900"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LedgerPage;
