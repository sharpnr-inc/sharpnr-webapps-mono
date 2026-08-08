import InfraTypeSelector from "@/infra_workspace/components/InfraTypeSelector";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_modules/infra/")({
  component: InfraTypeSelector,
});
