import { DocsLayout } from "@/docs/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});
