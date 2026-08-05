import { RestaurantRootLayout } from "@/app/restaurant/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_user/restaurant/$restaurantID")({
  component: RestaurantRootLayout,
  staticData: {
    breadcrumb: "Restaurant",
  },
});
