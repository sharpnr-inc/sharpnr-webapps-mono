import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/")({
  component: () => (
    <Navigate to="/channels/$channelId" params={{ channelId: "ch_general" }} />
  ),
});
