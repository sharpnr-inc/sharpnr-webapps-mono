import ExplorerIndexPage from "@/app/explorer/pages/ExplorerIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/explorer/")({
  component: ExplorerIndexPage,
});
