import { createFileRoute } from '@tanstack/react-router'
import RestaurantPage from "@/components/RoutesPages/sharpHospitality/HotelRestaurantPage";
import { UtensilsCrossed } from 'lucide-react';

export const Route = createFileRoute(
  '/dashboard/_layout/sharp_hospitality/restaurant/',
)({
  component: RestaurantPage,
   context: () => ({
    heading: "Restaurant",
    subheading: "Manage Restaurant Here",
    HeaderIcon:UtensilsCrossed
  }),
})


