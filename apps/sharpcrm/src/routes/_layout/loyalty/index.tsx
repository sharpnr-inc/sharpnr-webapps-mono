import LoyaltyIndexPage from "@/app/loyalty/pages/LoyaltyIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/loyalty/")({
  component: LoyaltyIndexPage,
});
