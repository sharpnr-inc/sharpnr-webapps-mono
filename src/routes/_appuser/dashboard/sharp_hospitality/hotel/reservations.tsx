import HotelRoomMgmSection from "@/_hospitalityapp/Hotel/sections/HotelRoomMgmSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/hotel/reservations"
)({
  component: HotelRoomMgmSection,
});
