import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/storage")({
  component: Outlet,
});
