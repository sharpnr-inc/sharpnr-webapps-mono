import { Input, Label } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePolicyBuilderStore } from "../store/usePolicyBuilderStore";
// import { useOrgPrincipal } from "../api/queries";

export function Name({ className }: { className?: string }) {
  const name = usePolicyBuilderStore((s) => s.name);
  const setName = usePolicyBuilderStore((s) => s.setName);

  // Nothing here reads the principals yet — restore when this is wired up.
  // const { data } = useOrgPrincipal();

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium">Policy Name</Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Allow staff to view bookings"
      />
    </div>
  );
}
