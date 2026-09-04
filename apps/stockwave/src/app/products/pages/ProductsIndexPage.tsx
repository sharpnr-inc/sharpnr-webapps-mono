import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Package } from "lucide-react";

function ProductsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Package}
      title="Products"
      description="The catalogue of everything you hold stock of — the record every count, order and movement points back to."
      capabilities={[
        "Product records with SKU, barcode and unit of measure",
        "Variants, bundles and kits",
        "Batch, lot and serial number tracking",
        "Supplier part numbers and lead times",
        "Cost and price history per item",
      ]}
    />
  );
}

export default ProductsIndexPage;
