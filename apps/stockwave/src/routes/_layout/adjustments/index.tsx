import AdjustmentsIndexPage from "@/app/adjustments/pages/AdjustmentsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/adjustments/")({
  component: AdjustmentsIndexPage,
});
