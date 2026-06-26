import UserPolicyDetailsPage from "@/app/authorization/users/pages/UserPolicyDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/authorization/users/$userID/details",
)({
  component: UserPolicyDetailsPage,
});
