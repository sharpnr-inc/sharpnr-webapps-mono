import { Header } from "@/components/header/Header";
import { ProductsPageHeroSection } from "./ProductsPageHeroSection";

export function ProductsPage() {
  return (
    <div className="bg-[#02000d] min-h-screen py-20 ">
      <Header />
      <ProductsPageHeroSection />
    </div>
  );
}
