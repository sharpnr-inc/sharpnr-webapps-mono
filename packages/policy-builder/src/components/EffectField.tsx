import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePolicyBuilderStore } from "../store/usePolicyBuilderStore";

export function EffectField({ className }: { className?: string }) {
  const effect = usePolicyBuilderStore((s) => s.effect);
  const setEffect = usePolicyBuilderStore((s) => s.setEffect);
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium">Effect</Label>
      <Select value={effect} onValueChange={(v) => setEffect(v as typeof effect)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="permit">Permit (allow)</SelectItem>
          <SelectItem value="forbid">Forbid (deny)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
