import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button, Checkbox, Input, Label } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { usePermissionMatrixStore } from "../store/usePermissionMatrixStore";
import type { ResourceDescriptor } from "../types";

/**
 * Which instances a restricted resource covers.
 *
 * Only rendered when the resource's scope is "selected" — see
 * ResourcePermissions. Search appears once the list is long enough to need it;
 * below that it is noise.
 */
export function InstancePicker({
  resource,
  className,
}: {
  resource: ResourceDescriptor;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const rules = usePermissionMatrixStore((s) => s.rules);
  const toggleInstance = usePermissionMatrixStore((s) => s.toggleInstance);
  const setInstances = usePermissionMatrixStore((s) => s.setInstances);

  const instances = resource.instances ?? [];
  const picked = rules[resource.type]?.instances ?? [];
  const showSearch = instances.length > 8;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return instances;
    return instances.filter((i) => i.label.toLowerCase().includes(q));
  }, [instances, query]);

  return (
    <div className={cn("border-t px-4 py-3", className)}>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs">
          {picked.length === 0 ? (
            // An empty restricted list grants nothing, and that is easy to do
            // by accident — say so here rather than letting the role look
            // configured when it is not.
            <span className="text-amber-600 dark:text-amber-500">
              No {resource.label.toLowerCase()} selected — these permissions
              currently grant nothing.
            </span>
          ) : (
            <>
              {picked.length} of {instances.length}{" "}
              {resource.label.toLowerCase()} selected
            </>
          )}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 shrink-0 px-2 text-xs"
          onClick={() =>
            setInstances(
              resource.type,
              picked.length === instances.length
                ? []
                : instances.map((i) => i.id),
            )
          }
        >
          {picked.length === instances.length ? "Clear all" : "Select all"}
        </Button>
      </div>

      {showSearch && (
        <div className="relative mb-2">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${resource.label.toLowerCase()}…`}
            className="h-8 pl-8 text-sm"
          />
        </div>
      )}

      <div className="max-h-56 space-y-0.5 overflow-y-auto">
        {visible.map((instance) => {
          const id = `inst-${resource.type}-${instance.id}`;
          return (
            <div
              key={instance.id}
              className="hover:bg-muted/60 flex items-center gap-2.5 rounded-md px-2 py-1.5"
            >
              <Checkbox
                id={id}
                checked={picked.includes(instance.id)}
                onCheckedChange={() =>
                  toggleInstance(resource.type, instance.id)
                }
              />
              <Label
                htmlFor={id}
                className="cursor-pointer truncate text-sm font-normal"
              >
                {instance.label}
              </Label>
            </div>
          );
        })}

        {visible.length === 0 && (
          <p className="text-muted-foreground px-2 py-3 text-xs">
            Nothing matches “{query}”.
          </p>
        )}
      </div>
    </div>
  );
}
