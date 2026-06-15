import { AppsPage } from "@/app/pages/AppsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/my-apps/")({
  component: AppsPage,
});
