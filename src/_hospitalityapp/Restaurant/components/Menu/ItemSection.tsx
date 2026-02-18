import { cn } from "@/lib/utils";
import { useMenuStore, ALL_CATEGORY_ID } from "./store/MenuStore";
import type { MenuItem, DietaryType } from "./types";

interface ItemSectionProps {
  className?: string;
}

const ItemSection: React.FC<ItemSectionProps> = ({ className }) => {
  const { categories, allItems, activeCategoryId, activeSubCategoryId } =
    useMenuStore();

  const openVariant = useMenuStore((state) => state.openVariant);

  /* -----------------------------
     Resolve Items Dynamically
  ----------------------------- */
  let items: MenuItem[] = [];

  if (activeCategoryId === ALL_CATEGORY_ID) {
    items = allItems;
  } else {
    const category = categories.find((c) => c.id === activeCategoryId);

    if (activeSubCategoryId) {
      const sub = category?.sub_categories.find(
        (s) => s.id === activeSubCategoryId,
      );
      items = sub?.menu_items ?? [];
    } else {
      // If category selected but no subcategory → flatten all sub items
      items = category?.sub_categories.flatMap((sub) => sub.menu_items) ?? [];
    }
  }

  /* -----------------------------
     Click Handler
  ----------------------------- */
  const handleSelectItem = (item: MenuItem) => {
    const hasVariants = item.variant_groups.length > 0;
    const hasAddons = item.add_ons.length > 0;

    if (hasVariants || hasAddons) {
      openVariant(item);
      return;
    }

    console.log("Add Directly to Cart", item);
    // addToCart(item)
  };

  /* -----------------------------
     Helpers
  ----------------------------- */
  const getDietaryColor = (type: DietaryType) => {
    switch (type) {
      case "VEGETARIAN":
        return "bg-green-100 text-green-700";
      case "NON_VEGETARIAN":
        return "bg-red-100 text-red-700";
      case "VEGAN":
        return "bg-emerald-100 text-emerald-700";
      case "EGGETARIAN":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDietary = (type: DietaryType) => {
    switch (type) {
      case "VEGETARIAN":
        return "Veg";
      case "NON_VEGETARIAN":
        return "Non-Veg";
      case "VEGAN":
        return "Vegan";
      case "EGGETARIAN":
        return "Egg";
      default:
        return type;
    }
  };

  /* -----------------------------
     Render
  ----------------------------- */
  return (
    <div
      className={cn(
        "grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-2",
        className,
      )}
    >
      {items.map((item) => {
        const totalVariants = item.variant_groups.reduce(
          (acc, group) => acc + group.variants.length,
          0,
        );

        // const hasCustomization = totalVariants > 0 || item.add_ons.length > 0;

        return (
          <div
            key={item.id}
            onClick={() => handleSelectItem(item)}
            className={cn(
              "p-2 rounded-xl border bg-card cursor-pointer",
              "flex flex-col justify-between gap-1",
              "hover:shadow-sm transition",
            )}
          >
            {/* Name */}
            <p className="text-sm font-medium line-clamp-2">{item.name}</p>

            {/* Dietary Badge */}
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded-md font-medium w-fit",
                getDietaryColor(item.dietary_type),
              )}
            >
              {formatDietary(item.dietary_type)}
            </span>

            {/* Meta Row */}
            <div className="flex justify-between items-center text-[11px] text-muted-foreground">
              <div className="flex gap-2">
                {totalVariants > 0 && <span>{totalVariants} Var</span>}
                {item.add_ons.length > 0 && (
                  <span>{item.add_ons.length} Add</span>
                )}
              </div>

              <span className="text-sm font-semibold font-mono text-green-600">
                ₹ {item.base_price}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemSection;
