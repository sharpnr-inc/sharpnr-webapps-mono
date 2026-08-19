import type { LauncherSection } from "@sharpnr/ui";
import {
  Hotel,
  UtensilsCrossed,
  Beer,
  Music2,
  ChefHat,
  Warehouse,
} from "lucide-react";

/**
 * Hospitality's launcher lists this app's own workspaces rather than the
 * Sharpnr suite, so it overrides the shared default via the `sections` prop.
 * `description` and `accent` are required by the shared LauncherItem shape.
 */
export const HOSPITALITY_SECTIONS: LauncherSection[] = [
  {
    id: "hospitality_apps",
    title: "Hospitality",
    items: [
      {
        id: "hotel",
        label: "Hotel",
        description: "Rooms, bookings & guests",
        icon: Hotel,
        to: "/hotel",
        accent: "#f59e0b",
      },
      {
        id: "restaurant",
        label: "Restaurant",
        description: "Menus, tables & orders",
        icon: UtensilsCrossed,
        to: "/restaurant",
        accent: "#ef4444",
      },
      {
        id: "bar",
        label: "Bar",
        description: "Drinks & tabs",
        icon: Beer,
        to: "/bar",
        accent: "#8b5cf6",
      },
      {
        id: "nightclub",
        label: "NightClub",
        description: "Events & entry",
        icon: Music2,
        to: "/nc",
        accent: "#ec4899",
      },
    ],
  },
  {
    id: "infra",
    title: "Infra",
    items: [
      {
        id: "kitchen",
        label: "Kitchen",
        description: "Prep & ticket flow",
        icon: ChefHat,
        to: "/infra/kitchen",
        accent: "#f97316",
      },
      {
        id: "loading_dock",
        label: "Loading Dock",
        description: "Deliveries & stock in",
        icon: Warehouse,
        to: "/infra/loading_dock",
        accent: "#22d3ee",
      },
    ],
  },
];
