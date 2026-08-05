import RoomBookingPage from "@/hotel_workspace/pages/booking/RoomBookingMainPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$propertyID/hotel/$hotelID/booking/",
)({
  component: RoomBookingPage,
});
