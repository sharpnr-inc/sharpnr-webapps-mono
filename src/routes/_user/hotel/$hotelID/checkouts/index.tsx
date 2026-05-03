import HotelCheckoutPage from "@/app/hotel/pages/checkouts/HotelCheckoutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/hotel/$hotelID/checkouts/")({
  component: HotelCheckoutPage,
});
