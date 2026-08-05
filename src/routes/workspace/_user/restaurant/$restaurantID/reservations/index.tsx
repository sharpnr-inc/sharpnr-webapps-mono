import RestaurantReservationPage from "@/app/restaurant/pages/RestaurantReservationPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_user/restaurant/$restaurantID/reservations/",
)({
  component: RestaurantReservationPage,
});
