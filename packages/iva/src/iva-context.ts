import { createContext, useContext } from "react";
import type { IvaContextValue } from "./iva.types";

export const IvaContext = createContext<IvaContextValue | null>(null);

/**
 * Access the Iva widget from anywhere inside <IvaProvider>. Lets an app open
 * the panel from its own UI, e.g. a "Ask Iva" item in the header.
 */
export function useIva(): IvaContextValue {
  const ctx = useContext(IvaContext);
  if (!ctx) {
    throw new Error("useIva must be used inside <IvaProvider>");
  }
  return ctx;
}
