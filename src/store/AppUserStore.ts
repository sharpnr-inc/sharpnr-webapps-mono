import type { UserDataResponseDto } from "@/apis/types";
import { create } from "zustand";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

interface AppUserState {
  user: UserDataResponseDto | null;
  isLoading: boolean;

  setUser: (user: UserDataResponseDto | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                    Store                                   */
/* -------------------------------------------------------------------------- */

export const useAppUserStore = create<AppUserState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  setLoading: (isLoading) => set({ isLoading }),

  clearUser: () =>
    set({
      user: null,
      isLoading: false,
    }),
}));

/* -------------------------------------------------------------------------- */
/*                                   Selectors                                */
/* -------------------------------------------------------------------------- */

export const selectUser = (state: AppUserState) => state.user;

export const selectIsAuthenticated = (state: AppUserState) => !!state.user;

export const selectIsLoadingUser = (state: AppUserState) => state.isLoading;

export const selectUserRole = (state: AppUserState) => state.user?.role;

/* -------------------------------------------------------------------------- */
/*                                   Actions                                  */
/* -------------------------------------------------------------------------- */

export const appUserActions = {
  setUser: (user: UserDataResponseDto | null) =>
    useAppUserStore.getState().setUser(user),

  setLoading: (loading: boolean) =>
    useAppUserStore.getState().setLoading(loading),

  clearUser: () => useAppUserStore.getState().clearUser(),
};
