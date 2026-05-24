import type { NavSection } from "./launcher.types";
import {
  Hotel,
  UtensilsCrossed,
  Beer,
  Music2,
  ChefHat,
  Warehouse,
} from "lucide-react";

/* =========================================================
   DEFAULT LAUNCHER SECTIONS
========================================================= */

export const DEFAULT_SECTIONS: NavSection[] = [
  {
    id: "hospitality_apps",
    title: "Hospitality",
    items: [
      {
        id: "hotel",
        label: "Hotel",
        icon: Hotel,
        to: "/hotel",
      },
      {
        id: "restaurant",
        label: "Restaurant",
        icon: UtensilsCrossed,
        to: "/restaurant",
      },
      {
        id: "bar",
        label: "Bar",
        icon: Beer,
        to: "/bar",
      },
      {
        id: "nightclub",
        label: "NightClub",
        icon: Music2,
        to: "/nc",
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
        icon: ChefHat,
        to: "/infra/kitchen",
      },
      {
        id: "loading_dock",
        label: "Loading Dock",
        icon: Warehouse,
        to: "/infra/loading_dock",
      },
    ],
  },
];
