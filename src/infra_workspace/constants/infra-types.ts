import {
  ChefHat,
  ConciergeBell,
  CarFront,
  BedDouble,
  WashingMachine,
  PartyPopper,
  Wine,
  Package,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { FileRouteTypes } from "@/routeTree.gen";

/** Section headings used to break the selector grid into scannable groups. */
export const INFRA_GROUPS = [
  { id: "FRONT_OF_HOUSE", label: "Front of house" },
  { id: "BACK_OF_HOUSE", label: "Back of house" },
  { id: "SUPPORT", label: "Support" },
] as const;

export type InfraGroup = (typeof INFRA_GROUPS)[number]["id"];

export const INFRA_TYPES = [
  {
    id: "KITCHEN",
    label: "Kitchen",
    description: "Food prep, stations, and KOT routing",
    icon: ChefHat,
    group: "BACK_OF_HOUSE",
    to: "/workspace/infra/kitchen",
  },
  {
    id: "RECEPTION",
    label: "Reception",
    description: "Front desk, check-in, and guest requests",
    icon: ConciergeBell,
    group: "FRONT_OF_HOUSE",
  },
  {
    id: "VALET_PARKING",
    label: "Valet Parking",
    description: "Vehicle handover, keys, and slots",
    icon: CarFront,
    group: "FRONT_OF_HOUSE",
  },
  {
    id: "BAR",
    label: "Bar",
    description: "Beverage service and liquor stock",
    icon: Wine,
    group: "FRONT_OF_HOUSE",
  },
  {
    id: "BANQUET",
    label: "Banquet Hall",
    description: "Events, seating layouts, and bookings",
    icon: PartyPopper,
    group: "FRONT_OF_HOUSE",
  },
  {
    id: "HOUSEKEEPING",
    label: "Housekeeping",
    description: "Room status, cleaning, and turndown",
    icon: BedDouble,
    group: "BACK_OF_HOUSE",
  },
  {
    id: "LAUNDRY",
    label: "Laundry",
    description: "Guest and in-house linen cycles",
    icon: WashingMachine,
    group: "BACK_OF_HOUSE",
  },
  {
    id: "STORE",
    label: "Store",
    description: "Inventory, indents, and stock movement",
    icon: Package,
    group: "SUPPORT",
  },
  {
    id: "MAINTENANCE",
    label: "Maintenance",
    description: "Work orders and asset upkeep",
    icon: Wrench,
    group: "SUPPORT",
  },
] as const satisfies readonly {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  group: InfraGroup;
  /** Route to open when this area is picked. Absent = not built yet. */
  to?: FileRouteTypes["to"];
}[];

export type InfraType = (typeof INFRA_TYPES)[number]["id"];
