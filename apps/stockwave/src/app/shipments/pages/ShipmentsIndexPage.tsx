import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Truck } from "lucide-react";

function ShipmentsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Truck}
      title="Shipments"
      description="Getting the goods out: picked, packed, dispatched, and traceable until they arrive."
      capabilities={[
        "Pick lists and pack verification",
        "Shipment consolidation across orders",
        "Carrier selection and label generation",
        "Tracking numbers pushed back to the order",
        "Proof of delivery captured against the shipment",
      ]}
    />
  );
}

export default ShipmentsIndexPage;
