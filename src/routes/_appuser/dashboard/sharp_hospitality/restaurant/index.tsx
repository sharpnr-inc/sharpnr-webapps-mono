import { createFileRoute } from '@tanstack/react-router'
import RestaurantOverviewPage from '@/_hospitalityapp/Restaurant/pages/RestaurantOverviewPage';

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/',
)({
  component: RestaurantOverviewPage,
})


