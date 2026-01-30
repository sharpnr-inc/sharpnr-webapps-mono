import { RestaurantRootLayout } from "@/_hospitalityapp/Restaurant/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/restaurant",
)({
  component: RestaurantRootLayout,
  staticData: {
    breadcrumb: "Restaurant",
  },
});
