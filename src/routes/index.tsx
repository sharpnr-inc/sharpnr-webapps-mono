import { Website } from "@/app/index/Website";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Website,
});
