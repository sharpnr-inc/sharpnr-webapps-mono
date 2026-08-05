import AdminRequestPage from "@/app/requests/pages/AdminRequestPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/myrequest/")({
  component: AdminRequestPage,
});
