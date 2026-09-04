import ForecastIndexPage from "@/app/forecast/pages/ForecastIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/forecast/")({
  component: ForecastIndexPage,
});
