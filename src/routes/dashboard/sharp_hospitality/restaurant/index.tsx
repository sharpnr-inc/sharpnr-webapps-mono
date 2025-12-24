import { createFileRoute } from '@tanstack/react-router'
import { UtensilsCrossed } from 'lucide-react';
import RestaurantMainPage from '@/_hospitalityapp/Restaurant/pages/RestaurantMainPage';

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/restaurant/',
)({
  component: RestaurantMainPage,
   context: () => ({
    heading: "Restaurant",
    subheading: "Manage Restaurant Here",
    HeaderIcon:UtensilsCrossed
  }),
})


