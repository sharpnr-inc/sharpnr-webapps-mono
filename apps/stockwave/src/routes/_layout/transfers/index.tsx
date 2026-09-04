import TransfersIndexPage from "@/app/transfers/pages/TransfersIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/transfers/")({
  component: TransfersIndexPage,
});
