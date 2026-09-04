import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Coins } from "lucide-react";

function ValuationIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Coins}
      title="Valuation"
      description="What the stock on hand is worth, on a costing method you choose — the figure that carries across to your books."
      capabilities={[
        "FIFO, weighted-average and standard costing",
        "Valuation by item, category, warehouse and period",
        "Cost of goods sold derived from actual movements",
        "Write-downs and revaluation with reasons recorded",
        "Period-end handoff to Sharp-Accounting",
      ]}
    />
  );
}

export default ValuationIndexPage;
