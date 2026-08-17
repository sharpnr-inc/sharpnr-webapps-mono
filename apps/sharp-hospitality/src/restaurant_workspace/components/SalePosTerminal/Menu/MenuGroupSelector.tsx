import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";

/**
 * Dropdown that lets the operator switch between menu groups (e.g. Lunch Menu,
 * Dinner Menu) or view "All" items across every group.
 */
export function MenuGroupSelector() {
  const menus = useSalePosTerminalMenuStore((s) => s.menus);
  const selectedMenuId = useSalePosTerminalMenuStore((s) => s.selectedMenuId);
  const selectMenu = useSalePosTerminalMenuStore((s) => s.selectMenu);

  if (!menus.length) return null;

  // Single menu group → no need to show the selector
  if (menus.length === 1) return null;

  return (
    <Select value={selectedMenuId} onValueChange={selectMenu}>
      <SelectTrigger className="w-50 h-9 text-sm font-medium border-border/60 bg-background shadow-none focus:ring-1 focus:ring-ring">
        <SelectValue placeholder="Select menu…" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all" className="font-medium">
          All Menus
        </SelectItem>

        {menus.map((menu) => (
          <SelectItem key={menu.id} value={menu.id}>
            {menu.menu_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
