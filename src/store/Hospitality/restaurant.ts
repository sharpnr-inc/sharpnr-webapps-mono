import { create } from "zustand";

const useRestaurantGlobalState = create((set) => ({
  restaurant: null,
  
}));
