import { create } from "zustand";

/** Turn a human role name into a url/identifier-safe slug. */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

interface AddRoleState {
  name: string;
  /** Identifier; auto-derived from the name until the user edits it directly. */
  slug: string;
  slugTouched: boolean;
  description: string;
  /** Ids of the starter policies attached to the new role. */
  policies: string[];

  setName: (name: string) => void;
  setSlug: (slug: string) => void;
  setDescription: (description: string) => void;
  togglePolicy: (id: string) => void;
  reset: () => void;
}

const INITIAL = {
  name: "",
  slug: "",
  slugTouched: false,
  description: "",
  policies: [] as string[],
};

export const useAddRoleStore = create<AddRoleState>((set) => ({
  ...INITIAL,

  setName: (name) =>
    set((state) => ({
      name,
      // Keep the slug in sync with the name until it's been edited by hand.
      slug: state.slugTouched ? state.slug : slugify(name),
    })),

  setSlug: (slug) => set({ slug: slugify(slug), slugTouched: true }),

  setDescription: (description) => set({ description }),

  togglePolicy: (id) =>
    set((state) => ({
      policies: state.policies.includes(id)
        ? state.policies.filter((p) => p !== id)
        : [...state.policies, id],
    })),

  reset: () => set({ ...INITIAL }),
}));
