import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { Warehouse } from "lucide-react";

function WarehousesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Warehouse}
      title="Warehouses"
      description="Modelled, query-ready data for analytics and reporting, fed from the lake rather than from your production databases."
      capabilities={[
        "Warehouse provisioning with sized compute",
        "Lake-to-warehouse loading",
        "Materialized views and scheduled refresh",
        "Query engine with cost and concurrency controls",
        "Analytics APIs for downstream Sharpnr apps",
      ]}
    />
  );
}

export default WarehousesIndexPage;
