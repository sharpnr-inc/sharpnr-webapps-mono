import { create } from "zustand";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export interface AppUser {
  id: string;
  email: string;
  name: string;
  organizationID: string;
}

interface AppUserState {
  user: AppUser | null;
  isLoading: boolean;

  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;

  clearUser: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                    Store                                   */
/* -------------------------------------------------------------------------- */

export const useAppUserStore = create<AppUserState>((set) => ({
  user: null,
  isLoading: true,

  setLoading: (isLoading) => set({ isLoading }),

  setUser: (user) => set({ user }),

  clearUser: () =>
    set({
      user: null,
      isLoading: false,
    }),
}));

/* -------------------------------------------------------------------------- */
/*                           AppUserStore Selectors                           */
/* -------------------------------------------------------------------------- */

export const selectUser = (state: AppUserState) => state.user;

export const selectIsAuthenticated = (state: AppUserState) => !!state.user;

export const selectIsLoadingUser = (state: AppUserState) => state.isLoading;

export const selectOrganizationID = (state: AppUserState) =>
  state.user?.organizationID;

/* -------------------------------------------------------------------------- */
/*                            AppUserStore Actions                            */
/* -------------------------------------------------------------------------- */

export const appUserActions = {
  setUser: (user: AppUser | null) => useAppUserStore.getState().setUser(user),

  setLoading: (loading: boolean) =>
    useAppUserStore.getState().setLoading(loading),

  clearUser: () => useAppUserStore.getState().clearUser(),
};
