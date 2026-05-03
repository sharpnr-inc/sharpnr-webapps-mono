import { HotelSelector } from "@/app/hotel/components/HotelSelector";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/hotel/")({
  component: HotelSelector,
});
