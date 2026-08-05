import HotelCheckoutPage from "@/hotel_workspace/pages/checkouts/HotelCheckoutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_user/hotel/$hotelID/checkouts/",
)({
  component: HotelCheckoutPage,
});
