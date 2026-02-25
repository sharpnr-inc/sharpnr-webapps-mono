import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/hotel/booking/create-booking/$roomId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const {} = Route.useParams();
  return <div></div>;
}
