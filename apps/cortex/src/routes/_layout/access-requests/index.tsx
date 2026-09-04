import AccessRequestsIndexPage from "@/app/access-requests/pages/AccessRequestsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/access-requests/")({
  component: AccessRequestsIndexPage,
});
