import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/resources/hospitality/house_menu",
)({
  component: Outlet,
});
