import BrowsePage from "@/marketplace/pages/BrowsePage";
import { createFileRoute } from "@tanstack/react-router";

type BrowseSearch = {
  /** Set by the header's Saved link: the same grid, pre-filtered. */
  saved?: boolean;
};

export const Route = createFileRoute("/_layout/browse/")({
  validateSearch: (search: Record<string, unknown>): BrowseSearch => ({
    saved: search.saved === true || search.saved === "true" ? true : undefined,
  }),
  component: BrowsePage,
});
