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
          "Guides, industry playbooks, research and product updates from Sharpnr. Written for the people who run businesses and the people who build software for them.",
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
            Keep learning,
            <br />
            <span className="text-twilight">keep building.</span>
          </>
        }
        copy="Read the documentation, look at how the platform works, or set your organization up and try it. Whichever you pick, we're glad you're here."
        primary={{ label: "Create Free Account", href: config.authAppUrl + "/signup" }}
        secondary={{ label: "Explore Platform", to: "/platform" }}
        trust="Early Access is free • Learn at your own pace • Grow when you're ready"
      />
    </div>
  );
}
