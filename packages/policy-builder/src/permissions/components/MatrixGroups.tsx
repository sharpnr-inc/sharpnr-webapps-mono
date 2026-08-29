import { Skeleton } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePermissionMatrixContext } from "../context";
import { groupCatalog } from "../store/usePermissionMatrixStore";
import { ResourcePermissions } from "./ResourcePermissions";

/** The checkbox sections, grouped by category. */
export function MatrixGroups({ className }: { className?: string }) {
  const { catalog, loading, query } = usePermissionMatrixContext("Groups");

  if (loading) {
    return (
      <div className={cn("space-y-3", className)}>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (catalog.length === 0) {
    return (
      <p className={cn("text-muted-foreground py-10 text-center text-sm", className)}>
        {query
          ? `Nothing matches “${query}”.`
          : "No permissions are available yet."}
      </p>
    );
  }

  const groups = groupCatalog(catalog);
  const showHeadings = groups.length > 1;

  return (
    <div className={cn("space-y-6", className)}>
      {groups.map((group) => (
        <div key={group.category} className="space-y-3">
          {showHeadings && (
            <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              {group.category}
            </h3>
          )}
          {group.resources.map((resource) => (
            <ResourcePermissions key={resource.type} resource={resource} />
          ))}
        </div>
      ))}
    </div>
  );
}
