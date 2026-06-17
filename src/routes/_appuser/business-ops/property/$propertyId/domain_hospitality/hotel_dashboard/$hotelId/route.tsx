import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/business-ops/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId",
)({
  component: Outlet,
  staticData: {
    breadcrumb: "Test",
  },
});
