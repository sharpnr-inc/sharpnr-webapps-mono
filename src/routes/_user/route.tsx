import IamRootLayout from "@/components/IamRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
  component: IamRootLayout,
});
