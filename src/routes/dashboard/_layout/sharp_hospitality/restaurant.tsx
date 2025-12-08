
import { createFileRoute } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";
import RestaurantPageLayout from "@/components/RoutesPages/sharpHospitality/RestaurantLayout";


export const Route = createFileRoute(
  "/dashboard/_layout/sharp_hospitality/restaurant"
)({
  component: RestaurantPageLayout,

  context: () => ({
    heading: "Restaurant",
    subheading: "Manage Restaurant Here",
    HeaderIcon:UtensilsCrossed
  }),
});
