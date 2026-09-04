import AssetsIndexPage from "@/app/assets/pages/AssetsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/assets/")({
  component: AssetsIndexPage,
});
