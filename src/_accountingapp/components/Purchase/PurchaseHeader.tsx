// ── Header ────────────────────────────────────────────────────────────────────

import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, Send } from "lucide-react";

export function PurchaseHeader() {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg border shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Record Purchase Invoice
          </h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-muted-foreground font-mono"></span>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <span></span>
            <span></span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-teal-50 text-teal-700 border-teal-200">
              inventory update on post
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <Button
          variant="sharpnr"
          size="sm"
          className="gap-1.5"
          onClick={() => {}}
        >
          <FileText className="h-3.5 w-3.5" /> Save Draft
        </Button>
        <Button
          size="sm"
          className="gap-1.5 bg-slate-900 hover:bg-slate-800 text-white"
          onClick={() => {}}
        >
          <Send className="h-3.5 w-3.5" /> Post Invoice
        </Button>
      </div>
    </div>
  );
}
