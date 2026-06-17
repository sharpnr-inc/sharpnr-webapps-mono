import { useMemo, useState } from "react";
import { Badge, Button, Input, ScrollArea, Separator } from "@sharpnr/ui";
import {
  Boxes,
  Building2,
  Check,
  ChefHat,
  ConciergeBell,
  Minus,
  Plus,
  Receipt,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Users,
  Wine,
  type LucideIcon,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   Catalog data
   Segmentation: Category → Infra items
   Categories: General (must) · Hospitality · Healthcare (soon)
   Extensible: add a category object or an infra entry.
─────────────────────────────────────────────────────────────── */

interface InfraItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
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
  comingSoon?: boolean;
}

const CATALOG: InfraCategory[] = [
  {
    id: "general",
    name: "General",
    description: "Core infrastructure every property needs.",
    icon: Building2,
    items: [
      {
        id: "front-desk",
        name: "Front Desk / Reception",
        description:
          "Guest-facing desk for check-in, enquiries and walk-ins.",
        icon: ConciergeBell,
        tags: ["Reception", "Walk-ins"],
        required: true,
      },
      {
        id: "billing-counter",
        name: "Billing Counter",
        description: "Cashier point for invoicing, payments and settlements.",
        icon: Receipt,
        tags: ["Cashier", "Payments"],
        recommended: true,
      },
      {
        id: "security-desk",
        name: "Security Desk",
        description: "Entrance control, visitor logs and premises monitoring.",
        icon: ShieldCheck,
        tags: ["Entrance", "Visitors"],
      },
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description: "Operational stations for food & beverage service.",
    icon: UtensilsCrossed,
    items: [
      {
        id: "kitchen",
        name: "Kitchen",
        description:
          "Kitchen display system for preparing and tracking food orders.",
        icon: ChefHat,
        tags: ["KDS", "Prep"],
        recommended: true,
      },
      {
        id: "takeaway-counter",
        name: "Takeaway Counter",
        description: "Pickup point for to-go orders, packing and handover.",
        icon: ShoppingBag,
        tags: ["Pickup", "To-go"],
      },
      {
        id: "bar-station",
        name: "Bar Station",
        description: "Beverage prep station with tabs and bartender queue.",
        icon: Wine,
        tags: ["Drinks", "Tabs"],
      },
      {
        id: "service-station",
        name: "Service Station",
        description: "Waiter / server hub for table assignments and runners.",
        icon: Users,
        tags: ["Servers", "Tables"],
      },
      {
        id: "store-pantry",
        name: "Store / Pantry",
        description: "Stock room for inventory, supplies and indents.",
        icon: Boxes,
        tags: ["Inventory", "Supplies"],
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Clinical and patient-care infrastructure.",
    icon: Stethoscope,
    comingSoon: true,
    items: [],
  },
];

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

  return (
    <div
      className={`group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 ${
        selected
          ? "border-primary/60 bg-primary/5 ring-1 ring-primary/40"
          : "border-border/70 bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {/* selection check */}
      <span
        className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-transparent"
        }`}
      >
        <Check className="h-3 w-3" />
      </span>

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
      {selected ? (
        <div className="mt-1 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 disabled:opacity-40"
            disabled={atMin}
            onClick={onDec}
            aria-label={item.required ? "Decrease quantity" : "Decrease or remove"}
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

/** Required items are provisioned by default at quantity 1. */
const initialQuantities = (): Record<string, number> =>
  Object.fromEntries(
    CATALOG.flatMap((c) =>
      c.items.filter((i) => i.required).map((i) => [i.id, 1]),
    ),
  );

const InfraCatalog = ({ closeModal }: InfraCatalogProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState(CATALOG[0].id);
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] =
    useState<Record<string, number>>(initialQuantities);

  const search = query.trim().toLowerCase();
  const isSearching = search.length > 0;

  const setQty = (item: InfraItem, qty: number) =>
    setQuantities((prev) => {
      const next = { ...prev };
      const min = item.required ? 1 : 0;
      if (qty <= min && min === 0) delete next[item.id];
      else next[item.id] = Math.max(min, qty);
      return next;
    });

  const activeCategory =
    CATALOG.find((c) => c.id === activeCategoryId) ?? CATALOG[0];

  // While searching we match across every category; otherwise the active one.
  const results = useMemo(() => {
    const matches = (i: InfraItem) =>
      i.name.toLowerCase().includes(search) ||
      i.description.toLowerCase().includes(search) ||
      i.tags.some((t) => t.toLowerCase().includes(search));

    if (isSearching) {
      return CATALOG.flatMap((c) => c.items.filter(matches));
    }
    return activeCategory.items;
  }, [search, isSearching, activeCategory]);

  const totalItems = CATALOG.reduce((n, c) => n + c.items.length, 0);

  const selectedCount = Object.keys(quantities).length;
  const totalUnits = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleContinue = () => {
    // TODO: persist the selected infra (id + quantity) via the add-infra API.
    closeModal();
  };

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
                : activeCategory.name}
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
                    : `${activeCategory.name} infrastructure is coming soon.`}
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
