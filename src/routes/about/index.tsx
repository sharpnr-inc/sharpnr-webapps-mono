import { SharpIAMAboutPage } from "@/website/AppAboutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: SharpIAMAboutPage,
});
