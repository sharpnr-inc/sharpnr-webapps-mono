import BackupsIndexPage from "@/app/backups/pages/BackupsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/backups/")({
  component: BackupsIndexPage,
});
