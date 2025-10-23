import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

interface SpinnerContextType {
  isLoading: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }
  return context;
};

interface SpinnerProviderProps {
  children: ReactNode;
}

export const SpinnerProvider: React.FC<SpinnerProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => setIsLoading(true);
  const hideSpinner = () => setIsLoading(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, hideSpinner, showSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};
