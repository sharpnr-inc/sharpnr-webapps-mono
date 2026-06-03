// /products
import { ProductsPage } from "@/app/products/ProductsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
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
