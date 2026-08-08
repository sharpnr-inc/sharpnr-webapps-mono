import RestaurantSaleTerminalPage from "@/restaurant_workspace/pages/RestaurantSaleTerminalPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_modules/restaurant/$restaurantID/sales-terminal/",
)({
  component: RestaurantSaleTerminalPage,
});
