import { BarSideBarWrapper } from "@/_hospitalityapp/Bar/components/BarSideBarWrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/dashboard/sharp_hospitality/bar")({
  component: BarSideBarWrapper,
});
