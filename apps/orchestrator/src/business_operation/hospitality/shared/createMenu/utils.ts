import { DietaryType } from "@/lib/create_menu";

export const DietaryColorMap = {
  [DietaryType.VEGETARIAN]: "bg-green-600",
  [DietaryType.NON_VEGETARIAN]: "bg-red-600",
  [DietaryType.VEGAN]: "bg-emerald-500",
  [DietaryType.EGG]: "bg-yellow-500",
  [DietaryType.JAIN]: "bg-lime-500",
  [DietaryType.GLUTEN_FREE]: "bg-blue-500",
} as const;