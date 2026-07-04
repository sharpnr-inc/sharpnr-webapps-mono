import LandingPage from "@/website/LandingPage";
import { createFileRoute } from "@tanstack/react-router";

// this is the landing page for the website before loading this we
// check the if user is there in the session and is authicated then we directly throm them into the
// home page
export const Route = createFileRoute("/_website/")({
  component: LandingPage,
});
