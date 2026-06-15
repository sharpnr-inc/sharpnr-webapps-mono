import { TaskPage } from "@/app/pages/TaskPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/tasks/")({
  component: TaskPage,
});
