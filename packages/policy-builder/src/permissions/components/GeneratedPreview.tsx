import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@sharpnr/utils";
import { usePermissionMatrixContext } from "../context";
import { usePermissionMatrixStore } from "../store/usePermissionMatrixStore";
import { generatePolicyText } from "../utils/generatePreview";

/**
 * Developer-only view of the Cedar the server would generate. See
 * utils/generatePreview.ts for why this must never be shown to the people this
 * screen is built for.
 */
export function GeneratedPreview({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { allResources, palette } = usePermissionMatrixContext("Preview");
  const granted = usePermissionMatrixStore((s) => s.granted);
  const rules = usePermissionMatrixStore((s) => s.rules);

  return (
    <div className={cn("rounded-lg border border-dashed", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-muted-foreground hover:text-foreground flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium"
      >
        <ChevronRight
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-90")}
        />
        Developer preview — the policy the server generates from these boxes
      </button>
      {open && (
        <pre className="bg-muted/50 overflow-x-auto border-t border-dashed px-4 py-3 font-mono text-xs leading-relaxed">
          {generatePolicyText(allResources, granted, rules, palette)}
        </pre>
      )}
    </div>
  );
}
