import RestaurantPage from "@/components/RoutesPages/sharpHospitality/HotelRestaurantPage";
import { createFileRoute } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/_layout/sharp_hospitality/restaurent"
)({
  component: RestaurantPage,

  context: () => ({
    heading: "Restaurant",
    subheading: "Manage Restaurant Here",
    HeaderIcon:UtensilsCrossed
  }),
});
