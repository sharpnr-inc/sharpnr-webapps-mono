import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge, Button, Input, ScrollArea, Separator } from "@sharpnr/ui";
import {
  BookOpen,
  Boxes,
  Building2,
  Check,
  FlaskConical,
  Loader2,
  Percent,
  Pill,
  Search,
  Sparkles,
  Stethoscope,
  Tag,
  UtensilsCrossed,
  Utensils,
  type LucideIcon,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Resource catalog (DUMMY DATA)

   Resources are reusable assets shared between infra and business
   modules — e.g. a Menu (Hospitality) reused across a Kitchen, a
   Restaurant and a Hotel, so the user defines it once.

   No API exists yet, so the catalog below is hard-coded and the
   "Add" action is simulated. Swap CATALOG for an API-backed query
   when the endpoint is ready (mirror InfraCatalog.tsx).
─────────────────────────────────────────────────────────────── */

interface ResourceItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  available: boolean;
  recommended?: boolean;
}

interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  items: ResourceItem[];
  comingSoon: boolean;
}

const RAW_CATALOG: Omit<ResourceCategory, "comingSoon">[] = [
  {
    id: "general",
    name: "General",
    description: "Reusable assets every property can share.",
    icon: Building2,
    items: [
      {
        id: "res-tax-profile",
        name: "Tax Profile",
        description:
          "Tax rates and rules applied across billing counters and modules.",
        icon: Percent,
        tags: ["Billing", "Shared"],
        available: true,
      },
      {
        id: "res-price-list",
        name: "Price List",
        description:
          "A reusable set of prices that any module can reference.",
        icon: Tag,
        tags: ["Pricing", "Shared"],
        available: true,
      },
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description: "Food, beverage and lodging resources.",
    icon: UtensilsCrossed,
    items: [
      {
        id: "res-menu",
        name: "Menu",
        description:
          "A single menu shared across a Kitchen, Restaurant and Hotel.",
        icon: BookOpen,
        tags: ["Kitchen", "Restaurant", "Hotel"],
        available: true,
        recommended: true,
      },
      {
        id: "res-recipe",
        name: "Recipe Book",
        description:
          "Standardised recipes reused by kitchens and cloud kitchens.",
        icon: Utensils,
        tags: ["Kitchen"],
        available: true,
      },
      {
        id: "res-ingredients",
        name: "Ingredient Catalog",
        description:
          "Master list of ingredients shared by recipes and inventory.",
        icon: Boxes,
        tags: ["Inventory"],
        available: true,
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Clinical and patient-care resources.",
    icon: Stethoscope,
    items: [
      {
        id: "res-medicine-catalog",
        name: "Medicine Catalog",
        description:
          "Shared formulary reused by pharmacy counters and prescriptions.",
        icon: Pill,
        tags: ["Pharmacy"],
        available: false,
      },
      {
        id: "res-test-panel",
        name: "Test Panel",
        description:
          "Reusable diagnostic test panels shared across the lab.",
        icon: FlaskConical,
        tags: ["Lab"],
        available: false,
      },
    ],
  },
];

const CATALOG: ResourceCategory[] = RAW_CATALOG.map((c) => ({
  ...c,
  comingSoon: c.items.every((i) => !i.available),
}));

/* ──────────────────────────────────────────────────────────────
   Resource tile — selectable (no quantity; resources are shared
   singletons created once and reused).
─────────────────────────────────────────────────────────────── */

function ResourceTile({
  item,
  selected,
  onToggle,
}: {
  item: ResourceItem;
  selected: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const disabled = !item.available;

  return (
    <div
      className={`group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 ${
        disabled
          ? "border-border/60 bg-muted/30 opacity-70"
          : selected
            ? "border-primary/60 bg-primary/5 ring-1 ring-primary/40"
            : "border-border/70 bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </span>
      )}

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
          selected
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-border bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
          {item.recommended && (
            <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
              Recommended
            </Badge>
          )}
          {disabled && (
            <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
              Coming soon
            </Badge>
          )}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {item.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {item.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-md px-1.5 py-0 text-[10px] font-medium"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {disabled ? null : (
        <Button
          type="button"
          variant={selected ? "secondary" : "outline"}
          size="sm"
          onClick={onToggle}
          className="mt-1 w-full gap-1.5"
        >
          {selected ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Added
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              Add
            </>
          )}
        </Button>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Catalog
─────────────────────────────────────────────────────────────── */

interface ResourceCatalogProps {
  closeModal: () => void;
  propertyID: string;
}

const ResourceCatalog = ({ closeModal, propertyID }: ResourceCatalogProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    CATALOG[0].id,
  );
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [isPending, setIsPending] = useState(false);

  const search = query.trim().toLowerCase();
  const isSearching = search.length > 0;

  const toggle = (item: ResourceItem) =>
    setSelected((prev) => {
      const next = { ...prev };
      if (next[item.id]) delete next[item.id];
      else next[item.id] = true;
      return next;
    });

  const activeCategory =
    CATALOG.find((c) => c.id === activeCategoryId) ?? CATALOG[0];

  const results = useMemo(() => {
    const matches = (i: ResourceItem) =>
      i.name.toLowerCase().includes(search) ||
      i.description.toLowerCase().includes(search) ||
      i.tags.some((t) => t.toLowerCase().includes(search));

    if (isSearching) return CATALOG.flatMap((c) => c.items.filter(matches));
    return activeCategory?.items ?? [];
  }, [search, isSearching, activeCategory]);

  const totalItems = CATALOG.reduce((n, c) => n + c.items.length, 0);
  const selectedCount = Object.keys(selected).length;

  // No API yet — simulate the add request.
  const handleContinue = () => {
    if (selectedCount === 0) return;
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast.success(
        `${selectedCount} resource${selectedCount === 1 ? "" : "s"} added (demo)`,
      );
      // propertyID will be used to scope the real mutation/invalidation later.
      void propertyID;
      closeModal();
    }, 700);
  };

  return (
    <div className="flex h-[68vh] flex-col">
      {/* ── Search ─────────────────────────────────── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${totalItems} resources across all categories…`}
          className="pl-9"
        />
      </div>

      <div className="mt-4 flex min-h-0 flex-1 gap-5">
        {/* ── Category rail ────────────────────────── */}
        <aside className="hidden w-52 shrink-0 flex-col gap-1 sm:flex">
          <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Categories
          </p>
          {CATALOG.map((category) => {
            const Icon = category.icon;
            const isActive = !isSearching && category.id === activeCategoryId;
            const count = category.items.length;
            return (
              <button
                key={category.id}
                type="button"
                disabled={isSearching}
                onClick={() => setActiveCategoryId(category.id)}
                className={`flex items-start gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors disabled:opacity-50 ${
                  isActive
                    ? "border-primary/40 bg-primary/5"
                    : "border-transparent hover:border-border hover:bg-muted/50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    isActive
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium text-foreground">
                      {category.name}
                    </span>
                    {category.comingSoon && (
                      <Badge
                        variant="outline"
                        className="shrink-0 px-1 py-0 text-[9px]"
                      >
                        Soon
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {count > 0 ? `${count} options` : "Coming soon"}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>

        <Separator orientation="vertical" className="hidden sm:block" />

        {/* ── Item grid ────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-baseline justify-between pb-3">
            <h2 className="text-sm font-semibold text-foreground">
              {isSearching
                ? `Results for “${query.trim()}”`
                : activeCategory?.name}
            </h2>
            <span className="text-xs text-muted-foreground">
              {results.length} {results.length === 1 ? "option" : "options"}
            </span>
          </div>

          <ScrollArea className="min-h-0 flex-1 pr-3">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {results.map((item) => (
                  <ResourceTile
                    key={item.id}
                    item={item}
                    selected={!!selected[item.id]}
                    onToggle={() => toggle(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {isSearching
                    ? "No resources match your search"
                    : "Nothing here yet"}
                </p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  {isSearching
                    ? "Try a different keyword or clear the search."
                    : `${activeCategory?.name ?? "These"} resources are coming soon.`}
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* ── Action bar ───────────────────────────────── */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <p className="text-sm text-muted-foreground">
          {selectedCount > 0 ? (
            <>
              <span className="font-semibold text-foreground">
                {selectedCount}
              </span>{" "}
              {selectedCount === 1 ? "resource" : "resources"} selected
            </>
          ) : (
            "Select resources to share across your modules."
          )}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={closeModal} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={selectedCount === 0 || isPending}
            className="gap-1.5"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Add{selectedCount > 0 ? ` ${selectedCount}` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCatalog;
