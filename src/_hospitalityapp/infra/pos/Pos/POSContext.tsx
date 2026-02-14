import { createContext, useContext } from "react";

interface POSContextType {
  // Define the types for your POS context here
}

export const POSContext = createContext<POSContextType | null>(null);

export const usePOSCtx = () => {
  const ctx = useContext(POSContext);
  if (!ctx) throw new Error("Must be inside the <POSProvider>");
  return ctx;
};

