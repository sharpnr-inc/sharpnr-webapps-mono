import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId/",
)({
  component: RouteComponent,
  staticData: {
    breadcrumb: `Hotel Details`,
  },
});

function RouteComponent() {
  return <div>HI </div>;
}
