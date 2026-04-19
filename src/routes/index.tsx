import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  preload: true,
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Orchestraor Page</div>;
}
