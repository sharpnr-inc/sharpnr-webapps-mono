import { InfraPage } from "@/app/infra/InfraPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/infra")({
  component: InfraPage,
});
