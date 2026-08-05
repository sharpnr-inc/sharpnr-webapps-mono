import { LeavesPage } from "@/app/Leaves/LeavesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/leaves/")({
  component: LeavesPage,
});
