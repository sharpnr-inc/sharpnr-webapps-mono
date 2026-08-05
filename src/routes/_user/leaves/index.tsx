import LeavesPage from "@/app/leaves/pages/LeavesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/leaves/")({
  component: LeavesPage,
});
