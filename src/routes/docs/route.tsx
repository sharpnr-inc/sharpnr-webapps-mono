import { DocsLayout } from "@/components/Docslayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});
