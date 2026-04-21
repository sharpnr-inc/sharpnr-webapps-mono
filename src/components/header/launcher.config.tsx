import type { NavSection } from "./launcher.types";
import {
  Hotel,
  UtensilsCrossed,
  Beer,
  Music2,
  ChefHat,
  Warehouse,
  Book,
} from "lucide-react";

/* =========================================================
   DEFAULT LAUNCHER SECTIONS
========================================================= */

export const DEFAULT_SECTIONS: NavSection[] = [
  {
    id: "Apps",
    title: "Infra",
    items: [
      {
        id: "kitchen",
        label: "Hospitality",
        icon: ChefHat,
        to: "/infra/kitchen",
      },
      {
        id: "loading_dock",
        label: "Accounting",
        icon: Book,
        to: "/infra/loading_dock",
      },
      {
        id: "loading_dock",
        label: "HR",
        icon: Warehouse,
        to: "/infra/loading_dock",
      },
    ],
  },
];
