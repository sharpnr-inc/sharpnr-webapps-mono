import PostgresIndexPage from "@/app/postgres/pages/PostgresIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/postgres/")({
  component: PostgresIndexPage,
});
