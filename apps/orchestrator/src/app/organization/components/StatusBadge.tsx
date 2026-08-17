import { Badge } from "@sharpnr/ui";
import { cn } from "@sharpnr/ui";
import { statusLabel, type Property } from "./orgData";

// Monochrome status pill — meaning is carried by the dot fill, not colour.
export function StatusBadge({ status }: { status: Property["status"] }) {
  return (
    <Badge variant="outline" className="gap-1.5 font-normal">
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          status === "operational" && "bg-foreground",
          status === "renovation" && "border border-foreground bg-transparent",
          status === "closed" && "bg-muted-foreground/40",
        )}
      />
      {statusLabel[status]}
    </Badge>
  );
}
