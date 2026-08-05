import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";
import { MenuGroupSelector } from "./MenuGroupSelector";

/**
 * Top toolbar row: menu group selector on the left, live item count on the right.
 * Drop this above CategoryTabs in your layout.
 */
export function MenuHeader() {
  const filteredItems = useSalePosTerminalMenuStore((s) => s.filteredItems);
  const menus = useSalePosTerminalMenuStore((s) => s.menus);

  if (!menus.length) return null;

  return (
    <div className="flex items-center justify-between gap-4">
      <MenuGroupSelector />
      <span className="text-xs text-muted-foreground tabular-nums shrink-0">
        {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
      </span>
    </div>
  );
}
