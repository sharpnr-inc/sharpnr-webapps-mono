import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { ShoppingCart } from "lucide-react";

function PurchaseOrdersIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ShoppingCart}
      title="Purchase Orders"
      description="What you have ordered from suppliers and what is still outstanding — the incoming half of your stock position."
      capabilities={[
        "Purchase orders with expected delivery dates",
        "Reorder suggestions from stock levels and lead times",
        "Approval workflow before an order is sent",
        "Partial receipts against open lines",
        "Three-way match with receipts and supplier invoices",
      ]}
    />
  );
}

export default PurchaseOrdersIndexPage;
