import DatabasesIndexPage from "@/app/databases/pages/DatabasesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/databases/")({
  component: DatabasesIndexPage,
});
