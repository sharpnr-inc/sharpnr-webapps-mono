import { createFileRoute } from "@tanstack/react-router";
import Introduction from "../../docs/introduction.mdx";

export const Route = createFileRoute("/docs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Introduction />;
}
