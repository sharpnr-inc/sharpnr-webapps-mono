import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Tags } from "lucide-react";

function CategoriesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Tags}
      title="Categories"
      description="How the catalogue is organized, so reporting and stock rules apply to groups rather than item by item."
      capabilities={[
        "Nested category hierarchy",
        "Attributes and custom fields inherited by category",
        "Category-level reorder and stocking rules",
        "Bulk reclassification of products",
        "Category roll-ups in valuation and reporting",
      ]}
    />
  );
}

export default CategoriesIndexPage;
