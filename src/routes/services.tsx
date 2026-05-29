import { ServicePage } from "@/app/services/ServicePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: ServicePage,
});
