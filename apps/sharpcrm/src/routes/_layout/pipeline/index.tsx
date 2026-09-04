import PipelineIndexPage from "@/app/pipeline/pages/PipelineIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/pipeline/")({
  component: PipelineIndexPage,
});
