import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/inventory-acc",
)({
  component: Outlet,
});
