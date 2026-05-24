import { SharpMarketplaceIndexPage } from "@/app/sharp_marketplace/pages/SharpMarketplaceIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/sharp_marketplace/")({
  component: SharpMarketplaceIndexPage,
});
