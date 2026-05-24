import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/sharp_marketplace")({
  component: Outlet,
});
