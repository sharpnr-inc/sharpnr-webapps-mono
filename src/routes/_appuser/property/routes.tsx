import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/property/routes")({
  component: Outlet,
  staticData: {
    breadcrumb: "Property",
  },
});
