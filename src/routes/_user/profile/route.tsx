import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/profile")({
  component: Outlet,
});
