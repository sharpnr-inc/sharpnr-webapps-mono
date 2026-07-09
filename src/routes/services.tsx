import { ServicesHeroSection } from "@/app/services/ServicesHeroSection";
import { ServicesSolutionsSection } from "@/app/services/ServicesSolutionsSection";
import { ServicesJourneySection } from "@/app/services/ServicesJourneySection";
import { ServicesCoreSection } from "@/app/services/ServicesCoreSection";
import { CTASection } from "@/app/index/cta/CTASection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Sharpnr | Services — Industry Solutions" },
      {
        name: "description",
        content:
          "Industry-specific solutions on the Sharpnr platform — Sharp-Hospitality for hotels and restaurants, Lifco for healthcare, with retail and manufacturing on the way.",
      },
      {
        name: "keywords",
        content:
          "hospitality management software, hotel management, restaurant POS, healthcare management, hospital software, retail operations, industry solutions",
      },
      {
        property: "og:title",
        content: "Sharpnr | Services — Industry Solutions",
      },
      {
        property: "og:description",
        content:
          "Every industry runs differently. Sharpnr ships operation apps that understand yours — connected to the same enterprise-grade core.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/services" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/services" }],
  }),
});

function RouteComponent() {
  return (
    <div>
      <ServicesHeroSection />
      <ServicesSolutionsSection />
      <ServicesJourneySection />
      <ServicesCoreSection />
      <CTASection />
    </div>
  );
}
