/*
 * Shared presentation for the three top-level blocks on PropertyDetailsPage:
 *   1. Business Operation Modules  → sub-groups: Hospitality, Healthcare
 *   2. Infrastructure              → sub-groups: General, Hospitality, Healthcare
 *   3. Resources                   → sub-groups: General, Hospitality, Healthcare
 *
 * `PropertySection` is the named outer block (title, description, total count,
 * Add button, and the loading/error/empty states). `SubGroup` is one labelled
 * category inside it — each maps to one field of that section's API response.
 */

import type { ElementType, ReactNode } from "react";
import { Badge, Button } from "@sharpnr/ui";
import { Plus } from "lucide-react";

type Accent = "business" | "infra" | "resource";

const ACCENT_TONE: Record<Accent, string> = {
  business: "border-primary/20 bg-primary/10 text-primary",
  infra: "border-border bg-muted text-muted-foreground",
  resource: "border-border bg-muted text-muted-foreground",
};

export function PropertySection({
  icon: Icon,
  title,
  description,
  count,
  accent,
  addLabel,
  onAdd,
  isLoading,
  isError,
  emptyHint,
  children,
}: {
  icon: ElementType;
  title: string;
  description: string;
  count: number;
  accent: Accent;
  addLabel: string;
  onAdd?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  /** Shown when the section has loaded but holds nothing. */
  emptyHint: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${ACCENT_TONE[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <Badge variant="outline" className="font-mono text-[10px]">
              {count}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {onAdd && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="ml-auto shrink-0 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            {addLabel}
          </Button>
        )}
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : isError ? (
        <p className="text-sm text-destructive">Failed to load.</p>
      ) : count === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyHint}</p>
      ) : (
        <div className="space-y-6">{children}</div>
      )}
    </section>
  );
}

export function SubGroup({
  icon: Icon,
  title,
  description,
  count,
  children,
}: {
  icon: ElementType;
  title: string;
  description: string;
  count: number;
  children: ReactNode;
}) {
  // Empty categories are omitted entirely to keep the page focused.
  if (count === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
        <Badge
          variant="secondary"
          className="px-1.5 py-0 font-mono text-[10px]"
        >
          {count}
        </Badge>
        <span className="truncate text-[11px] text-muted-foreground/70">
          {description}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

/** One label/value line, used inside the cards' hover-card detail panels. */
export function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{children}</span>
    </div>
  );
}
