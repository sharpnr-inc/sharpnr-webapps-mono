import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { PieChart } from "lucide-react";

function ReportsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={PieChart}
      title="Reports"
      description="The reports you build yourself, to answer a question the shipped dashboards do not."
      capabilities={[
        "Report builder across every CRM object",
        "Filters, grouping, aggregation and calculated columns",
        "Saved reports with scheduled delivery",
        "Export to Folio or CSV",
        "Sharing controlled by role and team",
      ]}
    />
  );
}

export default ReportsIndexPage;
