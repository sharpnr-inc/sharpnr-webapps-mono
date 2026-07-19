import { createFileRoute } from "@tanstack/react-router";
import { PlatformHeroSection } from "@/app/platform/hero/PlatformHeroSection";
import { DifferentSection } from "@/app/platform/different/DifferentSection";
import { AdaptSection } from "@/app/platform/adapt/AdaptSection";
import { FoundationSection } from "@/app/platform/foundation/FoundationSection";
import { TogetherSection } from "@/app/platform/together/TogetherSection";
import { IntelligenceSection } from "@/app/platform/intelligence/IntelligenceSection";
import { NetworkSection } from "@/app/platform/network/NetworkSection";
import { ConvergenceSection } from "@/app/platform/convergence/ConvergenceSection";

export const Route = createFileRoute("/platform")({
  component: PlatformPage,
  head: () => ({
    meta: [
      { title: "How Sharpnr Works | Connected Business Infrastructure" },
      {
        name: "description",
        content:
          "See how the Sharpnr platform works: one connected foundation for finance, people, customers, identity and governance, with collaboration, intelligence and a business network built in.",
      },
      {
        property: "og:title",
        content: "How Sharpnr Works | Connected Business Infrastructure",
      },
      {
        property: "og:description",
        content:
          "One platform where every business event stays connected — operations, foundation, collaboration, intelligence and the business network, working as one.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/platform" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/platform" }],
  }),
});

/**
 * Platform page — the homepage introduces Sharpnr; this page explains
 * how it all works, ending with everything coming together.
 */
function PlatformPage() {
  return (
    <div>
      <PlatformHeroSection />
      <DifferentSection />
      <AdaptSection />
      <FoundationSection />
      <TogetherSection />
      <IntelligenceSection />
      <NetworkSection />
      <ConvergenceSection />
    </div>
  );
}
