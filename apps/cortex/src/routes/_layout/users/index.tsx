import UsersIndexPage from "@/app/users/pages/UsersIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/users/")({
  component: UsersIndexPage,
});
