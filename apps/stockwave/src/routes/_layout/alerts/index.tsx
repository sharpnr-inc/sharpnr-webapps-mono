import AlertsIndexPage from "@/app/alerts/pages/AlertsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/alerts/")({
  component: AlertsIndexPage,
});
