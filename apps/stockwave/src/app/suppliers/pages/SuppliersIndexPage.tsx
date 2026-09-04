import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Factory } from "lucide-react";

function SuppliersIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Factory}
      title="Suppliers"
      description="Who you buy from, on what terms, and how reliably they actually deliver."
      capabilities={[
        "Supplier records with contacts and payment terms",
        "Price lists and supplier part numbers",
        "Lead-time and on-time delivery performance",
        "Preferred supplier per product",
        "Purchase history and spend per supplier",
      ]}
    />
  );
}

export default SuppliersIndexPage;
