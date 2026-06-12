import { AboutHeroSection } from "@/app/about/AboutHeroSection";
import { AboutStorySection } from "@/app/about/AboutStorySection";
import { CTASection } from "@/app/index/cta/CTASection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Sharpnr | About — The Operating System for Business" },
      {
        name: "description",
        content:
          "Why Sharpnr exists, the problem it solves, and where it's going — an ever-evolving ecosystem unifying business operations and connecting organizations to each other.",
      },
      {
        name: "keywords",
        content:
          "about Sharpnr, business operating system, unified business platform, company mission, business ecosystem, early access",
      },
      {
        property: "og:title",
        content: "Sharpnr | About — The Operating System for Business",
      },
      {
        property: "og:description",
        content:
          "Not another tool. A living, ever-evolving ecosystem where every part of an organization — and every organization — connects.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function RouteComponent() {
  return (
    <div>
      <AboutHeroSection />
      <AboutStorySection />
      <CTASection />
    </div>
  );
}
