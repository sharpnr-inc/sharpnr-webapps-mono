import ModuleSelectorPage from "@/components/ModuleSelectorPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/")({
  component: ModuleSelectorPage,
});
