import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId",
)({
  component: Outlet,
  staticData: {
    breadcrumb: "Test",
  },
});
