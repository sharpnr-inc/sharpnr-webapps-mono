import { AppsPage } from "@/app/sharpnr_apps/pages/AppsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/my-apps/")({
  component: AppsPage,
});
