import RestaurantInventoryPage from "@/restaurant_workspace/pages/RestaurantInventoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$propertyID/restaurant/$restaurantID/inventory/",
)({
  component: RestaurantInventoryPage,
});
