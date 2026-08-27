import { Label, Textarea } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePolicyBuilderStore } from "../store/usePolicyBuilderStore";

export function Description({ className }: { className?: string }) {
  const description = usePolicyBuilderStore((s) => s.description);
  const setDescription = usePolicyBuilderStore((s) => s.setDescription);
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium">Description</Label>
      <Textarea
        value={description}
        rows={2}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What does this policy do?"
      />
    </div>
  );
}
