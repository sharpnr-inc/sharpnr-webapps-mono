import SharpMarktRootLayout from "@/app/SharpMarktRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: SharpMarktRootLayout,
  staticData: {
    breadcrumb: "Sharp Marketing",
  },
});
