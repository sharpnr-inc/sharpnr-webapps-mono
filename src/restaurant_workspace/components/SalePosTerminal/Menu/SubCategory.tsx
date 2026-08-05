import { cn } from "@/lib/utils";
import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";

/**
 * Secondary horizontal pill-tabs for subcategories.
 * Only visible when a category is selected (or there are subcategories to show).
 * Clicking the active tab again deselects it.
 */
export function SubCategoryTabs() {
  const filteredSubCategories = useSalePosTerminalMenuStore(
    (s) => s.filteredSubCategories,
  );
  const selectedSubCategoryId = useSalePosTerminalMenuStore(
    (s) => s.selectedSubCategoryId,
  );
  const selectedCategoryId = useSalePosTerminalMenuStore(
    (s) => s.selectedCategoryId,
  );
  const selectSubCategory = useSalePosTerminalMenuStore(
    (s) => s.selectSubCategory,
  );

  // Only render when a category is selected and it has subcategories
  if (!selectedCategoryId || filteredSubCategories.length === 0) return null;

  // No point showing tabs if there is only one subcategory
  if (filteredSubCategories.length === 1) return null;

  const handleSelect = (id: string) => {
    selectSubCategory(selectedSubCategoryId === id ? null : id);
  };

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {filteredSubCategories.map((sub) => (
        <button
          key={sub.id}
          onClick={() => handleSelect(sub.id)}
          className={cn(
            "shrink-0 rounded-md px-3 py-1 text-xs font-medium transition-all duration-150 whitespace-nowrap",
            "border",
            selectedSubCategoryId === sub.id
              ? "bg-muted-foreground/15 text-foreground border-muted-foreground/30"
              : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground",
          )}
        >
          {sub.sub_cat_name}
        </button>
      ))}
    </div>
  );
}
