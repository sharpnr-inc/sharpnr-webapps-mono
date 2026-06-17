import { LandingPage } from "@/website/LandingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/")({
  preload: true,
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Orchestrator | Command Centre — Sharpnr" },
      {
        name: "description",
        content:
          "Orchestrator is the Command Centre for managing your Sharpnr services, apps, and organization from a single platform.",
      },
      {
        name: "keywords",
        content:
          "Orchestrator, Sharpnr, Command Centre, Platform Administration, Business Management",
      },
      {
        property: "og:title",
        content: "Orchestrator | Command Centre — Sharpnr",
      },
      {
        property: "og:description",
        content:
          "The administrative layer of the Sharpnr Platform. Control everything from one place.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://orchestrator.sharpnr.com" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
