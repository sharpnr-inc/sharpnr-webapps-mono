import { BarRootLayout } from "@/_hospitalityapp/Bar/components/BarRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/dashboard/sharp_hospitality/bar")({
  component: BarRootLayout,
  staticData:{
    breadcrumb:"Bar"
  }
});
