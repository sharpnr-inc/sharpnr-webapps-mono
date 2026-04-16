// src/context/HeaderContext.tsx
import { createContext, useContext, type ReactNode } from "react";
import { useMatches } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Home } from "lucide-react"; // default icon

// Each route can optionally define these in its context
interface HeaderRouteContext {
  heading?: string;
  subheading?: string;
  HeaderIcon?: LucideIcon;
}

// What our Header context provides
interface HeaderContextType {
  heading: string;
  subheading: string;
  HeaderIcon: LucideIcon;
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

  // Safely extract the route context
  const ctx = lastMatch?.context as HeaderRouteContext | undefined;

  const heading = ctx?.heading ?? "Dashboard";
  const subheading = ctx?.subheading ?? "";
  const HeaderIcon = ctx?.HeaderIcon ?? Home;

  return (
    <HeaderContext.Provider value={{ heading, subheading, HeaderIcon }}>
      {children}
    </HeaderContext.Provider>
  );
};
