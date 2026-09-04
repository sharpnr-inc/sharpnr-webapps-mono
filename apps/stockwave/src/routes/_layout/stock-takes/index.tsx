import StockTakesIndexPage from "@/app/stock-takes/pages/StockTakesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/stock-takes/")({
  component: StockTakesIndexPage,
});
