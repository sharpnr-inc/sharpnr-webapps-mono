import UsersIndexPage from "@/app/authorization/users/pages/UsersIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization/users/")({
  component: UsersIndexPage,
});
