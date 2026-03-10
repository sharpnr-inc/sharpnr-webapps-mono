import { createContext, useContext } from "react";

interface TaxCodesContext {}

export const TaxCodesContext = createContext<TaxCodesContext | null>(null);

export const useTaxCodesCompCtx = () => {
  const ctx = useContext(TaxCodesContext);
  if (!ctx) throw new Error("Must inside the <MenuSection>");
  return ctx;
};
