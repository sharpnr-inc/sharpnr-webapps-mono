import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { PackageCheck } from "lucide-react";

function ReceivingIndexPage() {
  return (
    <FeaturePlaceholder
      icon={PackageCheck}
      title="Receiving"
      description="Goods arriving at the door: checked against the order, put away to a location, and only then counted as stock."
      capabilities={[
        "Goods-received notes against purchase orders",
        "Quantity and quality checks on arrival",
        "Batch, lot and expiry capture at receipt",
        "Putaway to bin with label printing",
        "Short, over and damaged delivery handling",
      ]}
    />
  );
}

export default ReceivingIndexPage;
