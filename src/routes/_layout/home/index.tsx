import HRAppHomePage from "@/app/home/pages/HRAppHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/home/")({
  component: HRAppHomePage,
});
