import StockwaveIndexPage from "@/app/stockwave/pages/StockwaveIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/stockwave/")({
  component: StockwaveIndexPage,
});
