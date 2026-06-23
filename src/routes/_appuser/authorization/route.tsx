import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/authorization")({
  component: Outlet,
});
