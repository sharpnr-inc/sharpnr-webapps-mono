import { Button } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePermissionMatrixContext } from "../context";
import { usePermissionMatrixStore } from "../store/usePermissionMatrixStore";

/** Save / Reset. Both disabled until something actually changed. */
export function MatrixFooter({ className }: { className?: string }) {
  const { dirty, saving, onSave } = usePermissionMatrixContext("Footer");
  const reset = usePermissionMatrixStore((s) => s.reset);

  return (
    <div
      className={cn(
        "bg-background/80 sticky bottom-0 flex items-center justify-between gap-3 border-t py-3 backdrop-blur",
        className,
      )}
    >
      <p className="text-muted-foreground text-xs">
        {dirty ? "You have unsaved changes." : "Everything is saved."}
      </p>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={!dirty || saving}
          onClick={reset}
        >
          Reset
        </Button>
        <Button size="sm" disabled={!dirty || saving} onClick={onSave}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
