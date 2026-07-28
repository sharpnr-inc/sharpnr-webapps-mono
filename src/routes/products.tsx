import { createFileRoute } from "@tanstack/react-router";
import { ProductsIntroSection } from "@/app/products/intro/ProductsIntroSection";
import { ProductCatalogueSection } from "@/app/products/catalogue/ProductCatalogueSection";
import { FoundationSection } from "@/app/products/foundation/FoundationSection";
import { ProductsCloseSection } from "@/app/products/close/ProductsCloseSection";

const TITLE = "Products | Sharpnr";
const DESCRIPTION =
  "Nine capabilities of one connected platform — Operations, Intelligence, Communication, Automation, Finance, Marketplace, People, Storage and the Developer Platform. Every product works on its own, and works with the rest.";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/products" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/products" }],
  }),
});

/**
 * Products — exploring one platform, capability by capability.
 *
 * Four movements: what these products are, the nine capabilities and what
 * runs each, the foundation all of them stand on, and one way in. The third
 * exists because the second reads as a shopping list without it.
 *
 * No canvas or ink wash here. `__root.tsx` wraps every route and the footer
 * in one `.hp-canvas` with a single `<CanvasWash />`, so a second instance
 * on this page would double the wash and duplicate its filter ids.
 */
function ProductsPage() {
  return (
    <>
      <ProductsIntroSection />
      <ProductCatalogueSection />
      <FoundationSection />
      <ProductsCloseSection />
    </>
  );
}
