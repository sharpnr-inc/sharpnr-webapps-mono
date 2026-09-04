import ResourcesIndexPage from "@/app/resources/pages/ResourcesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/resources/")({
  component: ResourcesIndexPage,
});
