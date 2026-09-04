import ReceivingIndexPage from "@/app/receiving/pages/ReceivingIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/receiving/")({
  component: ReceivingIndexPage,
});
