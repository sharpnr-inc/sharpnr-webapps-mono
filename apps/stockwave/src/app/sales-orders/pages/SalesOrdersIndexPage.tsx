import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Receipt } from "lucide-react";

function SalesOrdersIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Receipt}
      title="Sales Orders"
      description="Demand on your stock — what customers have ordered, what is reserved for them, and what can actually be fulfilled today."
      capabilities={[
        "Sales orders with per-line allocation",
        "Stock reservation against confirmed orders",
        "Backorder handling when stock is short",
        "Availability-to-promise from live stock levels",
        "Orders flowing in from SharpCRM and Marketplace",
      ]}
    />
  );
}

export default SalesOrdersIndexPage;
