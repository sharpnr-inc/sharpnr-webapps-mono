import BucketsIndexPage from "@/app/buckets/pages/BucketsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/buckets/")({
  component: BucketsIndexPage,
});
