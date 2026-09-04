import DevicesIndexPage from "@/app/devices/pages/DevicesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/devices/")({
  component: DevicesIndexPage,
});
