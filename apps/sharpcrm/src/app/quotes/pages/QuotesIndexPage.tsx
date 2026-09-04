import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Receipt } from "lucide-react";

function QuotesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Receipt}
      title="Quotes"
      description="Priced proposals built from the product catalogue and sent to the customer — the step between a deal and an invoice."
      capabilities={[
        "Line items priced from the product catalogue",
        "Discounts, taxes and payment terms",
        "Versioning with an approval step for non-standard pricing",
        "Delivery over Cables, email or the customer's preferred channel",
        "Accepted quotes handed to Sharp-Accounting for invoicing",
      ]}
    />
  );
}

export default QuotesIndexPage;
