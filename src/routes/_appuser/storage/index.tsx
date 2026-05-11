import { SiloIndexPage } from "@/app/silo/pages/SiloIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/storage/")({
  component: SiloIndexPage,
});
