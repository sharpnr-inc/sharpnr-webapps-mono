import { createFileRoute } from "@tanstack/react-router";
import { ResourcesHeroSection } from "@/app/resources/hero/ResourcesHeroSection";
import { IntentsSection } from "@/app/resources/intents/IntentsSection";
import { LibrarySection } from "@/app/resources/library/LibrarySection";
import { SeriesSection } from "@/app/resources/series/SeriesSection";
import { UpdatesSection } from "@/app/resources/updates/UpdatesSection";
import { StayConnectedSection } from "@/app/resources/connect/StayConnectedSection";
import { PageCta } from "@/app/shared/PageCta";
import { config } from "@/configs/env";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
  head: () => ({
    meta: [
      { title: "Sharpnr Resources | The Knowledge Center" },
      {
        name: "description",
        content:
          "Practical guides, industry playbooks, research, product updates and engineering stories from Sharpnr — a knowledge library for businesses, builders and decision makers.",
      },
      {
        property: "og:title",
        content: "Sharpnr Resources | The Knowledge Center",
      },
      {
        property: "og:description",
        content:
          "Learn something useful. Build something better. Knowledge should be shared, not hidden.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/resources" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/resources" }],
  }),
});

/**
 * Resources page — the knowledge center of the ecosystem. Educate
 * first, promote second; honest about what exists today.
 */
function ResourcesPage() {
  return (
    <div>
      <ResourcesHeroSection />
      <IntentsSection />
      <LibrarySection />
      <SeriesSection />
      <UpdatesSection />
      <StayConnectedSection />
      <PageCta
        eyebrow="What's next"
        heading={
          <>
            Keep learning.
            <br />
            Keep building.
          </>
        }
        copy="Explore the platform, read the documentation or create your organization and experience connected business for yourself. However you continue, we're glad you're here."
        primary={{ label: "Create Free Account", href: config.authAppUrl + "/signup" }}
        secondary={{ label: "Explore Platform", to: "/platform" }}
        trust="Early Access is free • Learn at your own pace • Grow when you're ready"
      />
    </div>
  );
}
