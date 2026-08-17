import RestaurantReservationPage from "@/restaurant_workspace/pages/RestaurantReservationPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_modules/restaurant/$restaurantID/reservations/",
)({
  component: RestaurantReservationPage,
});
