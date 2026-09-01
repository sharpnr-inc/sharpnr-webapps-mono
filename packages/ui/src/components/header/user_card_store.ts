import { create } from "zustand";

interface UserCardState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeUserCard: () => void;
  openUserCard: () => void;
}

export const useUserCardStore = create<UserCardState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  closeUserCard: () => set({ isOpen: false }),
  openUserCard: () => set({ isOpen: true }),
}));
