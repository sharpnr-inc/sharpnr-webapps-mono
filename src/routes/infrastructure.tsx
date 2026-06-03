import { IndustriesIndexPage } from "@/app/industries/Index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/infrastructure")({
  component: IndustriesIndexPage,
});
