import { PerformancePage } from "@/app/Performance/PerformancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/performance/")({
  component: PerformancePage,
});
