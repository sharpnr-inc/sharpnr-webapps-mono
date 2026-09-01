import {
  Badge,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import {
  isScopable,
  sectionState,
  usePermissionMatrixStore,
  type ScopeMode,
} from "../store/usePermissionMatrixStore";
import type { ResourceDescriptor } from "../types";
import { usePermissionMatrixContext } from "../context";
import { InstancePicker } from "./InstancePicker";
import { ResourceConditions } from "./ResourceConditions";

/**
 * One resource, with its actions as checkboxes and — where it makes sense — a
 * control for whether those permissions cover everything or only named
 * instances.
 *
 * Actions are rendered per resource rather than as shared table columns
 * because action sets genuinely differ: a Property has "Set up facilities", a
 * Role has "Assign roles to people". Forcing them into one grid would produce
 * a table that is mostly blank cells, which reads as broken rather than empty.
 */
export function ResourcePermissions({
  resource,
  className,
}: {
  resource: ResourceDescriptor;
  className?: string;
}) {
  const { palette } = usePermissionMatrixContext("Groups");
  const granted = usePermissionMatrixStore((s) => s.granted);
  const rules = usePermissionMatrixStore((s) => s.rules);
  const toggle = usePermissionMatrixStore((s) => s.toggle);
  const setMany = usePermissionMatrixStore((s) => s.setMany);
  const setScopeMode = usePermissionMatrixStore((s) => s.setScopeMode);

  const state = sectionState(resource, granted);
  const count = resource.actions.filter((a) => granted.has(a.name)).length;
  const allIds = resource.actions.map((a) => a.name);

  const scopable = isScopable(resource);
  const mode: ScopeMode =
    rules[resource.type]?.instances === undefined ? "all" : "selected";
  // The scope control only matters once something on this resource is granted;
  // showing it on an untouched section is a decision nobody has reached yet.
  const showScope = scopable && count > 0;

  return (
    <div className={cn("rounded-lg border", className)}>
      <div className="flex items-start justify-between gap-4 border-b px-4 py-3">
        <div className="flex items-start gap-3">
          {/*
            A plain on/off select-all, NOT Radix's `indeterminate`. The shared
            <Checkbox> always renders a check icon, so an indeterminate box
            would look exactly like a fully-granted one — a control that lies
            about state is worse than one that says less. Partial grants are
            communicated by the "n of m" badge instead, which is also easier to
            read than a dash for the people this screen is for.
          */}
          <Checkbox
            id={`res-${resource.type}`}
            className="mt-0.5"
            checked={state === "all"}
            aria-label={
              state === "all"
                ? `Remove all ${resource.label} permissions`
                : `Grant all ${resource.label} permissions`
            }
            onCheckedChange={() => setMany(allIds, state !== "all")}
          />
          <div className="space-y-0.5">
            <Label
              htmlFor={`res-${resource.type}`}
              className="cursor-pointer text-sm font-medium"
            >
              {resource.label}
            </Label>
            {resource.description && (
              <p className="text-muted-foreground text-xs">
                {resource.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {showScope && (
            <Select
              value={mode}
              onValueChange={(v) => setScopeMode(resource.type, v as ScopeMode)}
            >
              <SelectTrigger
                className="h-7 w-auto gap-1.5 text-xs"
                aria-label={`Which ${resource.label.toLowerCase()} these permissions cover`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {resource.label.toLowerCase()}</SelectItem>
                <SelectItem value="selected">Only selected</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Badge
            variant={
              state === "all"
                ? "default"
                : state === "some"
                  ? "secondary"
                  : "outline"
            }
          >
            {count} of {resource.actions.length}
          </Badge>
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-1 p-3 sm:grid-cols-2">
        {resource.actions.map((action) => {
          const id = `act-${resource.type}-${action.name}`;
          const on = granted.has(action.name);
          // A type-level action cannot be narrowed to an instance, so say so
          // rather than letting someone assume "Only selected" restricted it.
          const unscopable =
            mode === "selected" && on && !action.requiresInstance;

          return (
            <div
              key={action.name}
              className="hover:bg-muted/50 flex items-start gap-3 rounded-md px-2 py-2"
            >
              <Checkbox
                id={id}
                className="mt-0.5"
                checked={on}
                onCheckedChange={() => toggle(action.name)}
              />
              <div className="min-w-0 space-y-0.5">
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-sm font-normal"
                >
                  {action.label}
                </Label>
                {action.description && (
                  <p className="text-muted-foreground text-xs leading-snug">
                    {action.description}
                  </p>
                )}
                {unscopable && (
                  <p className="text-muted-foreground text-xs leading-snug italic">
                    Always applies org-wide — there is no single{" "}
                    {resource.label.toLowerCase().replace(/s$/, "")} to limit it
                    to.
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {resource.actions.length === 0 && (
          <p className="text-muted-foreground px-2 py-2 text-xs">
            This resource registered no actions.
          </p>
        )}
      </div>

      {showScope && mode === "selected" && (
        <InstancePicker resource={resource} />
      )}

      {/* Restrictions apply to whatever is granted above, scoped or not, so
          this sits below the instance picker rather than inside it. */}
      {count > 0 && (
        <ResourceConditions resource={resource} palette={palette} />
      )}
    </div>
  );
}
