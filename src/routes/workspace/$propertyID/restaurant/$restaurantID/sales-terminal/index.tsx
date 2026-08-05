import RestaurantSaleTerminalPage from "@/restaurant_workspace/pages/RestaurantSaleTerminalPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$propertyID/restaurant/$restaurantID/sales-terminal/",
)({
  component: RestaurantSaleTerminalPage,
});
