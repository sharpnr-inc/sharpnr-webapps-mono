import { create } from "zustand";

export type Restaurant = {
  ID: string;
  Name: string;
  OrgID: string;
  IsActive: boolean;
  IsConfigured: boolean;
  Property?: {
    ID: string;
    Name: string;
    AddressLine: string;
    City: string;
    State: string;
    Country: string;
  };
};

type RestaurantStore = {
  selectedRestaurant: Restaurant | null;
  selectedRestaurantID: string | null;

  setRestaurant: (restaurant: Restaurant) => void;
  clearRestaurant: () => void;
};

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  selectedRestaurant: null,
  selectedRestaurantID: null,

  setRestaurant: (restaurant) =>
    set({
      selectedRestaurant: restaurant,
      selectedRestaurantID: restaurant.ID,
    }),

  clearRestaurant: () =>
    set({
      selectedRestaurant: null,
      selectedRestaurantID: null,
    }),
}));
