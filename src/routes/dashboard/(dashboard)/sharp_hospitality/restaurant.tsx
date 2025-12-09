
import { createFileRoute } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";
import RestaurantMainLayout from "@/_hospitalityapp/pages/restuarant/RestaurantMainLayout";


export const Route = createFileRoute(
  "/dashboard/(dashboard)/sharp_hospitality/restaurant"
)({
  component: RestaurantMainLayout,

  context: () => ({
    heading: "Restaurant",
    subheading: "Manage Restaurant Here",
    HeaderIcon:UtensilsCrossed
  }),
});
