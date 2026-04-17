import SharpHRRootLayout from "@/app/components/SharpHRRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: SharpHRRootLayout,
  staticData: {
    breadcrumb: "Sharp HR",
  },
});
