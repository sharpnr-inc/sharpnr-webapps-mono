import SellingPage from "@/marketplace/pages/SellingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/selling/")({
  component: SellingPage,
});
