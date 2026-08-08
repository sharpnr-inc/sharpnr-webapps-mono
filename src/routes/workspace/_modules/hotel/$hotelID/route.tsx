import { HotelRootLayout } from "@/hotel_workspace/components/HotelRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_modules/hotel/$hotelID")({
  component: HotelRootLayout,
});
