import RestaurantOverviewPage from "@/_hospitalityapp/Restaurant/pages/RestaurantOverviewPage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useRestaurantStore } from "@/_hospitalityapp/Restaurant/store/restaurant.store";

export const Route = createFileRoute(
  "/_user/restaurant/_layout/overview/",
)({
  loader: () => {
    const restaurantID = useRestaurantStore.getState().selectedRestaurantID;

    // If no restaurant selected → redirect
    if (!restaurantID) {
      throw redirect({
        to: "/dashboard/sharp_hospitality/restaurant",
      });
    }

    return null;
  },

  component: RestaurantOverviewPage,

  staticData: {
    breadcrumb: "Overview",
  },
});
