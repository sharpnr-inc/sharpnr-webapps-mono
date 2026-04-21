import SharpHRWelcomePage from "@/app/pages/SharpHRWelcomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: SharpHRWelcomePage,
});
