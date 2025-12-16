import AddBookingForm from "@/_hospitalityapp/pages/hotel/RoomPages/AddBookingForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/(dashboard)/sharp_hospitality/hotel/booking/$roomId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddBookingForm />;
}
