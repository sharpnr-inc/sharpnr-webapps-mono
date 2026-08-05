import { TrainingPage } from "@/app/Training/TrainingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/training/")({
  component: TrainingPage,
});
