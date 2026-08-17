import { createContext, useContext } from "react";

interface SaleTerminalMenuSectionContextValue {
  restaurantID: string;
}

export const SaleTerminalMenuSectionContext =
  createContext<SaleTerminalMenuSectionContextValue>({
    restaurantID: "",
  });

export function useSaleTerminalMenuContext() {
  const ctx = useContext(SaleTerminalMenuSectionContext);
  if (!ctx.restaurantID) {
    throw new Error(
      "useSaleTerminalMenuContext must be used inside <SaleTerminalMenu />",
    );
  }
  return ctx;
}
