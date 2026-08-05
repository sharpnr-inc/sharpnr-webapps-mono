import HotelRoomRequestPage from "@/app/hotel/pages/room_requests/HotelRoomRequestPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_user/hotel/$hotelID/room_requests/")({
  component: HotelRoomRequestPage,
});
