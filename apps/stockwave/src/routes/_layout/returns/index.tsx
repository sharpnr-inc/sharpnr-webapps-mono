import ReturnsIndexPage from "@/app/returns/pages/ReturnsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/returns/")({
  component: ReturnsIndexPage,
});
