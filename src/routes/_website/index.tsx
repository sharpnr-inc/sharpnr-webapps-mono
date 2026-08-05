import { SharpHospitalityWebsite } from "@/app/shared/AboutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_website/")({
  component: SharpHospitalityWebsite,
});
