import { TaskPage } from "@/app/tasks/pages/TaskPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/tasks/")({
  component: TaskPage,
});
