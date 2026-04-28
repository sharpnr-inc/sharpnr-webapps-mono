import { create } from "zustand";

type StateStore = {
  countryCode: string | undefined;

  setCountryCode: (countrycode: string) => void;
  getCountryCode: () => string | undefined;
};

export const useStateStore = create<StateStore>((set, get) => ({
  countryCode: undefined,

  setCountryCode: (countryCode) =>
    set(() => ({
      countryCode,
    })),

  getCountryCode: () => get().countryCode,
}));
