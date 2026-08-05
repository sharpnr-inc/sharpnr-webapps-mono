import { cn } from "@/lib/utils";
import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";

/**
 * Horizontal scrollable pill-tabs for menu categories.
 * Selecting a category resets the subcategory filter and re-derives items.
 * Clicking the active category again deselects it (shows all for current menu).
 */
export function CategoryTabs() {
  const filteredCategories = useSalePosTerminalMenuStore(
    (s) => s.filteredCategories,
  );
  const selectedCategoryId = useSalePosTerminalMenuStore(
    (s) => s.selectedCategoryId,
  );
  const selectCategory = useSalePosTerminalMenuStore((s) => s.selectCategory);

  if (!filteredCategories.length) return null;

  const handleSelect = (id: string) => {
    // Toggle: click active tab → deselect (show all)
    selectCategory(selectedCategoryId === id ? null : id);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {/* "All" pill */}
      <button
        onClick={() => selectCategory(null)}
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150",
          "border",
          selectedCategoryId === null
            ? "bg-foreground text-background border-foreground"
            : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground",
        )}
      >
        All
      </button>

      {filteredCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.id)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 whitespace-nowrap",
            "border",
            selectedCategoryId === cat.id
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground",
          )}
        >
          {cat.category_name}
        </button>
      ))}
    </div>
  );
}
