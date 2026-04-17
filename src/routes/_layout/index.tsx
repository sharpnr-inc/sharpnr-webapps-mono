import SharpHRWelcomePage from "@/app/components/SharpHRWelcomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: SharpHRWelcomePage,
  staticData: {
    breadcrumb: "Overview",
  },
});
