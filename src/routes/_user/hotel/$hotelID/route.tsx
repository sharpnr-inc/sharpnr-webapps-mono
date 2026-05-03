import { HotelRootLayout } from "@/app/hotel/components/HotelRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/hotel/$hotelID")({
  component: HotelRootLayout,
});
