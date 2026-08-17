import { Badge } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";

import type {
  DietaryType,
  MenuItemResponse,
} from "@/infra_workspace/apis/api.service";

// ─── Dietary indicator dot ────────────────────────────────────────────────────

const DIETARY_COLOR: Record<DietaryType, string> = {
  VEGETARIAN: "bg-green-500",
  NON_VEGETARIAN: "bg-red-500",
  VEGAN: "bg-emerald-400",
};

function DietaryDot({ type }: { type: DietaryType }) {
  return (
    <span
      className={cn(
        "inline-block h-2.5 w-2.5 rounded-sm border-2 border-current shrink-0",
        DIETARY_COLOR[type],
      )}
      title={type.replace(/_/g, " ")}
    />
  );
}

// ─── Single item card ─────────────────────────────────────────────────────────

interface MenuItemCardProps {
  item: MenuItemResponse;
  onSelect?: (item: MenuItemResponse) => void;
}

function MenuItemCard({ item }: MenuItemCardProps) {
  const setSelectedItem = useSalePosTerminalMenuStore((s) => s.setSelectedItem);
  const openVariantSeet = useSalePosTerminalMenuStore(
    (s) => s.openVariantSheet,
  );
  const hasVariants = item.variant_groups.length > 0;
  const hasAddOns = item.add_ons.length > 0;

  return (
    <button
      type="button"
      onClick={() => {
        setSelectedItem(item);
        openVariantSeet();
      }}
      className={cn(
        "group relative flex flex-col gap-1.5 rounded-xl border bg-card p-3.5 text-left",
        "shadow-sm transition-all duration-150",
        "hover:border-foreground/20 hover:shadow-md active:scale-[0.98]",
      )}
    >
      {/* Top row: dietary dot + name */}
      <div className="flex items-start gap-2">
        <DietaryDot type={item.dietary_type} />
        <span className="flex-1 text-sm font-semibold leading-snug text-card-foreground line-clamp-2">
          {item.name}
        </span>
      </div>

      {/* Description */}
      {item.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Badges: variants / add-ons */}
      {(hasVariants || hasAddOns) && (
        <div className="flex flex-wrap gap-1 mt-0.5">
          {hasVariants && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 font-normal"
            >
              {item.variant_groups[0].variant_group_name}
            </Badge>
          )}
          {hasAddOns && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 font-normal text-muted-foreground"
            >
              {item.add_ons.length} add-on{item.add_ons.length > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      )}

      {/* Price row */}
      <div className="mt-auto flex items-center justify-between pt-1.5 border-t border-border/50">
        <span className="text-base font-bold tabular-nums text-foreground">
          ₹{item.base_price}
        </span>
        <span className="text-xs text-muted-foreground capitalize">
          / {item.unit}
        </span>
      </div>
    </button>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <span className="text-3xl">🍽️</span>
      <p className="text-sm font-medium text-muted-foreground">
        No items in this section
      </p>
    </div>
  );
}

// ─── Items grid ───────────────────────────────────────────────────────────────

interface MenuItemsProps {
  /**
   * Called when the operator taps an item card.
   * Typically opens a variant/add-on picker before adding to cart.
   */
  onItemSelect?: (item: MenuItemResponse) => void;
}

export function MenuItems({ onItemSelect }: MenuItemsProps) {
  const filteredItems = useSalePosTerminalMenuStore((s) => s.filteredItems);

  if (!filteredItems.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
      {filteredItems.map((item) => (
        <MenuItemCard key={item.id} item={item} onSelect={onItemSelect} />
      ))}
    </div>
  );
}
