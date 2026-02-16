import { createContext, useContext } from "react";

interface MenuSectionContext {
  MenuOwnersID: string;
}

export const MenuSectionContext = createContext<MenuSectionContext | null>(null);

export const useMenuSectionCtx = () => {
  const ctx = useContext(MenuSectionContext);
  if (!ctx) throw new Error("Must inside the <MenuSection>");
  return ctx;
};
