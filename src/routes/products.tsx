import { ProductsHeroSection } from "@/app/products/ProductsHeroSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Products | Sharpnr Enterprise Solutions" },
      {
        name: "description",
        content:
          "Explore Sharpnr's suite of enterprise products: Sharp-Marketing (CRM), Sharp-HR (HRMS), and Sharp-Accounting. Integrated tools for every business need.",
      },
      {
        name: "keywords",
        content:
          "CRM Products, HRMS Solutions, Accounting Software, Enterprise Tools, Business Suite",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div>
      <ProductsHeroSection />
    </div>
  );
}
