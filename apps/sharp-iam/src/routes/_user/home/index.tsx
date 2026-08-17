import { IamHomePage } from "@/app/home/pages/IamHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/home/")({
  component: IamHomePage,
});
