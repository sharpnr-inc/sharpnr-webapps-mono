import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/business-ops/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId/",
)({
  component: RouteComponent,
  staticData: {
    breadcrumb: `Hotel Details`,
  },
});

function RouteComponent() {
  return <div>HI </div>;
}
