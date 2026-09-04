import JourneysIndexPage from "@/app/journeys/pages/JourneysIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/journeys/")({
  component: JourneysIndexPage,
});
