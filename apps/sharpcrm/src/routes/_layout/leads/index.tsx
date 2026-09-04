import LeadsIndexPage from "@/app/leads/pages/LeadsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/leads/")({
  component: LeadsIndexPage,
});
