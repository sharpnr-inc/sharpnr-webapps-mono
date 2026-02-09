import type { MenuInterface } from "@/lib/create_menu";
import { createContext, useContext } from "react";

interface MenuContextType {
  dummyMenuData:MenuInterface;
}

export const MenuContext = createContext<MenuContextType | null>(null);

export const useMenuCtx = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("Must be inside the <Menu>");
  return ctx;
};
