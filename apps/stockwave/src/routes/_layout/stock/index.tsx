import StockIndexPage from "@/app/stock/pages/StockIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/stock/")({
  component: StockIndexPage,
});
