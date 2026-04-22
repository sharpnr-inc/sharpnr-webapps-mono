import { Website } from "@/app/Website";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Website,
});
