import RestaurantOrdersPage from "@/restaurant_workspace/pages/RestaurantOrdersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$propertyID/restaurant/$restaurantID/orders/",
)({
  component: RestaurantOrdersPage,
  staticData: {
    breadcrumb: "Orders",
  },
});
