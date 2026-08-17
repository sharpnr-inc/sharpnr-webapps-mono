import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/infras/hospitality/kitchen",
)({
  component: Outlet,
});
