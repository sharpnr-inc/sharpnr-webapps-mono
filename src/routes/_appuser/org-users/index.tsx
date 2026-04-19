import { UserDirectoryPage } from "@/app/UserDirectoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/org-users/")({
  component: UserDirectoryPage,
});
