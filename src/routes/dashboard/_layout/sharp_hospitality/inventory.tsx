import InventoryPage from "@/components/RoutesPages/sharpHospitality/InventoryPage";
import { createFileRoute } from "@tanstack/react-router";
import { InboxIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/_layout/sharp_hospitality/inventory")(
  {
    component: InventoryPage,
    context: () => ({
      heading: "Inventory",
      subheading: "Manage Collective Org inventory operations",
      HeaderIcon: InboxIcon,
    }),
  }
);
