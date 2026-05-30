import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../../website/landingpage";

export const Route = createFileRoute("/_website/")({
  component: LandingPage,
});
