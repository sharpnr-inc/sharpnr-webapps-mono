import RestaurantInventoryPage from "@/restaurant_workspace/pages/RestaurantInventoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_user/restaurant/$restaurantID/inventory/",
)({
  component: RestaurantInventoryPage,
});
