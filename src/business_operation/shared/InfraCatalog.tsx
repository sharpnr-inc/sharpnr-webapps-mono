import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Input, ScrollArea, Separator } from "@sharpnr/ui";
import {
  Boxes,
  Building2,
  Check,
  ChefHat,
  ConciergeBell,
  Loader2,
  Minus,
  Plus,
  Receipt,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  TriangleAlert,
  UtensilsCrossed,
  Users,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useInfraModules } from "./api/queries";

/* ──────────────────────────────────────────────────────────────
   Catalog presentation
   Segmentation: Category → Infra items (items come from the API).
   `moduleName` is a free string, so we resolve an icon by a
   normalized key and fall back to a generic infra icon.
─────────────────────────────────────────────────────────────── */

const ICON_BY_KEY: Record<string, LucideIcon> = {
  FRONTDESK: ConciergeBell,
  RECEPTION: ConciergeBell,
  BILLING: Receipt,
  BILLINGCOUNTER: Receipt,
  CASHIER: Receipt,
  SECURITY: ShieldCheck,
  SECURITYDESK: ShieldCheck,
  KITCHEN: ChefHat,
  CLOUDKITCHEN: ChefHat,
  TAKEAWAY: ShoppingBag,
  TAKEAWAYCOUNTER: ShoppingBag,
  BAR: Wine,
  BARSTATION: Wine,
  SERVICE: Users,
  SERVICESTATION: Users,
  STORE: Boxes,
  PANTRY: Boxes,
  STOREPANTRY: Boxes,
};

const normalizeKey = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

const iconFor = (moduleName: string): LucideIcon =>
  ICON_BY_KEY[normalizeKey(moduleName)] ?? Server;

/** Static category metadata, keyed to the API payload fields. */
const CATEGORIES = [
  {
    id: "general",
    name: "General",
    description: "Core infrastructure every property needs.",
    icon: Building2,
    dataKey: "general",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description: "Operational stations for food & beverage service.",
    icon: UtensilsCrossed,
    dataKey: "hospitality",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Clinical and patient-care infrastructure.",
    icon: Stethoscope,
    dataKey: "healthcare",
  },
] as const;

interface InfraItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  available: boolean;
  /** Always provisioned — can change quantity but not be removed. */
  required?: boolean;
  recommended?: boolean;
}

interface InfraCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  items: InfraItem[];
  comingSoon: boolean;
}

/* ──────────────────────────────────────────────────────────────
   Infra tile — selectable with quantity stepper
─────────────────────────────────────────────────────────────── */

function InfraTile({
  item,
  quantity,
  onAdd,
  onInc,
  onDec,
}: {
  item: InfraItem;
  quantity: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
}) {
  const Icon = item.icon;
  const selected = quantity > 0;
  const atMin = item.required && quantity <= 1;
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
      {/* selection check */}
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
          {item.required && (
            <Badge className="px-1.5 py-0 text-[10px]">Required</Badge>
          )}
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

      {/* add / quantity control */}
      {disabled ? null : selected ? (
        <div className="mt-1 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 disabled:opacity-40"
            disabled={atMin}
            onClick={onDec}
            aria-label={
              item.required ? "Decrease quantity" : "Decrease or remove"
            }
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onInc}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="mt-1 w-full gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Catalog
─────────────────────────────────────────────────────────────── */

interface InfraCatalogProps {
  closeModal: () => void;
}

const InfraCatalog = ({ closeModal }: InfraCatalogProps) => {
  const { data, isLoading, isError } = useInfraModules();
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    CATEGORIES[0].id,
  );
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const search = query.trim().toLowerCase();
  const isSearching = search.length > 0;

  // Merge static category metadata with the items returned by the API.
  const catalog = useMemo<InfraCategory[]>(() => {
    return CATEGORIES.map((category) => {
      const raw = data?.data?.[category.dataKey] ?? [];
      const items: InfraItem[] = raw.map((m) => {
        const badge = "badge" in m ? m.badge : undefined;
        return {
          id: m.id,
          name: m.moduleName,
          description: m.description,
          icon: iconFor(m.moduleName),
          tags: m.tags ?? [],
          available: m.isAvailable,
          required: badge === "Required",
          recommended: badge === "Recommended",
        };
      });
      return { ...category, items, comingSoon: items.length === 0 };
    });
  }, [data]);

  // Provision required items at quantity 1 once the catalog loads.
  useEffect(() => {
    setQuantities((prev) => {
      let changed = false;
      const next = { ...prev };
      catalog.forEach((c) =>
        c.items.forEach((it) => {
          if (it.required && next[it.id] === undefined) {
            next[it.id] = 1;
            changed = true;
          }
        }),
      );
      return changed ? next : prev;
    });
  }, [catalog]);

  const setQty = (item: InfraItem, qty: number) =>
    setQuantities((prev) => {
      const next = { ...prev };
      const min = item.required ? 1 : 0;
      if (qty <= min && min === 0) delete next[item.id];
      else next[item.id] = Math.max(min, qty);
      return next;
    });

  const activeCategory =
    catalog.find((c) => c.id === activeCategoryId) ?? catalog[0];

  // While searching we match across every category; otherwise the active one.
  const results = useMemo(() => {
    const matches = (i: InfraItem) =>
      i.name.toLowerCase().includes(search) ||
      i.description.toLowerCase().includes(search) ||
      i.tags.some((t) => t.toLowerCase().includes(search));

    if (isSearching) {
      return catalog.flatMap((c) => c.items.filter(matches));
    }
    return activeCategory?.items ?? [];
  }, [catalog, search, isSearching, activeCategory]);

  const totalItems = catalog.reduce((n, c) => n + c.items.length, 0);

  const selectedCount = Object.keys(quantities).length;
  const totalUnits = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleContinue = () => {
    // TODO: persist the selected infra (id + quantity) via the add-infra API.
    closeModal();
  };

  if (isLoading) {
    return (
      <div className="flex h-[68vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">Loading infrastructure…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[68vh] flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-destructive/10 text-destructive">
          <TriangleAlert className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Couldn’t load infrastructure
          </p>
          <p className="text-xs text-muted-foreground">
            Please close this dialog and try again.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={closeModal}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[68vh] flex-col">
      {/* ── Search ─────────────────────────────────── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${totalItems} infrastructure across all categories…`}
          className="pl-9"
        />
      </div>

      <div className="mt-4 flex min-h-0 flex-1 gap-5">
        {/* ── Category rail ────────────────────────── */}
        <aside className="hidden w-52 shrink-0 flex-col gap-1 sm:flex">
          <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Categories
          </p>
          {catalog.map((category) => {
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
                {results.map((item) => {
                  const qty = quantities[item.id] ?? 0;
                  return (
                    <InfraTile
                      key={item.id}
                      item={item}
                      quantity={qty}
                      onAdd={() => setQty(item, 1)}
                      onInc={() => setQty(item, qty + 1)}
                      onDec={() => setQty(item, qty - 1)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {isSearching
                    ? "No infrastructure matches your search"
                    : "Nothing here yet"}
                </p>
                <p className="max-w-xs text-xs text-muted-foreground">
                  {isSearching
                    ? "Try a different keyword or clear the search."
                    : `${activeCategory?.name ?? "This"} infrastructure is coming soon.`}
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
              {selectedCount === 1 ? "type" : "types"} ·{" "}
              <span className="font-semibold text-foreground">
                {totalUnits}
              </span>{" "}
              {totalUnits === 1 ? "unit" : "units"} selected
            </>
          ) : (
            "Select infrastructure and set quantities to continue."
          )}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={selectedCount === 0}
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Add{totalUnits > 0 ? ` ${totalUnits}` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfraCatalog;
