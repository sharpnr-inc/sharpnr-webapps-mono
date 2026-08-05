import RestaurantOverviewPage from "@/restaurant_workspace/pages/RestaurantOverviewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_user/restaurant/$restaurantID/overview/",
)({
  component: RestaurantOverviewPage,

  staticData: {
    breadcrumb: "Overview",
  },
});
