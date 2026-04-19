import { UserDirectoryPage } from "@/app/userDirectory/UserDirectoryPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/org-users/")({
  component: UserDirectoryPage,
});
