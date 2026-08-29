import { Search } from "lucide-react";
import { Input } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePermissionMatrixContext } from "../context";

/**
 * Search + a plain-language summary.
 *
 * The summary line is deliberately a sentence, not a stat block. "Sales Manager
 * can do 7 of 24 things" is answerable at a glance; "granted: 7" is not.
 */
export function MatrixToolbar({
  roleName,
  className,
}: {
  roleName?: string;
  className?: string;
}) {
  const { query, setQuery, grantedCount, totalCount } =
    usePermissionMatrixContext("Toolbar");

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-muted-foreground text-sm">
        <span className="text-foreground font-medium">
          {roleName || "This role"}
        </span>{" "}
        can do{" "}
        <span className="text-foreground font-medium">{grantedCount}</span> of{" "}
        {totalCount} things.
      </p>

      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search permissions…"
          className="pl-9"
        />
      </div>
    </div>
  );
}
