import RestaurantOverviewPage from "@/app/restaurant/pages/RestaurantOverviewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_user/restaurant/$restaurantID/overview/",
)({
  component: RestaurantOverviewPage,

  staticData: {
    breadcrumb: "Overview",
  },
});
