import ActivityIndexPage from "@/app/activity/pages/ActivityIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/activity/")({
  component: ActivityIndexPage,
});
