import SegmentsIndexPage from "@/app/segments/pages/SegmentsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/segments/")({
  component: SegmentsIndexPage,
});
