import { create } from "zustand";

interface AppUserType {
  ID: string;
  Name: string;
  OrganizationID: string;
}

interface AppUserStore {
  appUser: AppUserType | null;

  // actions
  setAppUser: (user: AppUserType) => void;
  clearAppUser: () => void;
}

export const useAppUserStore = create<AppUserStore>((set) => ({
  appUser: null,

  setAppUser: (user) =>
    set(() => ({
      appUser: user,
    })),

  clearAppUser: () =>
    set(() => ({
      appUser: null,
    })),
}));
