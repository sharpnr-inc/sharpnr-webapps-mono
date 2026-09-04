import CdnIndexPage from "@/app/cdn/pages/CdnIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/cdn/")({
  component: CdnIndexPage,
});
