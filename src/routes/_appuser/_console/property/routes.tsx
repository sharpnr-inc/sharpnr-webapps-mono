import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/property/routes",
)({
  component: Outlet,
});
