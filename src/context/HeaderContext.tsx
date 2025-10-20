// src/context/HeaderContext.tsx
import { createContext, useContext, type ReactNode } from "react";
import { useMatches } from "@tanstack/react-router";

// Define the type your route contexts will return
interface HeaderRouteContext {
  heading?: string;
  subheading?: string;
}

interface HeaderContextType {
  heading: string;
  subheading: string;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("useHeader must be used within HeaderProvider");
  return context;
};

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];

  // Type assertion to tell TS about context structure
  const ctx = lastMatch?.context as HeaderRouteContext | undefined;

  const heading = ctx?.heading ?? "Dashboard";
  const subheading = ctx?.subheading ?? "";

  return (
    <HeaderContext.Provider value={{ heading, subheading }}>
      {children}
    </HeaderContext.Provider>
  );
};
