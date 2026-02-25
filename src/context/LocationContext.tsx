import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type LocationState = {
  latitude?: number;
  longitude?: number;
  accuracyM?: number;
};

type LocationContextValue = {
  location: LocationState | null;
  setLocation: (loc: LocationState | null) => void;
};

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined
);

export function useLocationContext() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocationContext must be used within LocationProvider");
  }
  return ctx;
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
