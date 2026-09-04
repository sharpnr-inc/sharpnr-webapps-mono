import LakesIndexPage from "@/app/lakes/pages/LakesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/lakes/")({
  component: LakesIndexPage,
});
