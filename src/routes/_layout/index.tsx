import SharpMarketingWelcomePage from "@/app/SharpMarketingWelcomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: SharpMarketingWelcomePage,
});
