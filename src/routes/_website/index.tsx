import { SharpHospitalityWebsite } from "@/website/LandingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_website/")({
  component: SharpHospitalityWebsite,
});
