import { DietaryType } from "@/lib/create_menu";

export const DietaryBadgeColor = {
  [DietaryType.VEG]: "bg-green-600 ",
  [DietaryType.NON_VEG]: "bg-red-600",
  [DietaryType.VEGAN]: "bg-emerald-500",
  [DietaryType.EGG]: "bg-yellow-500",
};
