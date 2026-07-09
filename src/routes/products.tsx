import { ProductsHeroSection } from "@/app/products/ProductsHeroSection";
import { ProductsGridSection } from "@/app/products/ProductsGridSection";
import { ProductsSpotlightSection } from "@/app/products/ProductsSpotlightSection";
import { ProductsConnectSection } from "@/app/products/ProductsConnectSection";
import { CTASection } from "@/app/index/cta/CTASection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Sharpnr | Products — The Complete Suite" },
      {
        name: "description",
        content:
          "Explore every Sharpnr application — Sharp-Accounting, Sharp-HR, Sharp-Marketing, Cables, Silo, Folio, Cortex, SharpIAM, Orchestrator, Sharp-Hospitality, Lifco, and Sharp-Marketplace.",
      },
      {
        name: "keywords",
        content:
          "Sharpnr products, accounting software, HRMS, CRM, business messaging, data platform, productivity suite, IT administration, B2B marketplace",
      },
      {
        property: "og:title",
        content: "Sharpnr | Products — The Complete Suite",
      },
      {
        property: "og:description",
        content:
          "Twelve connected applications across operations, control, core services, and the B2B network. Each one powerful alone — better together.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/products" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/products" }],
  }),
});

function RouteComponent() {
  return (
    <div>
      <ProductsHeroSection />
      <ProductsGridSection />
      <ProductsSpotlightSection />
      <ProductsConnectSection />
      <CTASection />
    </div>
  );
}
