import { HotelSelector } from "@/hotel_workspace/components/HotelSelector";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$propertyID/hotel/")({
  component: HotelSelector,
});
