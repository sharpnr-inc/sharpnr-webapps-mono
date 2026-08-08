import { RestaurantRootLayout } from "@/restaurant_workspace/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_modules/restaurant/$restaurantID",
)({
  component: RestaurantRootLayout,
  staticData: {
    breadcrumb: "Restaurant",
  },
});
