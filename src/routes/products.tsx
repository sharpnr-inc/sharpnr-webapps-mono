import { createFileRoute } from "@tanstack/react-router";
import { ProductsHeroSection } from "@/app/products/hero/ProductsHeroSection";
import { OperationsSection } from "@/app/products/operations/OperationsSection";
import { FoundationShowcaseSection } from "@/app/products/foundation/FoundationShowcaseSection";
import { CollabSection } from "@/app/products/collab/CollabSection";
import { IntelligenceProductsSection } from "@/app/products/intelligence/IntelligenceProductsSection";
import { MarketplaceSection } from "@/app/products/marketplace/MarketplaceSection";
import { EcosystemEffectSection } from "@/app/products/effect/EcosystemEffectSection";
import { PageCta } from "@/app/shared/PageCta";
import { config } from "@/configs/env";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Sharpnr Products | One Connected Ecosystem" },
      {
        name: "description",
        content:
          "Explore every Sharpnr product: Sharp Operations, Sharp Accounting, Sharp HRMS, Sharp CRMS, Sharp IAM, Cortex, Cables, Folio, Tasks, Silo, IVA and Sharp Marketplace — independent products, one connected platform.",
      },
      {
        property: "og:title",
        content: "Sharpnr Products | One Connected Ecosystem",
      },
      {
        property: "og:description",
        content:
          "Products built for every part of your business — each one complete on its own, all of them stronger together.",
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

/**
 * Products page — every product in the ecosystem, introduced clearly
 * and honestly, ending with the ecosystem effect.
 */
function ProductsPage() {
  return (
    <div>
      <ProductsHeroSection />
      <OperationsSection />
      <FoundationShowcaseSection />
      <CollabSection />
      <IntelligenceProductsSection />
      <MarketplaceSection />
      <EcosystemEffectSection />
      <PageCta
        eyebrow="Start anywhere"
        heading={
          <>
            Start with one product.
            <br />
            Grow into a connected business.
          </>
        }
        copy="Whether you're running a single café, a hotel group or a multi-company enterprise, adopt products at your own pace. Every product works independently. Every new product strengthens the ecosystem."
        primary={{ label: "Create Free Account", href: config.authAppUrl + "/signup" }}
        secondary={{ label: "Explore the Platform", to: "/platform" }}
        trust="Free during Early Access • No subscription • No credit card required"
      />
    </div>
  );
}
