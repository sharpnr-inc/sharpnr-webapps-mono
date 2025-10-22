import RestaurantPage from "@/components/UiModuels/sharpHospitality/HotelRestaurantPage";
import { createFileRoute } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/_layout/sharphotel/restaurent"
)({
  component: RestaurantPage,
  context: () => ({
    heading: "Restaurant Settings",
    subheading: "Manage Restaurant Here",
    HeaderIcon:UtensilsCrossed
  }),
});
