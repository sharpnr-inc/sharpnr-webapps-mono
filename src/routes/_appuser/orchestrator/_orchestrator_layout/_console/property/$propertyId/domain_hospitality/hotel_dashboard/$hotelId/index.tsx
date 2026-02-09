import HotelDashboardIndexPage from "@/_orchestrator/hospitality_dashboards/hotel/HotelDashboardIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId/",
)({
  beforeLoad: ({ params }) => {
    // const { hotelId, propertyId } = params;
  },
  component: RouteComponent,
  staticData:{
    breadcrumb:`Hotel Details`
  }
});

function RouteComponent() {
  const { hotelId, propertyId } = Route.useParams();
  return <HotelDashboardIndexPage hotelID={hotelId} propertyID={propertyId} />;
}
