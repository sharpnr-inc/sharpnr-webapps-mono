import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { PieChart } from "lucide-react";

function ReportsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={PieChart}
      title="Reports"
      description="The numbers behind the stock: what moved, what sat still, and what it cost you."
      capabilities={[
        "Stock movement and turnover by item, category and location",
        "Ageing and slow-moving stock analysis",
        "Purchase and sales history per product",
        "Shrinkage and adjustment reporting",
        "Scheduled delivery and export to Folio or CSV",
      ]}
    />
  );
}

export default ReportsIndexPage;
