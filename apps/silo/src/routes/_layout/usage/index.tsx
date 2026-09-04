import UsageIndexPage from "@/app/usage/pages/UsageIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/usage/")({
  component: UsageIndexPage,
});
