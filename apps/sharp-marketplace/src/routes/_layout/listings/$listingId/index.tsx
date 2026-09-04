import ListingDetailPage from "@/marketplace/pages/ListingDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/listings/$listingId/")({
  component: ListingDetailPage,
});
