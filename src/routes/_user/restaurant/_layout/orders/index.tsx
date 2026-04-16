import RestaurantOrdersPage from "@/app/restaurant/pages/RestaurantOrdersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant/_layout/orders/")({
  component: RestaurantOrdersPage,
  staticData: {
    breadcrumb: "Orders",
  },
});
