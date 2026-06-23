import UserGroupIndexPage from "@/app/authorization/user_groups/pages/UserGroupIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/user_groups/")({
  component: UserGroupIndexPage,
});
