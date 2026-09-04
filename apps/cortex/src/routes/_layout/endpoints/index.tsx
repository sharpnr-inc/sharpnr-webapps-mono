import EndpointsIndexPage from "@/app/endpoints/pages/EndpointsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/endpoints/")({
  component: EndpointsIndexPage,
});
