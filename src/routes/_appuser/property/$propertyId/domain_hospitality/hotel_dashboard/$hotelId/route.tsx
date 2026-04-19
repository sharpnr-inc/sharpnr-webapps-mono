import HotelOrchestDashboardLayout from "@/_orchestrator/properties/hospitality_dashboards/components/HotelOrchestDashboardLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId",
)({
  component: HotelOrchestDashboardLayout,
  staticData: {
    breadcrumb: "Test",
  },
});
