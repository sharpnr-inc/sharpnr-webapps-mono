import GroupsDetailsPage from "@/app/authorization/user_groups/pages/GroupsDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/authorization/user_groups/$groupID/",
)({
  component: GroupsDetailsPage,
});
