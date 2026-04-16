import RestaurantReservationPage from "@/app/restaurant/pages/RestaurantReservationPage";
import { useRestaurantStore } from "@/app/restaurant/store/restaurant.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant/_layout/reservations/")(
  {
    loader: () => {
      const restaurantID = useRestaurantStore.getState().selectedRestaurantID;

      // If no restaurant selected → redirect
      if (!restaurantID) {
        throw redirect({
          to: "/restaurant",
        });
      }

      return null;
    },
    component: RestaurantReservationPage,
  },
);
