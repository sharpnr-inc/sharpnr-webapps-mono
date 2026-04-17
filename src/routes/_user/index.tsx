import { ModuleSelectorPage } from "@/app/shared/ModuleSelectorPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/")({
  component: ModuleSelectorPage,
});
