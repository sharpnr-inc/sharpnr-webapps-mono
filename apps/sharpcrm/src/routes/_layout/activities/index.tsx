import ActivitiesIndexPage from "@/app/activities/pages/ActivitiesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/activities/")({
  component: ActivitiesIndexPage,
});
