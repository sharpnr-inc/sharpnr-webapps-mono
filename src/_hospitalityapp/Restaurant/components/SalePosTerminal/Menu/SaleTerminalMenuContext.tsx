import { createContext, useContext } from "react";

interface SaleTerminalMenuContext {
  restaurantID: string; // This is the ID of MenuOwner or Restaurant
}

export const SaleTerminalMenuSectionContext =
  createContext<SaleTerminalMenuContext | null>(null);

export const useSaleTerminalMenuCtx = () => {
  const ctx = useContext(SaleTerminalMenuSectionContext);
  if (!ctx) throw new Error("Must inside the <MenuSection>");
  return ctx;
};
