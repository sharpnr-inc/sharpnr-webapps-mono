import RfqsPage from "@/marketplace/pages/RfqsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/rfqs/")({
  component: RfqsPage,
});
