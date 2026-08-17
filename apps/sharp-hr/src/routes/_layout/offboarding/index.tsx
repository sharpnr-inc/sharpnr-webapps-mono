import OffboardingPage from "@/app/offboarding/pages/OffboardingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/offboarding/")({
  component: OffboardingPage,
});
