import { AppsPage } from "@/app/pages/AppsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/apps")({
  component: AppsPage,
});
