import RestaurantReservationPage from "@/_hospitalityapp/Restaurant/pages/RestaurantReservationPage";
import { useRestaurantStore } from "@/_hospitalityapp/Restaurant/store/restaurant.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_user/restaurant/_layout/reservations/",
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
  component: RestaurantReservationPage,
});
