import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Layers } from "lucide-react";

function StockIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Layers}
      title="Stock Levels"
      description="What is on hand, where it sits, and how much of it is actually available once commitments are taken out."
      capabilities={[
        "On-hand, reserved and available quantities per location",
        "Reorder points and safety-stock thresholds",
        "Incoming stock from open purchase orders",
        "Batch, lot and serial breakdown per location",
        "Full movement history behind every quantity",
      ]}
    />
  );
}

export default StockIndexPage;
