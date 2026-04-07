import { BookOpen } from "lucide-react";

export function PurchaseJournalEntrySummary() {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/40 dark:bg-blue-950/20 p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-1 border-b border-blue-200/60">
        <BookOpen className="h-4 w-4 text-blue-500" />
        <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
          Journal Entry Preview (on Post)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-blue-200">
              <th className="text-left py-1.5 text-muted-foreground font-semibold">
                Account
              </th>
              <th className="text-right py-1.5 text-muted-foreground font-semibold w-[110px]">
                Debit
              </th>
              <th className="text-right py-1.5 text-muted-foreground font-semibold w-[110px]">
                Credit
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {journalLines.map((l) => {
              const acc = selectAccountByID(l.debitAccountId);
              return (
                <tr key={l.id} className="border-b border-blue-100/60">
                  <td className="py-1.5 text-foreground">
                    <span className="font-mono text-[10px] text-muted-foreground mr-1.5">
                      {acc?.code}
                    </span>
                    {acc?.name ?? "—"}
                    <span className="text-muted-foreground ml-1.5 text-[10px]">
                      ({l.description || "line item"})
                    </span>
                  </td>
                  <td className="py-1.5 text-right tabular-nums text-blue-700 dark:text-blue-400 font-medium">
                    {fmt(l.totalAmount)}
                  </td>
                  <td className="py-1.5 text-right text-muted-foreground">—</td>
                </tr>
              );
            })}

          
            <tr>
              <td className="py-1.5 text-foreground">
                <span className="font-mono text-[10px] text-muted-foreground mr-1.5">
                  {payableAccount?.code}
                </span>
                {payableAccount?.name ?? "Accounts Payable"}
                {selectedSupplier && (
                  <span className="text-muted-foreground ml-1.5 text-[10px]">
                    ({selectedSupplier.name})
                  </span>
                )}
              </td>
              <td className="py-1.5 text-right text-muted-foreground">—</td>
              <td className="py-1.5 text-right tabular-nums text-green-700 dark:text-green-400 font-medium">
                {fmt(grandTotal)}
              </td>
            </tr>
          </tbody> */}
        </table>
      </div>

      <p className="text-[11px] text-muted-foreground">
        This journal entry is auto-created when you click{" "}
        <strong>Post Invoice</strong>.
      </p>
    </div>
  );
}
