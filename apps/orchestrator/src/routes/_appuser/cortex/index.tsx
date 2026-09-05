import CotrexServiceIndexPage from "@/app/cortex/pages/CotrexServiceIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/cortex/")({
  component: CotrexServiceIndexPage,
});
