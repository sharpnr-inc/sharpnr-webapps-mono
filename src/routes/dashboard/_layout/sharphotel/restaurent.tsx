import SharpnrHotelRestaurantSection from "@/ui_modules/Hotel/SharpnrHotelRestaurantSection";
import { createFileRoute } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/_layout/sharphotel/restaurent"
)({
  component: SharpnrHotelRestaurantSection,
  context: () => ({
    heading: "Restaurant Settings",
    subheading: "Manage Restaurant Here",
    HeaderIcon:UtensilsCrossed
  }),
});
