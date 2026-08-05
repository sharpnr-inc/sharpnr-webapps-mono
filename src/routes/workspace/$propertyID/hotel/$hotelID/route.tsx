import { HotelRootLayout } from "@/hotel_workspace/components/HotelRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$propertyID/hotel/$hotelID")({
  component: HotelRootLayout,
});
