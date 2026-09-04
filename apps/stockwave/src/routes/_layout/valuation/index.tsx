import ValuationIndexPage from "@/app/valuation/pages/ValuationIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/valuation/")({
  component: ValuationIndexPage,
});
