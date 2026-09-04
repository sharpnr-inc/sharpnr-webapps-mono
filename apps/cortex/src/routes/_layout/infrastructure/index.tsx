import InfrastructureIndexPage from "@/app/infrastructure/pages/InfrastructureIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/infrastructure/")({
  component: InfrastructureIndexPage,
});
