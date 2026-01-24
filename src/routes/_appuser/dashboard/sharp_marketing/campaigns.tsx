import UpcomingFeature from "@/sharedPages/UpcomingFeature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_marketing/campaigns"
)({
  component: UpcomingFeature,
});
