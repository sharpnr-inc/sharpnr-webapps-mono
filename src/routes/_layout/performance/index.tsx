import { PerformancePage } from "@/app/pages/Performance/PerformancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/performance/")({
  component: PerformancePage,
});
