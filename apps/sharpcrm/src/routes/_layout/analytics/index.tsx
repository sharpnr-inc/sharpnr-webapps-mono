import AnalyticsIndexPage from "@/app/analytics/pages/AnalyticsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/analytics/")({
  component: AnalyticsIndexPage,
});
