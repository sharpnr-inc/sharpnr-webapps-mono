import { createFileRoute } from "@tanstack/react-router";
import { AboutHeroSection } from "@/app/about/hero/AboutHeroSection";
import { WorldSection } from "@/app/about/world/WorldSection";
import { PrinciplesSection } from "@/app/about/principles/PrinciplesSection";
import { FutureVisionSection } from "@/app/about/future/FutureVisionSection";
import { JoinSection } from "@/app/about/join/JoinSection";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Sharpnr | Why We Exist" },
      {
        name: "description",
        content:
          "Sharpnr exists because business software stopped talking to itself. The belief behind the platform, the principles we build to, and where we are taking it next.",
      },
      { property: "og:title", content: "About Sharpnr | Why We Exist" },
      {
        property: "og:description",
        content:
          "Software should work together as naturally as the people using it. That is the whole reason Sharpnr exists.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/about" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/about" }],
  }),
});

/**
 * About page — a story about why Sharpnr exists, not a company
 * profile. Philosophy before company.
 */
function AboutPage() {
  return (
    <div>
      <AboutHeroSection />
      <WorldSection />
      <PrinciplesSection />
      <FutureVisionSection />
      <JoinSection />
    </div>
  );
}
