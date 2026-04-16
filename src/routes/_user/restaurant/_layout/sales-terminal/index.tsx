import RestaurantSaleTerminalPage from "@/app/restaurant/pages/RestaurantSaleTerminalPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_user/restaurant/_layout/sales-terminal/",
)({
  component: RestaurantSaleTerminalPage,
});
