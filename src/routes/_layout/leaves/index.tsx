import { LeavesPage } from "@/app/pages/Leaves/LeavesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/leaves/")({
  component: LeavesPage,
});
