import { RestaurantSideBarWrapper } from "@/_hospitalityapp/Restaurant/components/RestuarantSideBarWrapper";
import { createFileRoute } from "@tanstack/react-router";
import { InboxIcon } from "lucide-react";

export const Route = createFileRoute("/_appuser/dashboard/sharp_hospitality/restaurant")(
  {
    component: RestaurantSideBarWrapper,
    context: () => ({
      heading: "Restaurant Terminal",
      subheading: "Manage Collective Org inventory operations",
      HeaderIcon: InboxIcon,
    }),
  }
);
