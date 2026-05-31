// src/routes/docs/getting-started.tsx
import { createFileRoute } from "@tanstack/react-router";
import GettingStarted from "../../docs/gettingstarted/getting-started.mdx";

export const Route = createFileRoute("/docs/getting-started")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GettingStarted />;
}
