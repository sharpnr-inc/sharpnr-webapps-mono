import { BarRootLayout } from "@/app/bar/components/BarRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_user/bar/$barID")({
  component: BarRootLayout,
});
