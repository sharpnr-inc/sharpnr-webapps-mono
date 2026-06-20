import HotelConfigIndexPage from "@/business_operation/hospitality/hotel/pages/HotelConfigIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/business_op_modules/hospitality/hotel/$hotelID/",
)({
  component: HotelConfigIndexPage,
});
