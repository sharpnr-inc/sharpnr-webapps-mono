import { create } from "zustand";

type CityStore = {
  stateCode?: string;
  setStateCode: (stateCode: string) => void;
};

export const useCityStore = create<CityStore>((set) => ({
  stateCode: undefined,

  setStateCode: (stateCode) =>
    set({
      stateCode,
    }),
}));
