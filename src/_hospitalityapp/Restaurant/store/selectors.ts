import { useRestaurantStore } from "./restaurant.store";

export const useSelectedRestaurant = () =>
  useRestaurantStore((s) => s.selectedRestaurant);

export const useSelectedRestaurantID = () =>
  useRestaurantStore((s) => s.selectedRestaurantID);

export const useSetRestaurant = () =>
  useRestaurantStore((s) => s.setRestaurant);

export const useClearRestaurant = () =>
  useRestaurantStore((s) => s.clearRestaurant);
