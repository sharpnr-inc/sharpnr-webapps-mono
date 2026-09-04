import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Package } from "lucide-react";

function ProductsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Package}
      title="Products"
      description="The catalogue of what you sell, and what it costs — the source of truth quotes and deals price against."
      capabilities={[
        "Product and service catalogue with variants",
        "Price lists per currency, region and customer tier",
        "Discount and margin rules",
        "Stock availability surfaced from Stockwave",
        "Bundles and recurring subscription items",
      ]}
    />
  );
}

export default ProductsIndexPage;
