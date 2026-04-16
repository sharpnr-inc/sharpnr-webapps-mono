import { SharpIAMAboutPage } from "@/app/pages/AppAboutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: SharpIAMAboutPage,
});
