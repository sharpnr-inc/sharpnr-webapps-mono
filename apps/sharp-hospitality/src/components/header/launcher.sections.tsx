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
 * Items carry a `to` (internal route), which the launcher hands back through
 * `onNavigate` -- unlike the default sections, which link out via `href`.
 *
 * NOTE: `/workspace/nc` and `/workspace/infra/loading_dock` have no route in
 * routeTree.gen.ts yet, so those two tiles still navigate nowhere.
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
        to: "/workspace/hotel",
      },
      {
        id: "restaurant",
        label: "Restaurant",
        description: "Menus, tables & orders",
        icon: UtensilsCrossed,
        to: "/workspace/restaurant",
      },
      {
        id: "bar",
        label: "Bar",
        description: "Drinks & tabs",
        icon: Beer,
        to: "/workspace/bar",
      },
      {
        id: "nightclub",
        label: "NightClub",
        description: "Events & entry",
        icon: Music2,
        to: "/workspace/nc",
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
        to: "/workspace/infra/kitchen",
      },
      {
        id: "loading_dock",
        label: "Loading Dock",
        description: "Deliveries & stock in",
        icon: Warehouse,
        to: "/workspace/infra/loading_dock",
      },
    ],
  },
];
