import { RestaurantRootLayout } from "@/restaurant_workspace/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$propertyID/restaurant/$restaurantID",
)({
  component: RestaurantRootLayout,
  staticData: {
    breadcrumb: "Restaurant",
  },
});
