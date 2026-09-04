import PipelinesIndexPage from "@/app/pipelines/pages/PipelinesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/pipelines/")({
  component: PipelinesIndexPage,
});
