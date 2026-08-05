import RestaurantInventoryPage from "@/app/restaurant/pages/RestaurantInventoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_user/restaurant/$restaurantID/inventory/")({
  component: RestaurantInventoryPage,
});
