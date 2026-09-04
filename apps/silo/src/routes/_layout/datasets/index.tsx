import DatasetsIndexPage from "@/app/datasets/pages/DatasetsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/datasets/")({
  component: DatasetsIndexPage,
});
