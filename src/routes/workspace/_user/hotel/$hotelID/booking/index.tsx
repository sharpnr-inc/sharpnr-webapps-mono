import RoomBookingPage from "@/app/hotel/pages/booking/RoomBookingMainPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_user/hotel/$hotelID/booking/")({
  component: RoomBookingPage,
});
