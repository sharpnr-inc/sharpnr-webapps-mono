import RestaurantInventoryPage from "@/app/restaurant/pages/RestaurantInventoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant/_layout/inventory/")({
  component: RestaurantInventoryPage,
});
