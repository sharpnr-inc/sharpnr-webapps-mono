import type React from "react";
import { TaxCodesContext } from "./TaxCodeContex";

interface TaxCodesRootProps {
  children: React.ReactNode;
  className?: string;
}

export function TaxCodeRoot({ children }: TaxCodesRootProps) {
  return (
    <TaxCodesContext.Provider value={{}}>{children}</TaxCodesContext.Provider>
  );
}
