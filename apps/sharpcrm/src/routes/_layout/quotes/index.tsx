import QuotesIndexPage from "@/app/quotes/pages/QuotesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/quotes/")({
  component: QuotesIndexPage,
});
