import {
  createContext,
  useContext,
} from "react";

export interface RestaurantSettings {
  
}

interface RestaurantSettingsContextType {
 
}

export const RestaurantSettingsContext = createContext<
  RestaurantSettingsContextType | undefined
>(undefined);

export const useRestaurantSettings = () => {
  const context = useContext(RestaurantSettingsContext);
  if (!context) {
    throw new Error(
      "useRestaurantSettings must be used within RestaurantSettingsProvider",
    );
  }
  return context;
};
