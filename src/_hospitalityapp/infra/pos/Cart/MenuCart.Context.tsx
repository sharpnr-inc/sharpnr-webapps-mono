import { createContext, useContext } from "react";

interface MenuCartContextType {}

const MenuCartContext = createContext<MenuCartContextType | null>(null);

export const useMenuCartCtx = () => {
  const ctx = useContext(MenuCartContext);
  if (!ctx) throw new Error("Must used with in the <MenuCart>");
  return ctx;
};


export default MenuCartContext