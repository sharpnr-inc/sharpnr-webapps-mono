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
        </table>
      </div>

      <p className="text-[11px] text-muted-foreground">
        This journal entry is auto-created when you click{" "}
        <strong>Post Invoice</strong>.
      </p>
    </div>
  );
}
