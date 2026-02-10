
import { createContext, useContext } from "react";
import type { MenuOutput } from "../createMenu/types";

interface MenuContextType {
  MenuData:MenuOutput[] | undefined;
}

export const MenuContext = createContext<MenuContextType | null>(null);

export const useMenuCtx = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("Must be inside the <Menu>");
  return ctx;
};
