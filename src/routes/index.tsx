import { LandingPage } from "@/app/general/LandingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  preload: true,
  component: LandingPage,
});
