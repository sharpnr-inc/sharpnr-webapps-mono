import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "../../website/LandingPage.tsx";

export const Route = createFileRoute("/_website/")({
  component: LandingPage,
});
