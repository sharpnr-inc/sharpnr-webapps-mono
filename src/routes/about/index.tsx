import SharpHRWelcomePage from "@/app/components/SharpHRWelcomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: SharpHRWelcomePage,
});
