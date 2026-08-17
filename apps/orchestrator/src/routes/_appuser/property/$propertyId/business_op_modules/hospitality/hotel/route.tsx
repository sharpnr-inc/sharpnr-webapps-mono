import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/business_op_modules/hospitality/hotel",
)({
  component: Outlet,
});
