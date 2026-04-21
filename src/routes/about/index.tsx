import { SharpIAMAboutPage } from "@/marketing/AppAboutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: SharpIAMAboutPage,
});
